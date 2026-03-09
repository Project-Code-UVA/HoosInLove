import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  photoUri?: string;
  dotCount?: number;
  activeIndex?: number;
};

const SOFT_BLUE = "#AED1EE";
const DOT_GRAY = "#D3D3D3";
const ACTIVE_DOT = "#9D9D9D";

export default function ProfilePhotoCard({
  photoUri,
  dotCount = 6,
  activeIndex = 0,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.photoBox}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          <Ionicons name="camera-outline" size={70} color="#4E5E73" />
        )}
      </View>

      <View style={styles.dotsRow}>
        {Array.from({ length: dotCount }).map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },

  photoBox: {
    width: "100%",
    aspectRatio: 4 / 5,
    borderRadius: 18,
    backgroundColor: SOFT_BLUE,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 14,
  },

  photo: {
    width: "100%",
    height: "100%",
  },

  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: DOT_GRAY,
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: ACTIVE_DOT,
  },
});