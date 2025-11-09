// screens/LoginScreen.tsx
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import PrettyBackground from '../components/PrettyBackground';

const LoginScreen: React.FC = () => {
  return (
    <PrettyBackground>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createBtn}>
            <Text style={styles.createText}>Create An Account</Text>
          </TouchableOpacity>

          <Text style={styles.link}>Forgot My Password?</Text>
        </View>
      </KeyboardAvoidingView>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'black',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  loginBtn: {
    backgroundColor: '#bcdfff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  loginText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#003366',
  },
  createBtn: {
    backgroundColor: '#f9c27a',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  createText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#222',
  },
  link: {
    color: '#003366',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
