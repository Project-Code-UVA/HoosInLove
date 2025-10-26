import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from './headercomponents/logo';
import ReportAnIssueLink from './headercomponents/reportAnIssueLink';
import ViewFriendsButton from './headercomponents/viewFriendsButton';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      {/* Left: Logo */}
      <Logo />

      {/* Right: Stacked buttons */}
      <View style={styles.rightSide}>
        <ReportAnIssueLink />
        <View style={styles.spacing} />
        <ViewFriendsButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  rightSide: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  spacing: {
    height: 4, // small gap between the two buttons
  },
});
