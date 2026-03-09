import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

type Props = {
  title: string;
  items?: string[];
};

const NAVY = "#002562";
const BLUE_PILL = "#AED1EE";
const TAN_PILL = "#F2CF9D";

export default function ProfileTagSection({ title, items = [] }: Props) {
  if (!items.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item, index) => (
          <View
            key={item}
            style={[
              styles.pill,
              index % 2 === 0 ? styles.bluePill : styles.tanPill,
            ]}
          >
            <Text style={styles.pillText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 18,
  },

  title: {
    color: NAVY,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },

  scrollContent: {
    paddingRight: 10,
  },

  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 10,
  },

  pillText: {
    color: NAVY,
    fontWeight: "700",
    fontSize: 14,
  },

  bluePill: {
    backgroundColor: BLUE_PILL,
  },

  tanPill: {
    backgroundColor: TAN_PILL,
  },
});