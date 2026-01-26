// app/screens/SwipePageScreens/SwipeHome.tsx
import React, { useMemo, useState } from "react";
import { Dimensions, Image, StyleSheet, View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import Footer from "../../components/footer";
import ProgressBar from "../../components/Swipepage/BottomProgressBar";

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
const SNAP_CFG = { damping: 30, stiffness: 180 };
const COMMIT_OUT_MS = 160;
const LABEL_DEADZONE = 10;

type SwipeLabel = "" | "lefty" | "righty";
type BarDir = "ltr" | "rtl";

export default function SwipeHome() {
  const profiles = useMemo(() => [{ id: "1" }, { id: "2" }, { id: "3" }], []);
  const [index, setIndex] = useState(0);
  const hasNext = index < profiles.length - 1;

  const [swipeLabel, setSwipeLabel] = useState<SwipeLabel>("");
  const [barDir, setBarDir] = useState<BarDir>("ltr");
  const [showBar, setShowBar] = useState(false);

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

  const pan = Gesture.Pan()
    .onBegin(() => {
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
      // update position with clamp
      const nextX = clamp(startX.value + e.translationX, minX, maxX);
      bgX.value = nextX;

      // direction:
      // drag RIGHT -> ltr
      // drag LEFT  -> rtl
      const nextDir: 0 | 1 = e.translationX > 0 ? 0 : 1;
      if (nextDir !== barDirSV.value) {
        barDirSV.value = nextDir;
        runOnJS(setBarDir)(nextDir === 1 ? "rtl" : "ltr");
      }

      // progress to the edge in the drag direction, relative to resting initialX
      let p = 0;

      if (e.translationX > 0) {
        const denom = maxX - initialX;
        p = denom <= 0 ? 1 : (nextX - initialX) / denom;
      } else if (e.translationX < 0) {
        const denom = initialX - minX;
        p = denom <= 0 ? 1 : (initialX - nextX) / denom;
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

      // opposite-direction label (only update when it changes)
      let nextLabelCode: 0 | 1 | 2 = 0;
      if (e.translationX < -LABEL_DEADZONE) nextLabelCode = 2; // righty
      else if (e.translationX > LABEL_DEADZONE) nextLabelCode = 1; // lefty

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
      if (!hasNext || dragProgress.value < 1) {
        dragProgress.value = withTiming(0, { duration: 120 });

        barDirSV.value = 0;
        runOnJS(setBarDir)("ltr");

        bgX.value = withSpring(initialX, SNAP_CFG);
        return;
      }

      // Completed -> commit (advance profile, same screen)
      const goingRight = bgX.value > initialX;
      const targetEdge = goingRight ? maxX : minX;

      bgX.value = withTiming(targetEdge, { duration: COMMIT_OUT_MS }, (finished) => {
        if (!finished) return;

        runOnJS(setIndex)((prev) => Math.min(prev + 1, profiles.length - 1));

        dragProgress.value = 0;

        barDirSV.value = 0;
        runOnJS(setBarDir)("ltr");

        // back to resting position for the new profile
        bgX.value = initialX;
      });
    });

  return (
    <View style={styles.screen}>
      <View style={styles.bgColor} />

      {/* Viewport */}
      <View style={styles.viewport}>
        <GestureDetector gesture={pan}>
          {/* ✅ Draggable layer contains BOTH image + door */}
          <Animated.View style={[StyleSheet.absoluteFill, dragLayerStyle]}>
            <Animated.Image
              source={BG_SOURCE}
              resizeMode="stretch"
              style={[
                styles.bgImg,
                {
                  width: scaledW,
                  height: scaledH,
                  top: (H - scaledH) / 2, // vertically center-ish
                },
              ]}
            />

            {/* ✅ Door positioned by image coordinates (stays aligned with door art) */}
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
        </GestureDetector>
      </View>

      {/* Fixed overlay bubble */}
      <View style={styles.overlay} pointerEvents="none">
        <View style={styles.infoBubblePlaceholder}>
          <Text style={styles.nameText}>Anastasia, 20</Text>
          <Text style={styles.quoteText}>
            “I’m basically always at 2nd floor clem pretending to be locked in”
          </Text>
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

  infoBubblePlaceholder: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 110,
    height: 120,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 16,
    paddingVertical: 14,
    elevation: 5,
  },

  nameText: { fontSize: 26, fontWeight: "800", color: "#0b2a5a" },
  quoteText: { marginTop: 6, fontSize: 18, fontWeight: "600", color: "#0b2a5a" },

  holdBarWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 86,
    zIndex: 40,
  },

  footerFixed: { position: "absolute", left: 0, right: 0, bottom: 0 },
});
