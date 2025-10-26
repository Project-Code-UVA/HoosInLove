import React from 'react';
import { StyleSheet, View } from 'react-native';
import Footer from '../components/footer';
import Header from '../components/header';

export default function BaseScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Content Area
      <View style={styles.mainContent}>
        <Camera />
      </View> */}

      {/* Footer */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
