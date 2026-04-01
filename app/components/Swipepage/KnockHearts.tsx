import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

type Props = {
  enabled: boolean;
  onComplete: () => void;
};

const REQUIRED_TAPS = 4;
const RESET_MS = 1800;

const BLACK = "#000000";
const ORANGE = "#F28D00";
const BLUE = "#75BFFF";
const NAVY = "#002562";
const RED = "#E53935";

const SPAWN_WRAP_SIZE = 120;
const SPAWN_BOTTOM = 34;

const START_SCALE = 0.42;
const END_SCALE = 2.15;

const HEART_PATH =
  "M17.5 37.3506C16.5 36.7 14.6 35.1 4.8529 20.1787C-6.4899 3.80006 13.36 -7.46029 19.0314 11.9894C19.4966 -7.78479 45.1584 3.00693 31.3194 21.2024C17.4805 39.3979 20.3162 39.3979 17.5 37.3506Z";

function HeartLayer({
  size = 63,
  color,
}: {
  size?: number;
  color: string;
}) {
  const scale = size / 63;

  return (
    <Svg
      width={63 * scale}
      height={49 * scale}
      viewBox="0 0 63 49"
      fill="none"
    >
      <Path
        d={HEART_PATH}
        fill={color}
        stroke={color}
        strokeWidth={2.83333}
      />
    </Svg>
  );
}

