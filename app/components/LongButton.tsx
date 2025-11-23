import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type LongButtonProps = {
  title: string;
  onPress: () => void;
};

export default function LongButton({ title, onPress }: LongButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 350,
    height: 33,
    backgroundColor: '#FFC67C',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#002561',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
