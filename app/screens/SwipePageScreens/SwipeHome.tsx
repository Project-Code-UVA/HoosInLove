// app/screens/SwipePageScreens/SwipeHome.tsx
import { supabase } from "@/services/supabase";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Profile } from "../../data/Profile";

import Footer from "../../components/footer";
import ProgressBar from "../../components/Swipepage/BottomProgressBar";
import InfoBubble from "../../components/Swipepage/InfoBubble";
// to be removed LATER:
import { MOCK_PROFILES } from "../../data/mockProfiles";

const { width: W, height: H } = Dimensions.get("window");

// Images
const DOOR_BG = require("../../../assets/images/SwipePageImages/Door_SwipePage.png");
const WALL_BG = require("../../../assets/images/SwipePageImages/Wall_SwipePage.png");

/* -------------------- ART / LAYOUT -------------------- */

const EXTRA_ZOOM = 1.07;
const MAIN_DOOR_CENTER = 0.5;

const DOOR_W = 210;
const DOOR_H = 320;
const DOOR_TOP = 250;

/* move the whole background down */
const BG_Y_OFFSET = 30;

/* -------------------- INTERACTION -------------------- */

const MAX_PULL_FRAC = 0.14;
const COMPLETE_THRESHOLD = 0.94;

const SNAP_CFG = { damping: 22, stiffness: 210 };
const COMMIT_MS = 380;
const COMMIT_EASE = Easing.out(Easing.cubic);

/* spring pull curve */
const SPRING_K = 0.020;

type BarDir = "ltr" | "rtl";

