// src/screens/VerifyEmailScreen.tsx
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { supabase } from '../../../services/supabase';
import PrettyBackground from '../../components/PrettyBackground';

const VerifyEmailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const email = route.params?.email || '';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    // UPDATED: Check for 8 digits instead of 6
    if (code.length < 8) return Alert.alert('Invalid Code', 'Please enter the 8-digit code.');
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'signup'
    });
    setLoading(false);

    if (error) {
      Alert.alert('Verification Failed', error.message);
    } else {
      navigation.navigate('AppPoliciesNotice');
    }
  };

  return (
    <PrettyBackground>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <View style={styles.popup}>
            <Text style={styles.title}>Verify Your Email</Text>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>Please enter the code sent to your email below:</Text>
            <View style={styles.codeContainer}>
               {/* UPDATED: maxLength to 8 and placeholder to 8 zeros */}
               <TextInput 
                 style={styles.input} 
                 value={code} 
                 onChangeText={setCode} 
                 keyboardType="number-pad" 
                 maxLength={8} 
                 placeholder="00000000" 
               />
            </View>
            <TouchableOpacity style={styles.continueButton} onPress={handleVerify} disabled={loading}>
              <Text style={styles.continueText}>{loading ? 'Verifying...' : 'Continue'}</Text>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  popup: { width: '80%', backgroundColor: '#FFFFFF', borderRadius: 8, padding: 24, elevation: 5 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#EEE', marginBottom: 16 },
  subtitle: { fontSize: 13, color: '#333', marginBottom: 16, textAlign: 'center' },
  codeContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  // UPDATED: Reduced letter spacing slightly to fit 8 digits comfortably on smaller screens
  input: { backgroundColor: '#F5F5F5', borderRadius: 6, padding: 12, fontSize: 24, textAlign: 'center', letterSpacing: 4, borderWidth: 1, borderColor: '#E0E0E0', width: '100%' },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 4, paddingVertical: 12, alignItems: 'center' },
  continueText: { fontWeight: 'bold', fontSize: 14, color: '#333' },
});

export default VerifyEmailScreen;