import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

type InfoBubbleProps = {
  name: string;
  age: number;
  yearLabel: string;
  quote: string;
  onPress?: () => void;
  onPressAvatar?: () => void;
};

export default function InfoBubble({
  name,
  age,
  yearLabel,
  quote,
  onPress,
  onPressAvatar,
}: InfoBubbleProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        {/* Left: avatar + year */}
        <View style={styles.leftCol}>
          <Pressable style={styles.avatarOuter} onPress={onPressAvatar}>
            <View style={styles.avatarInner}>
              <Text style={styles.avatarIcon}>📷</Text>
            </View>
          </Pressable>

          <Text style={styles.year}>{yearLabel}</Text>
        </View>

        {/* Right: name + quote */}
        <View style={styles.rightCol}>
          <Text style={styles.name}>
            {name}, {age}
          </Text>
          <Text style={styles.quote}>“{quote}”</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 370,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftCol: {
    alignItems: "center",
    marginRight: 18,
  },
  avatarOuter: {
    width: 81,
    height: 81,
    borderRadius: 40.5,
    backgroundColor: "#002562",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarIcon: {
    fontSize: 22,
  },
  year: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "600",
    color: "#002562",
  },
  rightCol: {
    flex: 1,
  },
  name: {
    fontSize: 34,
    fontWeight: "800",
    color: "#002562",
    lineHeight: 36,
  },
  quote: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "600",
    color: "#002562",
  },
});