export default function SwipeHome() {
  // TODO: REMOVE MOCK PROFILE STUFF

  const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES); // supports both mock & real profiles FOR NOW!! (change to const [profiles, setProfiles] = useState<Profile[]>([]);)
  const n = profiles.length;

  const [index, setIndex] = useState(0);

  // fetch profiles
  const fetchProfiles = async () => {
    const {data, error } = await supabase
      .from("user_profile")
      .select("*");

    if (!error && data && data.length > 0) {
      const mapped = data.map((u: any) => ({
        id: u.id,
        name: `${u.first_name} ${u.last_name ?? ""}`,
        age: Number(u.age),
        yearLabel: u.school_year,
        quote: u.bio ?? "",
        pronouns: u.pronouns ?? "",
        playlist: u.playlist ?? "",
      }));
      setProfiles(mapped);
    }
  }

  // ensure profiles load when screen mounts
  useEffect(() => {
    fetchProfiles();
  }, []);

  // record user's knock
  const recordKnock = async (targetId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase.from("matches").insert({
      user_1_id: user.id,
      user_2_id: targetId,
      status: "knock"
    });

    if (error) {
      console.error("Knock failed: ", error);
    }
  }

  // swipe progress bar (the loading/hold bar, NOT the navy handle)
  const [barDir, setBarDir] = useState<BarDir>("ltr");
  const [showSwipeBar, setShowSwipeBar] = useState(false);

  // door “open/zoomed” state (bubble becomes draggable here)
  const [isOpen, setIsOpen] = useState(false);

  // measure footer height so bubble sits perfectly above it
  const [footerH, setFooterH] = useState(0);
  const BUBBLE_GAP = 28;
  const bubbleBottom = footerH + BUBBLE_GAP;
  const holdBarBottom = footerH + 6;

  const profile = profiles.length
    ? profiles[index % profiles.length]
    : null;

  /* -------------------- IMAGE SIZING -------------------- */

  const src = Image.resolveAssetSource(DOOR_BG);
  const imgW = src?.width ?? W;
  const imgH = src?.height ?? H;

  const coverScale = Math.max(W / imgW, H / imgH);
  const baseW = imgW * coverScale;
  const baseH = imgH * coverScale;

  const scaledW = baseW * EXTRA_ZOOM;
  const scaledH = baseH * EXTRA_ZOOM;

  const BG_TOP = (H - scaledH) / 2 + BG_Y_OFFSET;

  const initialX = W / 2 - scaledW * MAIN_DOOR_CENTER;
  const doorLeft = scaledW * MAIN_DOOR_CENTER - DOOR_W / 2;

  const MAX_PULL = W * MAX_PULL_FRAC;

  /* -------------------- SHARED VALUES -------------------- */

  const translateX = useSharedValue(0);
  const isCommitting = useSharedValue(false);
  const dragProgress = useSharedValue(0);

  const showSwipeBarSV = useSharedValue<0 | 1>(0);
  const barDirSV = useSharedValue<0 | 1>(0);

  // zoom animation values
  const zoomScale = useSharedValue(1);
  const zoomTx = useSharedValue(0);
  const zoomTy = useSharedValue(0);

  /* -------------------- HELPERS -------------------- */

  const clamp01 = (v: number) => {
    "worklet";
    return Math.max(0, Math.min(1, v));
  };

  const springPull = (raw: number) => {
    "worklet";
    const sign = raw < 0 ? -1 : 1;
    const d = Math.abs(raw);
    const pulled = MAX_PULL * (1 - Math.exp(-SPRING_K * d));
    return sign * pulled;
  };

  const bumpIndex = (delta: number) => {
    setIndex((prev) => {
      const next = (prev + delta) % n;
      return next < 0 ? next + n : next;
    });
  };

  /* -------------------- ZOOM TARGET -------------------- */
  // Door rect on screen (DoorCurrent page when translateX === 0)
  const doorCenterX = initialX + doorLeft + DOOR_W / 2;
  const doorCenterY = BG_TOP + DOOR_TOP + DOOR_H / 2;

  // Scale so the door basically fills the screen
  const targetScale = Math.min(W / DOOR_W, H / DOOR_H) * 1.02;

  // RN scales around center by default
  const originX = W / 2;
  const originY = H / 2 - 25;

  // center-origin translation
  const targetTx = targetScale * (originX - doorCenterX);
  const targetTy = targetScale * (originY - doorCenterY);

  useEffect(() => {
    // when opening: snap carousel to center and hide swipe progress bar
    if (isOpen) {
      translateX.value = withSpring(0, SNAP_CFG);
      dragProgress.value = withTiming(0, { duration: 120 });
      showSwipeBarSV.value = 0;
      setShowSwipeBar(false);
    }

    zoomScale.value = withTiming(isOpen ? targetScale : 1, {
      duration: isOpen ? 360 : 240,
      easing: COMMIT_EASE,
    });
    zoomTx.value = withTiming(isOpen ? targetTx : 0, {
      duration: isOpen ? 360 : 240,
      easing: COMMIT_EASE,
    });
    zoomTy.value = withTiming(isOpen ? targetTy : 0, {
      duration: isOpen ? 360 : 240,
      easing: COMMIT_EASE,
    });
  }, [isOpen, targetScale, targetTx, targetTy]);

  /* -------------------- STYLES -------------------- */

  const stripStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // whole scene zooms when isOpen
  const sceneZoomStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: zoomScale.value },
      { translateX: zoomTx.value },
      { translateY: zoomTy.value },
    ],
  }));

  const artOffsetStyle = useMemo(
    () => ({
      ...StyleSheet.absoluteFillObject,
      transform: [{ translateX: initialX }],
    }),
    [initialX]
  );

  /* -------------------- COMMIT -------------------- */

  const commitTo = (dir: -1 | 1) => {
    "worklet";
    if (isCommitting.value || n <= 1) return;

    isCommitting.value = true;

    showSwipeBarSV.value = 0;
    runOnJS(setShowSwipeBar)(false);

    translateX.value = withTiming(
      dir * 2 * W,
      { duration: COMMIT_MS, easing: COMMIT_EASE },
      () => {
        runOnJS(bumpIndex)(dir === -1 ? 1 : -1);
        translateX.value = 0;
        dragProgress.value = 0;
        isCommitting.value = false;
      }
    );
  };

  /* -------------------- GESTURES -------------------- */

  // Horizontal swipe (carousel)
  const pan = Gesture.Pan()
    .enabled(!isOpen)
    .minDistance(6)
    .activeOffsetY([-12, 12]) // ignore vertical drift
    .onBegin(() => {
      if (isCommitting.value) return;
      dragProgress.value = 0;
      showSwipeBarSV.value = 0;
      runOnJS(setShowSwipeBar)(false);
    })
    .onUpdate((e) => {
      if (isCommitting.value) return;

      const tx = springPull(e.translationX);
      translateX.value = tx;

      const dir = tx > 0 ? 0 : 1;
      if (dir !== barDirSV.value) {
        barDirSV.value = dir;
        runOnJS(setBarDir)(dir === 1 ? "rtl" : "ltr");
      }

      const p = clamp01(Math.abs(tx) / MAX_PULL);
      dragProgress.value = p;

      if (p > 0.01 && !showSwipeBarSV.value) {
        showSwipeBarSV.value = 1;
        runOnJS(setShowSwipeBar)(true);
      }

      if (p >= COMPLETE_THRESHOLD) {
        if (tx < 0) commitTo(-1);
        else commitTo(1);
      }
    })
    .onEnd(() => {
      if (isCommitting.value) return;

      showSwipeBarSV.value = 0;
      runOnJS(setShowSwipeBar)(false);

      translateX.value = withSpring(0, SNAP_CFG);
      dragProgress.value = withTiming(0, { duration: 120 });
    });

  // door hit-test (worklet-safe)
  const isPointInDoor = (x: number, y: number) => {
    "worklet";
    return (
      x >= doorLeft &&
      x <= doorLeft + DOOR_W &&
      y >= DOOR_TOP &&
      y <= DOOR_TOP + DOOR_H
    );
  };

  // Double tap on the door → open
  const doorDoubleTap = Gesture.Tap()
    .enabled(!isOpen)
    .numberOfTaps(2)
    .maxDelay(250)
    .onStart((e) => {
      if (isPointInDoor(e.x, e.y)) {
        runOnJS(setIsOpen)(true);
      }
    });

  // Knock on open door (to give like)
  const knockGesture = Gesture.Tap()
    .enabled(isOpen)
    .numberOfTaps(4)
    .maxDelay(250)
    .onStart(() => {
      if (profile) {
        runOnJS(recordKnock)(profile.id);
      }
    });

  // Vertical swipe DOWN to close (anywhere)
  const closePan = Gesture.Pan()
    .enabled(isOpen)
    .minDistance(10)
    .activeOffsetX([-20, 20]) // ignore sideways
    .activeOffsetY([10, 9999]) // only activates if user moves DOWN
    .onEnd((e) => {
      if (e.translationY > 70 || e.velocityY > 900) {
        runOnJS(setIsOpen)(false);
      }
    });

  // When closed: both pan + double tap can run; tap won't interfere with pan
  const closedGesture = Gesture.Simultaneous(pan, doorDoubleTap);

  /* -------------------- RENDER -------------------- */

  return (
    <View style={styles.screen}>
      <View style={styles.viewport}>
        <GestureDetector gesture={isOpen ? Gesture.Simultaneous(closePan, knockGesture) : closedGesture}>
          <Animated.View style={[StyleSheet.absoluteFill, sceneZoomStyle]}>
            <Animated.View style={[styles.strip, stripStyle]}>
              {/* DoorPrev */}
              <View style={[styles.page, { left: -2 * W }]}>
                <View style={artOffsetStyle}>
                  <Image
                    source={DOOR_BG}
                    resizeMode="stretch"
                    style={[styles.bgImg, { width: scaledW, height: scaledH, top: BG_TOP }]}
                  />
                </View>
              </View>

              {/* WallPrev */}
              <View style={[styles.page, { left: -W }]}>
                <View style={artOffsetStyle}>
                  <Image
                    source={WALL_BG}
                    resizeMode="stretch"
                    style={[styles.bgImg, { width: scaledW, height: scaledH, top: BG_TOP }]}
                  />
                </View>
              </View>

              {/* DoorCurrent */}
              <View style={[styles.page, { left: 0 }]}>
                <View style={artOffsetStyle}>
                  <Image
                    source={DOOR_BG}
                    resizeMode="stretch"
                    style={[styles.bgImg, { width: scaledW, height: scaledH, top: BG_TOP }]}
                  />
                  {/* ✅ no Pressable door zone */}
                </View>
              </View>

              {/* WallNext */}
              <View style={[styles.page, { left: W }]}>
                <View style={artOffsetStyle}>
                  <Image
                    source={WALL_BG}
                    resizeMode="stretch"
                    style={[styles.bgImg, { width: scaledW, height: scaledH, top: BG_TOP }]}
                  />
                </View>
              </View>

              {/* DoorNext */}
              <View style={[styles.page, { left: 2 * W }]}>
                <View style={artOffsetStyle}>
                  <Image
                    source={DOOR_BG}
                    resizeMode="stretch"
                    style={[styles.bgImg, { width: scaledW, height: scaledH, top: BG_TOP }]}
                  />
                </View>
              </View>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Info Bubble */}
      <View style={styles.overlay} pointerEvents="box-none">
        <View style={[styles.infoBubbleWrap, { bottom: bubbleBottom }]} pointerEvents="auto">
          {profile && (
            <InfoBubble
              profile={{
                name: profile.name,
                age: profile.age,
                yearLabel: profile.yearLabel,
                quote: profile.quote,
                photoUri: (profile as any).photoUri,
              }}
              expandEnabled={isOpen}
              showHandle={isOpen}
            />
          )}
        </View>
      </View>

      {/* Swipe progress bar — only during swipe and only when NOT open */}
      {showSwipeBar && !isOpen && (
        <View style={[styles.holdBarWrap, { bottom: holdBarBottom }]} pointerEvents="none">
          <ProgressBar progress={dragProgress} direction={barDir} />
        </View>
      )}

      {/* Footer */}
      <View style={styles.footerFixed} onLayout={(e) => setFooterH(e.nativeEvent.layout.height)}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFF5DB" },
  viewport: { flex: 1, overflow: "hidden" },

  strip: { position: "absolute", top: 0, bottom: 0, left: 0, right: 0 },
  page: { position: "absolute", top: 0, bottom: 0, width: W, overflow: "hidden" },

  bgImg: { position: "absolute", left: 0 },

  overlay: { ...StyleSheet.absoluteFillObject },

  // bubble placement (bottom injected inline)
  infoBubbleWrap: { position: "absolute", left: 13, right: 13 },

  // progress bar placement (bottom injected inline)
  holdBarWrap: { position: "absolute", left: 0, right: 0 },

  footerFixed: { position: "absolute", bottom: 0, left: 0, right: 0 },
});
