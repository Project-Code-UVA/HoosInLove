// app/screens/SwipePageScreens/SwipeHome.tsx
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";

import Footer from "../../components/footer";
import ProgressBar from "../../components/Swipepage/BottomProgressBar";
import InfoBubble from "../../components/Swipepage/InfoBubble";
import { MOCK_PROFILES } from "../../data/mockProfiles";

const { width: W, height: H } = Dimensions.get("window");

const BG_SOURCE = require("../../../assets/images/SwipePageImages/SwipePageBackground.jpg");

/**
 * iPhone 15 tuned for now.
 * TODO: compute using onLayout container width/height for all devices.
 */

// How much extra beyond true "cover" size (bigger => hides side doors at rest + more panning room)
const EXTRA_ZOOM = 1.07; // tweak 1.05–1.30
// Where the main door sits across the image width (0..1)
const MAIN_DOOR_CENTER = 0.5; // tweak 0.45–0.55

// Door placeholder size (match your design)
const DOOR_W = 210;
const DOOR_H = 320;

// Feel (bouncyness) of snap back to center
const SNAP_CFG = { damping: 40, stiffness: 35 };
const COMMIT_OUT_MS = 420;
const COMMIT_IN_MS  = 650; 
const LABEL_DEADZONE = 10;
const COMPLETE_THRESHOLD = 0.98; // 98% swipe = count as “complete”

// Smaller = less sensitive (needs more effort).
const DRAG_SENSITIVITY = 0.55; // try 0.35–0.70

const COMMIT_EASE = Easing.out(Easing.cubic);

type SwipeLabel = "" | "lefty" | "righty";
type BarDir = "ltr" | "rtl";

