import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import type { RootStackParamList } from '../../AppNavigator';
import PrettyBackground from '../../components/PrettyBackground';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AppPoliciesNotice'>;

const AppPoliciesNoticeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const handleContinue = () => {
    navigation.navigate('AddPhotos');
  };

  return (
    <PrettyBackground>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>NOTICE</Text>
          
          <ScrollView style={styles.scrollContent}>
            <Text style={styles.mainText}>
              Inappropriate behavior on this app will NOT be tolerated. This includes and is not limited to:
            </Text>

            <View style={styles.bulletList}>
              <Text style={styles.bullet}>• Sexual Misconduct & Harassment</Text>
              <Text style={styles.bullet}>• Misrepresentation & Scamming</Text>
              <Text style={styles.bullet}>• Threatening or Abusive Behavior</Text>
              <Text style={styles.bullet}>• Hate Speech</Text>
              <Text style={styles.bullet}>• Spam & Bots</Text>
              <Text style={styles.bullet}>• Multiple Violations of Community Guidelines</Text>
            </View>

            <Text style={styles.footerText}>
              Please keep things positive and don't make others uncomfortable. Have fun (but not too much fun) {'<'}3
            </Text>
          </ScrollView>

          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  card: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },
  scrollContent: {
    flexGrow: 0,
    marginBottom: 16,
  },
  mainText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  bulletList: {
    marginLeft: 8,
    marginBottom: 16,
  },
  bullet: {
    fontSize: 14,
    color: '#333',
    lineHeight: 24,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#F9C27A',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
  },
  continueText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AppPoliciesNoticeScreen;