export default function KnockHearts({ enabled, onComplete }: Props) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [tapCount, setTapCount] = useState(0);
  const [locked, setLocked] = useState(false);
  const [finalHeartColor, setFinalHeartColor] = useState(NAVY);

  const lastTap = useRef({ x: screenWidth / 2, y: screenHeight / 2 });

  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const h1X = useSharedValue(0);
  const h1Y = useSharedValue(0);
  const h1O = useSharedValue(0);
  const h1S = useSharedValue(START_SCALE);
  const h1R = useSharedValue(0);

  const h2X = useSharedValue(0);
  const h2Y = useSharedValue(0);
  const h2O = useSharedValue(0);
  const h2S = useSharedValue(START_SCALE);
  const h2R = useSharedValue(0);

  const h3X = useSharedValue(0);
  const h3Y = useSharedValue(0);
  const h3O = useSharedValue(0);
  const h3S = useSharedValue(START_SCALE);
  const h3R = useSharedValue(0);

  const h4X = useSharedValue(0);
  const h4Y = useSharedValue(0);
  const h4O = useSharedValue(0);
  const h4S = useSharedValue(START_SCALE);
  const h4R = useSharedValue(0);

  const resetShared = () => {
    h1X.value = 0;
    h1Y.value = 0;
    h1O.value = 0;
    h1S.value = START_SCALE;
    h1R.value = 0;

    h2X.value = 0;
    h2Y.value = 0;
    h2O.value = 0;
    h2S.value = START_SCALE;
    h2R.value = 0;

    h3X.value = 0;
    h3Y.value = 0;
    h3O.value = 0;
    h3S.value = START_SCALE;
    h3R.value = 0;

    h4X.value = 0;
    h4Y.value = 0;
    h4O.value = 0;
    h4S.value = START_SCALE;
    h4R.value = 0;
  };

  const resetAll = () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    if (completeTimer.current) clearTimeout(completeTimer.current);
    if (fadeResetTimer.current) clearTimeout(fadeResetTimer.current);

    setTapCount(0);
    setLocked(false);
    setFinalHeartColor(NAVY);
    resetShared();
  };

  const fadeOutAll = () => {
    const fadeDuration = 260;

    h1O.value = withTiming(0, { duration: fadeDuration });
    h2O.value = withTiming(0, { duration: fadeDuration });
    h3O.value = withTiming(0, { duration: fadeDuration });
    h4O.value = withTiming(0, { duration: fadeDuration });

    fadeResetTimer.current = setTimeout(() => {
      resetAll();
    }, fadeDuration + 40);
  };

  const animateHeartToTap = (
    x: SharedValue<number>,
    y: SharedValue<number>,
    o: SharedValue<number>,
    s: SharedValue<number>,
    r: SharedValue<number>,
    endX: number,
    endY: number,
    finalScale: number
  ) => {
    x.value = 0;
    y.value = 0;
    o.value = 1;
    s.value = START_SCALE;

    const randomTilt = (Math.random() * 16) - 8;
    const midX = endX * 0.32;
    const midY = endY * 0.42;

    r.value = randomTilt;

    x.value = withSequence(
      withTiming(midX, { duration: 120 }),
      withTiming(endX, { duration: 180 })
    );

    y.value = withSequence(
      withTiming(midY, { duration: 120 }),
      withTiming(endY, { duration: 180 })
    );

    s.value = withSequence(
      withDelay(300, withTiming(finalScale, { duration: 160 })),
      withTiming(finalScale * 1.12, { duration: 90 }),
      withTiming(finalScale * 0.98, { duration: 70 }),
      withTiming(finalScale, { duration: 60 })
    );
  };

  useEffect(() => {
    if (!enabled) resetAll();
  }, [enabled]);

  useEffect(() => {
    if (!enabled || tapCount === 0) return;

    const spawnCenterX = screenWidth / 2;
    const spawnCenterY = screenHeight - SPAWN_BOTTOM - SPAWN_WRAP_SIZE / 2;

    const endX = lastTap.current.x - spawnCenterX;
    const endY = lastTap.current.y - spawnCenterY;

    if (tapCount === 1) {
      animateHeartToTap(h1X, h1Y, h1O, h1S, h1R, endX, endY, END_SCALE);
    } else if (tapCount === 2) {
      animateHeartToTap(h2X, h2Y, h2O, h2S, h2R, endX, endY, END_SCALE);
    } else if (tapCount === 3) {
      animateHeartToTap(h3X, h3Y, h3O, h3S, h3R, endX, endY, END_SCALE);
    } else if (tapCount === 4) {
      setFinalHeartColor(RED);
      animateHeartToTap(h4X, h4Y, h4O, h4S, h4R, endX, endY, END_SCALE);

      completeTimer.current = setTimeout(() => {
        onComplete();
      }, 700);
    }

    if (tapCount < REQUIRED_TAPS) {
      if (resetTimer.current) clearTimeout(resetTimer.current);
      if (fadeResetTimer.current) clearTimeout(fadeResetTimer.current);

      resetTimer.current = setTimeout(() => {
        fadeOutAll();
      }, RESET_MS);
    }
  }, [tapCount, enabled, onComplete, screenHeight, screenWidth]);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
      if (completeTimer.current) clearTimeout(completeTimer.current);
      if (fadeResetTimer.current) clearTimeout(fadeResetTimer.current);
    };
  }, []);

  const handleTap = (x: number, y: number) => {
    if (!enabled || locked) return;

    lastTap.current = { x, y };

    setTapCount((prev) => {
      const next = prev + 1;
      if (next >= REQUIRED_TAPS) {
        setLocked(true);
        return REQUIRED_TAPS;
      }
      return next;
    });
  };

  const tapGesture = useMemo(
    () =>
      Gesture.Tap().onStart((e) => {
        runOnJS(handleTap)(e.x, e.y);
      }),
    [enabled, locked]
  );

  const sharedHeartStyle = {
    position: "absolute" as const,
    left: "50%" as const,
    top: "50%" as const,
    marginLeft: -27,
    marginTop: -21,
  };

  const h1Style = useAnimatedStyle(() => ({
    opacity: h1O.value,
    transform: [
      { translateX: h1X.value },
      { translateY: h1Y.value },
      { rotate: `${h1R.value}deg` },
      { scale: h1S.value },
    ],
  }));

  const h2Style = useAnimatedStyle(() => ({
    opacity: h2O.value,
    transform: [
      { translateX: h2X.value },
      { translateY: h2Y.value },
      { rotate: `${h2R.value}deg` },
      { scale: h2S.value },
    ],
  }));

  const h3Style = useAnimatedStyle(() => ({
    opacity: h3O.value,
    transform: [
      { translateX: h3X.value },
      { translateY: h3Y.value },
      { rotate: `${h3R.value}deg` },
      { scale: h3S.value },
    ],
  }));

  const h4Style = useAnimatedStyle(() => ({
    opacity: h4O.value,
    transform: [
      { translateX: h4X.value },
      { translateY: h4Y.value },
      { rotate: `${h4R.value}deg` },
      { scale: h4S.value },
    ],
  }));

  return (
    <GestureDetector gesture={tapGesture}>
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={enabled ? "auto" : "none"}
      >
        <View style={styles.spawnWrap} pointerEvents="none">
          <Animated.View style={[sharedHeartStyle, { zIndex: 1 }, h1Style]}>
            <HeartLayer size={54} color={BLACK} />
          </Animated.View>

          <Animated.View style={[sharedHeartStyle, { zIndex: 2 }, h2Style]}>
            <HeartLayer size={54} color={ORANGE} />
          </Animated.View>

          <Animated.View style={[sharedHeartStyle, { zIndex: 3 }, h3Style]}>
            <HeartLayer size={54} color={BLUE} />
          </Animated.View>

          <Animated.View style={[sharedHeartStyle, { zIndex: 4 }, h4Style]}>
            <HeartLayer size={54} color={finalHeartColor} />
          </Animated.View>
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  spawnWrap: {
    position: "absolute",
    bottom: SPAWN_BOTTOM,
    alignSelf: "center",
    width: SPAWN_WRAP_SIZE,
    height: SPAWN_WRAP_SIZE,
  },
});