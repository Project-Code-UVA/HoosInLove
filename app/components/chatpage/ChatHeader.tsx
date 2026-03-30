import React from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from '../headercomponents/logo';

const PAGE_BG = '#EAF1F8';
const NAVY = '#002562';

export default function ChatHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoWrapper}>
        <Logo scale={0.7} />
      </View>
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
  },

  logoWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});