import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../components/footer';
import Header from '../components/header';

export default function BaseScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* <Camera /> */}

        {/* Quick link to Login */}
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginLink}>Go to Login</Text>
        </TouchableOpacity>
      </View>

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
  loginLink: {
    marginTop: 20,
    color: '#003366',
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
