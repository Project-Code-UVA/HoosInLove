import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type SwipeMode = "love" | "friend";

type Props = {
  isOpen: boolean;
  mode: SwipeMode;
  onModeChange: (mode: SwipeMode) => void;
  onClose: () => void;
  children: React.ReactNode;
};

export default function MainDoorView({
  isOpen,
  mode,
  onModeChange,
  onClose,
  children,
}: Props) {
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

  const topBarStyle = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [{ translateY: interpolate(p.value, [0, 1], [-8, 0]) }],
  }));

  if (!mounted) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View style={[styles.topBar, topBarStyle]}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.85}
          onPress={onClose}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.modePill}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.modeOption,
              mode === "love" && { backgroundColor: "#FF5C8A" },
            ]}
            onPress={() => onModeChange("love")}
          >
            <Text
              style={[
                styles.modeText,
                mode === "love" && styles.modeTextActive,
              ]}
            >
              Love
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.modeOption,
              mode === "friend" && { backgroundColor: "#C8A97E" },
            ]}
            onPress={() => onModeChange("friend")}
          >
            <Text
              style={[
                styles.modeText,
                mode === "friend" && styles.modeTextActive,
              ]}
            >
              Friends
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View style={[styles.bubbleWrap, bubbleLayerStyle]}>
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: "absolute",
    top: 58,
    left: 16,
    right: 16,
    zIndex: 1001,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    minWidth: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#002561",
    marginTop: -2,
  },

  modePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 4,
  },

  modeOption: {
    minWidth: 82,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  modeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7A869A",
  },

  modeTextActive: {
    color: "#FFFFFF",
  },

  bubbleWrap: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 110,
    alignItems: "center",
    zIndex: 1000,
  },
});