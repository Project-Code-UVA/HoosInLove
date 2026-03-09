// app/components/profile/ProfileMenuOverlay.tsx
import React, { useEffect } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  onEditProfile?: () => void;
  onEditDoor?: () => void;
  onReportIssue?: () => void;
  onLogout?: () => void;
  onDeleteProfile?: () => void;
};

const { width: SCREEN_W } = Dimensions.get("window");

const NAVY = "#002562";
const BG = "#EAF1F8";
const RED = "#C62828";
const LIGHT_RED = "#FDEAEA";
const LIGHT_BLUE = "#E7EDFF";

const PANEL_W = Math.min(SCREEN_W * 0.60, 250);

export default function ProfileMenuOverlay({
  visible,
  onClose,
  onEditProfile,
  onEditDoor,
  onReportIssue,
  onLogout,
  onDeleteProfile,
}: Props) {
  const slideX = useSharedValue(PANEL_W);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      slideX.value = withTiming(0, { duration: 280 });
      opacity.value = withTiming(1, { duration: 220 });
    } else {
      slideX.value = withTiming(PANEL_W, { duration: 220 });
      opacity.value = withTiming(0, { duration: 180 });
    }
  }, [visible, slideX, opacity]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <>
      <Animated.View style={[styles.backdrop, fadeStyle]}>
        <Pressable style={styles.backdropPressable} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.panel, panelStyle]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.8}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={30} color={NAVY} />
          </TouchableOpacity>

          <Text style={styles.titleText}>Hoos In Love</Text>
        </View>

        <View style={styles.menuItems}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.menuItem}
            onPress={onEditProfile}
          >
            <Text style={styles.menuText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.menuItem}
            onPress={onEditDoor}
          >
            <Text style={styles.menuText}>Edit Door</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.menuItem}
            onPress={onReportIssue}
          >
            <Text style={styles.menuText}>Report An Issue</Text>
          </TouchableOpacity>

          <View style={styles.sectionGap} />

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.logoutButton}
            onPress={onLogout}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.deleteButton}
            onPress={onDeleteProfile}
          >
            <Text style={styles.deleteText}>Delete Profile</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 40,
  },

  backdropPressable: {
    flex: 1,
  },

  panel: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: PANEL_W,
    backgroundColor: BG,
    paddingTop: 66,
    paddingHorizontal: 18,
    zIndex: 50,
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: -4, height: 0 },
    elevation: 18,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 38,
  },

  backButton: {
    marginLeft: -8,
    marginRight: 18,
    paddingVertical: 4,
    paddingRight: 2,
  },

  titleText: {
    fontSize: 24,
    fontWeight: "800",
    color: NAVY,
  },

  menuItems: {
    flex: 1,
    alignItems: "flex-start",
  },

  menuItem: {
    paddingVertical: 13,
  },

  menuText: {
    fontSize: 20,
    fontWeight: "600",
    color: NAVY,
  },

  sectionGap: {
    height: 34,
  },

  logoutButton: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF1DC",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 18,
    marginBottom: 14,
  },

  logoutText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#B34700",
  },

  deleteButton: {
    alignSelf: "flex-start",
    backgroundColor: LIGHT_RED,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 18,
  },

  deleteText: {
    fontSize: 17,
    fontWeight: "700",
    color: RED,
  },
});