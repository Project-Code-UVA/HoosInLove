import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { RootStackParamList } from '../../AppNavigator';
import PrettyBackground from '../../components/PrettyBackground';

type Nav = NativeStackNavigationProp<RootStackParamList, 'VerifyEmail'>;
type Route = RouteProp<RootStackParamList, 'VerifyEmail'>;

const VerifyEmailScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { email } = route.params;

  const [code, setCode] = useState('');

  const handleContinue = () => {
    // TODO: Verify code with backend
    navigation.navigate('AppPoliciesNotice');
  };

  return (
    <PrettyBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.title}>Verify Your Email</Text>
            
            <Text style={styles.subtitle}>
              Please enter the code sent to your email below:
            </Text>

            <TextInput
              style={styles.input}
              value={code}
              onChangeText={setCode}
              placeholder=""
              keyboardType="number-pad"
              maxLength={6}
            />

            <TouchableOpacity 
              style={styles.continueButton} 
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '75%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
    marginBottom: 16,
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    textAlign: 'center',
    letterSpacing: 5,
  },
  continueButton: {
    backgroundColor: '#F9C27A',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VerifyEmailScreen;