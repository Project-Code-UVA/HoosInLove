import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import PrettyBackground from '../../components/PrettyBackground';

const VerifyEmailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [code, setCode] = useState('');

  return (
    <PrettyBackground>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <View style={styles.popup}>
            <Text style={styles.title}>Verify Your Email</Text>
            <Text style={styles.subtitle}>Please enter the code sent to your email below:</Text>
            <TextInput style={styles.input} value={code} onChangeText={setCode} keyboardType="number-pad" maxLength={6} />
            <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('AppPoliciesNotice')}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  popup: { width: '75%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  subtitle: { fontSize: 14, color: '#333', marginBottom: 16 },
  input: { backgroundColor: '#F5F5F5', borderRadius: 6, padding: 12, fontSize: 16, marginBottom: 20, textAlign: 'center', letterSpacing: 5 },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 6, paddingVertical: 12, alignItems: 'center' },
  continueText: { fontWeight: 'bold', fontSize: 16 },
});

export default VerifyEmailScreen;