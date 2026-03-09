import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { supabase } from '../../../services/supabase';
import { useOnboarding } from '../../context/OnboardingContext';
import PrettyBackground from '../../components/PrettyBackground';
import type { RootStackParamList } from '../../AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'CreateAccount'>;

const CreateAccountScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { updateData } = useOnboarding();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleContinue = async () => {
    if (firstName && email && password === confirmPassword) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) return Alert.alert('Signup Error', error.message);
      
      updateData({ firstName, email });
      navigation.navigate('VerifyEmail', { email });
    } else {
      Alert.alert('Error', 'Please fill in all fields and ensure passwords match.');
    }
  };

  return (
    <PrettyBackground>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.title}>Create An Account</Text>
            <Text style={styles.label}>First Name:</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First Name" placeholderTextColor="#999" />
            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email Address" keyboardType="email-address" autoCapitalize="none" />
            <Text style={styles.label}>Password:</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
            <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm Password" secureTextEntry />
            <Text style={styles.disclaimer}>By creating an account you acknowledge that this interface protects your data at a college-level NOT at a professional level</Text>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  card: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, elevation: 5 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6 },
  input: { backgroundColor: '#F5F5F5', borderRadius: 6, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#E0E0E0' },
  disclaimer: { fontSize: 11, color: '#666', textAlign: 'center', marginVertical: 16 },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 6, paddingVertical: 14, alignItems: 'center' },
  continueText: { fontWeight: 'bold', fontSize: 16 },
});

export default CreateAccountScreen;