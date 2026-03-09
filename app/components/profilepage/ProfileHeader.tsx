// app/components/profile/ProfileHeader.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
      >
        <Ionicons name="menu" size={34} color={NAVY} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#D3DBE6',
  },

  logoWrapper: {
    justifyContent: 'flex-end',
  },

  menuButton: {
    justifyContent: 'flex-end',
    paddingBottom: 2,
  },
});