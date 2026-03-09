import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  label: string;
  value?: string;
  variant?: "blue" | "tan";
};

const NAVY = "#002562";
const INFO_BLUE = "#E6EEF7";
const INFO_TAN = "#F7E2BF";

export default function ProfileInfoBlock({
  label,
  value,
  variant = "blue",
}: Props) {
  if (!value) return null;

  return (
    <View
      style={[
        styles.container,
        variant === "blue" ? styles.blueBg : styles.tanBg,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },

  blueBg: {
    backgroundColor: INFO_BLUE,
  },

  tanBg: {
    backgroundColor: INFO_TAN,
  },

  label: {
    color: NAVY,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 6,
  },

  value: {
    color: NAVY,
    fontSize: 14,
    lineHeight: 20,
  },
});