import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AccountIcon from './footercomponents/accountIcon';
import ChatIcon from './footercomponents/chatIcon';
import HeartIcon from './footercomponents/heartIcon';

export default function Footer() {
  const nav = useNavigation();

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => nav.navigate('Messages' as never)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <ChatIcon height={30.5} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconButton, styles.centerIcon]}
        onPress={() => nav.navigate('Matches' as never)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <HeartIcon size={43} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => nav.navigate('Profile' as never)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <AccountIcon size={22} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 65,
    width: '100%',
    backgroundColor: '#FFC77D',
    borderTopWidth: 1,
    borderTopColor: '#E9E9E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // switched from even spacing to true edge spacing
    paddingHorizontal: 55, // adds extra outer margin for breathing room
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerIcon: {
    marginBottom: 1.5, // slight visual centering
  },
});
