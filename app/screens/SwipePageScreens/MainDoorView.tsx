import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

export default function MainDoorView({ isOpen, children }: Props) {
  const p = useSharedValue(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setMounted(true);

    p.value = withTiming(
      isOpen ? 1 : 0,
      {
        duration: isOpen ? 320 : 220,
        easing: Easing.out(Easing.cubic),
      },
      (finished) => {
        if (finished && !isOpen) {
          runOnJS(setMounted)(false);
        }
      }
    );
  }, [isOpen]);

  const bubbleLayerStyle = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [{ scale: interpolate(p.value, [0, 1], [0.98, 1]) }],
  }));

  if (!mounted) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View style={[styles.bubbleWrap, bubbleLayerStyle]} pointerEvents="auto">
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleWrap: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 110,
    alignItems: "center",
    zIndex: 1000,
  },
});
