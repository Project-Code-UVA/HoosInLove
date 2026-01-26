import React from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

type Props = {
  progress: SharedValue<number>; // 0..1
  direction: "ltr" | "rtl";
};

export default function ProgressBar({ progress, direction }: Props) {
  const w = useSharedValue(0);

  const onLayout = (e: LayoutChangeEvent) => {
    w.value = e.nativeEvent.layout.width;
  };

  const fillStyle = useAnimatedStyle(() => {
    if (w.value <= 0) return { width: 0, transform: [{ translateX: 0 }] };

    // clamp progress
    const p = Math.max(0, Math.min(1, progress.value));
    const fillW = Math.min(w.value, w.value * p);

    return {
      width: fillW,
      transform: [
        {
          // rtl: keep the RIGHT edge pinned, grow left
          translateX: direction === "rtl" ? w.value - fillW : 0,
        },
      ],
    };
  });

  return (
    <View style={styles.container} onLayout={onLayout} pointerEvents="none">
      <Animated.View style={[styles.fill, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 6,
    width: "90%",
    alignSelf: "center",
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#5E6F3A",
    borderRadius: 6,
  },
});
