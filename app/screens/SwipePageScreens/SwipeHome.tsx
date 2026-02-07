// app/screens/SwipePageScreens/SwipeHome.tsx
import React, { useMemo, useState } from "react";
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

import Footer from "../../components/footer";
import ProgressBar from "../../components/Swipepage/BottomProgressBar";
import InfoBubble from "../../components/Swipepage/InfoBubble";
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

/* 🔽 move the whole background down */
const BG_Y_OFFSET = 40;

/* -------------------- INTERACTION -------------------- */

const MAX_PULL_FRAC = 0.14;           // how far into wall you can pull
const COMPLETE_THRESHOLD = 0.94;      // how full bar must be to commit

const SNAP_CFG = { damping: 22, stiffness: 210 };
const COMMIT_MS = 380;
const COMMIT_EASE = Easing.out(Easing.cubic);

const LABEL_DEADZONE = 10;

/* spring pull curve */
const SPRING_K = 0.020;

type SwipeLabel = "" | "lefty" | "righty";
type BarDir = "ltr" | "rtl";

export default function SwipeHome() {
  const profiles = MOCK_PROFILES;
  const n = profiles.length;

  const [index, setIndex] = useState(0);
  const [swipeLabel, setSwipeLabel] = useState<SwipeLabel>("");
  const [barDir, setBarDir] = useState<BarDir>("ltr");
  const [showBar, setShowBar] = useState(false);

  const profile = profiles[index % n];

  /* -------------------- IMAGE SIZING -------------------- */

  const src = Image.resolveAssetSource(DOOR_BG);
  const imgW = src?.width ?? W;
  const imgH = src?.height ?? H;

  const coverScale = Math.max(W / imgW, H / imgH);
  const baseW = imgW * coverScale;
  const baseH = imgH * coverScale;

  const scaledW = baseW * EXTRA_ZOOM;
  const scaledH = baseH * EXTRA_ZOOM;

  // ⬇️ defined ONCE
  const BG_TOP = (H - scaledH) / 2 + BG_Y_OFFSET;

  const initialX = W / 2 - scaledW * MAIN_DOOR_CENTER;
  const doorLeft = scaledW * MAIN_DOOR_CENTER - DOOR_W / 2;

  const MAX_PULL = W * MAX_PULL_FRAC;

  /* -------------------- SHARED VALUES -------------------- */

  const translateX = useSharedValue(0);
  const isCommitting = useSharedValue(false);
  const dragProgress = useSharedValue(0);

  const showBarSV = useSharedValue<0 | 1>(0);
  const barDirSV = useSharedValue<0 | 1>(0);
  const lastLabel = useSharedValue<0 | 1 | 2>(0);

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

  /* -------------------- STYLES -------------------- */

  const stripStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
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

    lastLabel.value = 0;
    showBarSV.value = 0;
    runOnJS(setSwipeLabel)("");
    runOnJS(setShowBar)(false);

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

  /* -------------------- GESTURE -------------------- */

  const pan = Gesture.Pan()
    .minDistance(6)
    .onBegin(() => {
      if (isCommitting.value) return;
      dragProgress.value = 0;
      showBarSV.value = 0;
      runOnJS(setShowBar)(false);
      lastLabel.value = 0;
      runOnJS(setSwipeLabel)("");
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

      if (p > 0.01 && !showBarSV.value) {
        showBarSV.value = 1;
        runOnJS(setShowBar)(true);
      }

      if (p >= COMPLETE_THRESHOLD) {
        if (tx < 0) commitTo(-1);
        else commitTo(1);
      }
    })
    .onEnd(() => {
      if (isCommitting.value) return;

      showBarSV.value = 0;
      runOnJS(setShowBar)(false);

      translateX.value = withSpring(0, SNAP_CFG);
      dragProgress.value = withTiming(0, { duration: 120 });
    });

  /* -------------------- RENDER -------------------- */

  return (
    <View style={styles.screen}>
      <View style={styles.viewport}>
        <GestureDetector gesture={pan}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.strip, stripStyle]} pointerEvents="none">

              {/* DoorPrev */}
              <View style={[styles.page, { left: -2 * W }]}>
                <View style={artOffsetStyle}>
                  <Image source={DOOR_BG} resizeMode="stretch"
                    style={[styles.bgImg, { width: scaledW, height: scaledH, top: BG_TOP }]} />
                  <View style={[styles.doorPlaceholder, { left: doorLeft }]} />
                </View>
              </View>

              {/* WallPrev */}
              <View style={[styles.page, { left: -W }]}>
                <View style={artOffsetStyle}>
                  <Image source={WALL_BG} resizeMode="stretch"
                    style={[styles.bgImg, { width: scaledW, height: scaledH, top: BG_TOP }]} />
                </View>
              </View>

              {/* DoorCurrent */}
              <View style={[styles.page, { left: 0 }]}>
                <View style={artOffsetStyle}>
                  <Image source={DOOR_BG} resizeMode="stretch"
                    style={[styles.bgImg, { width: scaledW, height: scaledH, top: BG_TOP }]} />
                  <View style={[styles.doorPlaceholder, { left: doorLeft }]} />
                </View>
              </View>

              {/* WallNext */}
              <View style={[styles.page, { left: W }]}>
                <View style={artOffsetStyle}>
                  <Image source={WALL_BG} resizeMode="stretch"
                    style={[styles.bgImg, { width: scaledW, height: scaledH, top: BG_TOP }]} />
                </View>
              </View>

              {/* DoorNext */}
              <View style={[styles.page, { left: 2 * W }]}>
                <View style={artOffsetStyle}>
                  <Image source={DOOR_BG} resizeMode="stretch"
                    style={[styles.bgImg, { width: scaledW, height: scaledH, top: BG_TOP }]} />
                  <View style={[styles.doorPlaceholder, { left: doorLeft }]} />
                </View>
              </View>

            </Animated.View>
          </View>
        </GestureDetector>
      </View>

      {/* Info Bubble */}
      <View style={styles.overlay}>
        <View style={styles.infoBubbleWrap}>
          <InfoBubble {...profile} />
        </View>
      </View>

      {showBar && (
        <View style={styles.holdBarWrap}>
          <ProgressBar progress={dragProgress} direction={barDir} />
        </View>
      )}

      <View style={styles.footerFixed}>
        <Footer />
      </View>
    </View>
  );
}

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFF5DB" },
  viewport: { flex: 1, overflow: "hidden" },

  strip: { position: "absolute", top: 0, bottom: 0, left: 0, right: 0 },
  page: { position: "absolute", top: 0, bottom: 0, width: W, overflow: "hidden" },

  bgImg: { position: "absolute", left: 0 },

  doorPlaceholder: {
    position: "absolute",
    top: 250,
    width: DOOR_W,
    height: DOOR_H,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.09)",
  },

  overlay: { ...StyleSheet.absoluteFillObject },
  infoBubbleWrap: { position: "absolute", bottom: 110, left: 18, right: 18 },
  holdBarWrap: { position: "absolute", bottom: 86, left: 0, right: 0 },
  footerFixed: { position: "absolute", bottom: 0, left: 0, right: 0 },
});
