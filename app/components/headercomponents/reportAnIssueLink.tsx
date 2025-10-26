import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ReportAnIssueLink() {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => { /* hook up later */ }}>
      <Text style={styles.text}>Report An Issue</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    lineHeight: 16,
    color: '#9A9A9A',
    fontWeight: '600',
  },
});
