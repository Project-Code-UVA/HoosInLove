import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ViewFriendsButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.button}
      onPress={() => navigation.navigate('Friends' as never)}
    >
      <Text style={styles.text}>View Friends</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#B8D8F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#00214D',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