export default function SwipeHome() {
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  

  const [swipeLabel, setSwipeLabel] = useState<SwipeLabel>("");
  const [barDir, setBarDir] = useState<BarDir>("ltr");
  const [showBar, setShowBar] = useState(false);

  const profiles = MOCK_PROFILES;
  const profile = profiles[displayIndex] ?? profiles[0];
  const hasNext = displayIndex < profiles.length - 1;
  if (!profile) return null;

  const bumpIndex = () => {
    setIndex((prev) => Math.min(prev + 1, profiles.length - 1));
  };

  const bumpDisplayIndex = () => {
    setDisplayIndex((prev) => Math.min(prev + 1, profiles.length - 1));
  };

  // Use intrinsic image size (bundled asset)
  const src = Image.resolveAssetSource(BG_SOURCE);
  const imgW = src?.width ?? W;
  const imgH = src?.height ?? H;

  // "Cover" scale for the viewport
  const coverScale = Math.max(W / imgW, H / imgH);
  const baseW = imgW * coverScale;
  const baseH = imgH * coverScale;

  // Extra zoom for more side-pan room + hiding side doors at rest
  const scaledW = baseW * EXTRA_ZOOM;
  const scaledH = baseH * EXTRA_ZOOM;

  // Horizontal clamp bounds (no empty space left/right)
  const maxX = 0;
  const minX = W - scaledW; // negative

  // Resting position centered on main door
  const initialX = W / 2 - scaledW * MAIN_DOOR_CENTER;

  // ✅ Door X inside the scaled image (so it stays aligned with the door art)
  const doorLeft = scaledW * MAIN_DOOR_CENTER - DOOR_W / 2;

  // Shared values
  const bgX = useSharedValue(initialX);
  const startX = useSharedValue(initialX);
  const dragProgress = useSharedValue(0);
  const isTransitioning = useSharedValue(false);
  const nextX = useSharedValue(initialX);
  const nextVisible = useSharedValue(0); // 0 hidden, 1 visible

  const lastLabel = useSharedValue<0 | 1 | 2>(0);

  // Reduce runOnJS spam by only updating React state when these change
  const barDirSV = useSharedValue<0 | 1>(0); // 0=ltr, 1=rtl
  const showBarSV = useSharedValue<0 | 1>(0); // 0=hide, 1=show

  // ✅ worklet-safe helpers (prevents crashes)
  const clamp = (v: number, lo: number, hi: number) => {
    "worklet";
    return Math.max(lo, Math.min(hi, v));
  };

  const clamp01 = (v: number) => {
    "worklet";
    return Math.max(0, Math.min(1, v));
  };

  // ✅ Apply translateX to a container that includes BOTH bg + door
  const dragLayerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: bgX.value }],
  }));
  const nextLayerStyle = useAnimatedStyle(() => ({
  opacity: nextVisible.value,
  transform: [{ translateX: nextX.value }],
  }));

  const pan = Gesture.Pan()
    .minDistance(12) 
    .onBegin(() => {
      if (isTransitioning.value) return;
      startX.value = bgX.value;
      dragProgress.value = 0;

      // hide bar at start
      showBarSV.value = 0;
      runOnJS(setShowBar)(false);

      // reset dir
      barDirSV.value = 0;
      runOnJS(setBarDir)("ltr");

      // reset label
      lastLabel.value = 0;
      runOnJS(setSwipeLabel)("");
    })

    .onUpdate((e) => {
      const tx = e.translationX * DRAG_SENSITIVITY;

      // update position with clamp (use tx)
      const nextPos = clamp(startX.value + tx, minX, maxX);
      bgX.value = nextPos;

      // direction (use tx)
      const nextDir: 0 | 1 = tx > 0 ? 0 : 1;
      if (nextDir !== barDirSV.value) {
        barDirSV.value = nextDir;
        runOnJS(setBarDir)(nextDir === 1 ? "rtl" : "ltr");
      }

      // progress calc (use tx)
      let p = 0;
      if (tx > 0) {
        const denom = maxX - initialX;
        p = denom <= 0 ? 1 : (nextPos - initialX) / denom;
      } else if (tx < 0) {
        const denom = initialX - minX;
        p = denom <= 0 ? 1 : (initialX - nextPos) / denom;
      } else {
        p = 0;
      }

      p = clamp01(p);
      dragProgress.value = p;

      // show/hide bar only when threshold changes
      const nextShow: 0 | 1 = p > 0.01 ? 1 : 0;
      if (nextShow !== showBarSV.value) {
        showBarSV.value = nextShow;
        runOnJS(setShowBar)(nextShow === 1);
      }

      // label (use tx)
      let nextLabelCode: 0 | 1 | 2 = 0;
      if (tx < -LABEL_DEADZONE) nextLabelCode = 2; // righty
      else if (tx > LABEL_DEADZONE) nextLabelCode = 1; // lefty

      if (nextLabelCode !== lastLabel.value) {
        lastLabel.value = nextLabelCode;
        runOnJS(setSwipeLabel)(
          nextLabelCode === 1 ? "lefty" : nextLabelCode === 2 ? "righty" : ""
        );
      }
    })
    
    .onEnd(() => {
      // clear label + hide bar
      lastLabel.value = 0;
      runOnJS(setSwipeLabel)("");

      showBarSV.value = 0;
      runOnJS(setShowBar)(false);

      // If not completed or no next -> bounce back
      if (!hasNext || dragProgress.value < COMPLETE_THRESHOLD) {
        dragProgress.value = withTiming(0, { duration: 120 });

        barDirSV.value = 0;
        runOnJS(setBarDir)("ltr");

        bgX.value = withSpring(initialX, SNAP_CFG);
        return;
      }

      // Completed -> commit (advance profile, same screen)
      const goingRight = bgX.value > initialX;
      const exitEdge = goingRight ? maxX : minX;

      // NEXT should come from the opposite side
      const entryFrom = goingRight ? minX : maxX;

      isTransitioning.value = true;

      // show the next layer offscreen
      nextVisible.value = 1;
      nextX.value = entryFrom;

      // animate CURRENT out to edge
      bgX.value = withTiming(exitEdge, { duration: COMMIT_OUT_MS, easing: COMMIT_EASE }, (finished) => {
        if (!finished) {
          // bail safely
          bgX.value = withSpring(initialX, SNAP_CFG);
          nextVisible.value = 0;
          isTransitioning.value = false;
          return;
        }

        // ✅ update the data index now (optional)
        runOnJS(bumpIndex)();

        // reset progress + label state
        dragProgress.value = 0;
        showBarSV.value = 0;
        barDirSV.value = 0;
        runOnJS(setShowBar)(false);
        runOnJS(setBarDir)("ltr");
        runOnJS(setSwipeLabel)("");

        // IMPORTANT:
        // move CURRENT instantly back to center for the new profile,
        // but keep it hidden by making NEXT visible during the transition.
        bgX.value = initialX;
        startX.value = initialX;

        // animate NEXT into center (hallway "slides in")
        nextX.value = withTiming(initialX, { duration: COMMIT_IN_MS, easing: COMMIT_EASE }, () => {
          // ✅ swap what user sees AFTER the hallway arrives
          runOnJS(bumpDisplayIndex)();
          // hide next layer, transition done
          nextVisible.value = 0;
          isTransitioning.value = false;
        });
      });
    });

  return (
    <View style={styles.screen}>
      <View style={styles.bgColor} />

      {/* Viewport */}
      <View style={styles.viewport}>
        <GestureDetector gesture={pan}>
        {/* ✅ GestureDetector MUST have exactly ONE direct child */}
            <View style={StyleSheet.absoluteFill}>
              {/* CURRENT layer (the one you drag) */}
              <Animated.View style={[StyleSheet.absoluteFill, dragLayerStyle]}>
                <Animated.Image
                  source={BG_SOURCE}
                  resizeMode="stretch"
                  style={[
                    styles.bgImg,
                    {
                      width: scaledW,
                      height: scaledH,
                      top: (H - scaledH) / 2,
                    },
                  ]}
                />
                <View
                  pointerEvents="none"
                  style={[
                    styles.doorPlaceholder,
                    {
                      left: doorLeft,
                      width: DOOR_W,
                      height: DOOR_H,
                    },
                  ]}
                />
              </Animated.View>

              {/* NEXT layer (slides in during transition) */}
              <Animated.View
                style={[StyleSheet.absoluteFill, nextLayerStyle]}
                pointerEvents="none"
              >
                <Animated.Image
                  source={BG_SOURCE}
                  resizeMode="stretch"
                  style={[
                    styles.bgImg,
                    {
                      width: scaledW,
                      height: scaledH,
                      top: (H - scaledH) / 2,
                    },
                  ]}
                />
                <View
                  pointerEvents="none"
                  style={[
                    styles.doorPlaceholder,
                    {
                      left: doorLeft,
                      width: DOOR_W,
                      height: DOOR_H,
                    },
                  ]}
                />
              </Animated.View>
            </View>
        </GestureDetector>
      </View>

      {/* Fixed overlay bubble */}
      <View style={styles.overlay} pointerEvents="box-none">
        <View style={styles.infoBubbleWrap} pointerEvents="auto">
          <InfoBubble
            name={profile.name}
            age={profile.age}
            yearLabel={profile.yearLabel}
            quote={profile.quote}
            onPress={() => console.log("Pressed bubble for", profile.id)}
            onPressAvatar={() => console.log("Pressed avatar for", profile.id)}
          />
        </View>
      </View>

      {/* Drag progress bar */}
      {showBar && hasNext && (
        <View style={styles.holdBarWrap} pointerEvents="none">
          <ProgressBar progress={dragProgress} direction={barDir} />
        </View>
      )}

      {/* Footer fixed */}
      <View style={styles.footerFixed}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFF5DB", overflow: "hidden" },
  bgColor: { ...StyleSheet.absoluteFillObject, backgroundColor: "#FFF5DB" },

  viewport: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#FFF5DB",
  },

  bgImg: {
    position: "absolute",
    left: 0,
  },

  doorPlaceholder: {
    position: "absolute",
    top: 250,
    borderRadius: 14,
    backgroundColor: "rgba(0, 0, 0, 0.09)",
  },

  overlay: { ...StyleSheet.absoluteFillObject },

  infoBubbleWrap: {
  position: "absolute",
  left: 18,
  right: 18,
  bottom: 110,
  alignItems: "center",
  },

  holdBarWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 86,
    zIndex: 40,
  },

  footerFixed: { position: "absolute", left: 0, right: 0, bottom: 0 },
});
