// app/components/Swipepage/InfoBubble.tsx
import React, { useEffect, useMemo } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  profile: {
    name: string;
    age: number;
    yearLabel?: string; // e.g. "3rd Year"
    quote?: string;
    photoUri?: string; // optional
  };
  expandEnabled: boolean;
  showHandle?: boolean;
};

const NAVY = "#002562";
const CARD_BG = "#FFFFFF";
const INNER_GRAY = "#D9D9D9";

const COLLAPSED_H = 150;
const EXPANDED_H = 700;

const HANDLE_W = 165;
const HANDLE_H = 5;

const QUOTE_LINES = 3;
const QUOTE_LINE_HEIGHT = 21;
const QUOTE_MAX_CHARS = 90;

// smoother spring (less snappy / less bounce)
const BUBBLE_SPRING = {
  damping: 44,
  stiffness: 155,
  mass: 1.2,
  overshootClamping: true,
  restDisplacementThreshold: 0.5,
  restSpeedThreshold: 0.5,
};

// space under handle when expanded
const TOP_PAD_WHEN_EXPANDED = 20;

export default function InfoBubble({
  profile,
  expandEnabled,
  showHandle = true,
}: Props) {
  const h = useSharedValue(COLLAPSED_H);
  const startH = useSharedValue(COLLAPSED_H);

  const clippedQuote = useMemo(() => {
    const q = (profile.quote ?? "").trim();
    if (!q) return "";
    if (q.length <= QUOTE_MAX_CHARS) return q;
    return q.slice(0, QUOTE_MAX_CHARS - 1) + "…";
  }, [profile.quote]);

  useEffect(() => {
    if (!expandEnabled) {
      h.value = withSpring(COLLAPSED_H, BUBBLE_SPRING);
    }
  }, [expandEnabled]);

  const pan = Gesture.Pan()
    .enabled(expandEnabled)
    .onBegin(() => {
      startH.value = h.value;
    })
    .onUpdate((e) => {
      const next = startH.value + -e.translationY;
      h.value = Math.max(COLLAPSED_H, Math.min(EXPANDED_H, next));
    })
    .onEnd(() => {
      const mid = (COLLAPSED_H + EXPANDED_H) / 2;
      const snapToExpanded = h.value > mid;
      h.value = withSpring(
        snapToExpanded ? EXPANDED_H : COLLAPSED_H,
        BUBBLE_SPRING
      );
    });

  const cardStyle = useAnimatedStyle(() => ({ height: h.value }));

  // ✅ KEY: offset derived continuously from height (no abrupt jump), with safe inline clamp
  const contentStyle = useAnimatedStyle(() => {
    // clamp01 inside the worklet
    const raw = (h.value - COLLAPSED_H) / (EXPANDED_H - COLLAPSED_H);
    const t = raw < 0 ? 0 : raw > 1 ? 1 : raw;

    // optional easing so it moves less at the start of the drag
    const easedT = Math.pow(t, 1.25);

    // negate the "center drift" when the card grows
    const expandedShift =
      -((EXPANDED_H - COLLAPSED_H) / 2) + TOP_PAD_WHEN_EXPANDED;

    return {
      transform: [{ translateY: easedT * expandedShift }],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, cardStyle]}>
        <View
          style={[styles.handleWrap, { opacity: showHandle ? 1 : 0 }]}
          pointerEvents="none"
        >
          <View style={styles.handle} />
        </View>

        <Animated.View style={[styles.row, contentStyle]}>
          {/* Avatar + Year */}
          <View style={styles.leftCol}>
            <View style={styles.avatarOuter}>
              <View style={styles.avatarInner}>
                {profile.photoUri ? (
                  <Image
                    source={{ uri: profile.photoUri }}
                    style={styles.avatarImg}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <View style={styles.cameraGlyph} />
                  </View>
                )}
              </View>
            </View>

            {!!profile.yearLabel && (
              <Text style={styles.yearLabel} numberOfLines={1}>
                {profile.yearLabel}
              </Text>
            )}
          </View>

          {/* Text */}
          <View style={styles.textCol}>
            <Text
              style={styles.name}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.85}
            >
              {`${profile.name}, ${profile.age}`}
            </Text>

            <Text
              style={styles.quote}
              numberOfLines={QUOTE_LINES}
              ellipsizeMode="tail"
            >
              {clippedQuote ? `“${clippedQuote}”` : " "}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignSelf: "stretch",
    backgroundColor: CARD_BG,
    borderRadius: 24,

    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,

    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    overflow: "hidden",
  },

  handleWrap: {
    position: "absolute",
    top: 3,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  handle: {
    width: HANDLE_W,
    height: HANDLE_H,
    borderRadius: HANDLE_H / 2,
    backgroundColor: NAVY,
  },

  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  leftCol: {
    width: 104,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },

  avatarOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: NAVY,
    backgroundColor: CARD_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: INNER_GRAY,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImg: { width: "100%", height: "100%" },

  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraGlyph: {
    width: 46,
    height: 34,
    borderRadius: 6,
    backgroundColor: INNER_GRAY,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.25)",
  },

  yearLabel: {
    marginTop: 5,
    color: NAVY,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "800",
  },

  textCol: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 6,
  },

  name: {
    color: NAVY,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  quote: {
    marginTop: 6,
    color: NAVY,
    fontSize: 16,
    lineHeight: QUOTE_LINE_HEIGHT,
    fontWeight: "700",
    height: QUOTE_LINES * QUOTE_LINE_HEIGHT,
  },
});
