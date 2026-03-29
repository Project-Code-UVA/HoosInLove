import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../headercomponents/logo';

type Props = {
  onMenuPress?: () => void;
};

const PAGE_BG = '#EAF1F8';
const NAVY = '#002562';

export default function ProfileHeader({ onMenuPress }: Props) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoWrapper}>
        <Logo scale={0.7} />
      </View>

      <TouchableOpacity
        style={styles.menuButton}
        activeOpacity={0.8}
        onPress={onMenuPress}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 110,
    backgroundColor: PAGE_BG,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#D3DBE6',
    position: 'relative',
  },

  logoWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  menuButton: {
    position: 'absolute',
    right: 20,
    bottom: 16,
    width: 36,
    height: 24, 
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bar: {
    width: 30,
    height: 4, 
    borderRadius: 999,
    backgroundColor: '#002562',
  },
});