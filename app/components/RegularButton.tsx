import React, { useRef } from 'react';
import { Animated, GestureResponderEvent, Pressable, StyleSheet, Text } from 'react-native';

const COLORS = {
  orange: '#FFC77D',        // Figma background
  orangePressed: '#F5B562', // darker when pressed
  navy: '#002562',          // Figma text
};

type RegularButtonProps = {
  /** The text displayed on the button */
  label?: string;
  /** Function called when button is pressed */
  onPress?: (event: GestureResponderEvent) => void;
  /** Whether the button is disabled */
  disabled?: boolean;
};

const RegularButton: React.FC<RegularButtonProps> = ({
  label = 'Button',
  onPress,
  disabled = false,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = (toValue: number) =>
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      friction: 6,
      tension: 180,
    }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        onPressIn={() => !disabled && animate(0.97)}
        onPressOut={() => animate(1)}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
      >
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default RegularButton;

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 33,
    backgroundColor: COLORS.orange,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  pressed: {
    backgroundColor: COLORS.orangePressed,
  },
  disabled: {
    opacity: 0.55,
  },
  text: {
    color: COLORS.navy,
    fontWeight: '700',
    fontSize: 14,
  },
});