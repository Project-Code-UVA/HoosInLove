// src/screens/AppPoliciesNoticeScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PrettyBackground from '../../components/PrettyBackground';

const AppPoliciesNoticeScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <PrettyBackground>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>NOTICE</Text>
          <ScrollView style={styles.scrollContent}>
            <Text style={styles.mainText}>Inappropriate behavior on this app will NOT be tolerated. This includes and is not limited to:</Text>
            <View style={styles.bulletList}>
              {['Sexual Misconduct & Harassment', 'Misrepresentation & Scamming', 'Threatening or Abusive Behavior', 'Illegal Activity', 'Spam & Bots', 'Multiple Violations of Community Guidelines'].map((item, index) => (
                <Text key={index} style={styles.bullet}>• {item}</Text>
              ))}
            </View>
            <Text style={styles.footerText}>Please keep things positive and do not make others uncomfortable. Have fun (but not too much fun) {'<'}3</Text>
          </ScrollView>
          <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('AddPhotos')}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  card: { width: '85%', maxHeight: '80%', backgroundColor: '#FFFFFF', borderRadius: 8, padding: 24, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  scrollContent: { flexGrow: 0, marginBottom: 16 },
  mainText: { fontSize: 13, color: '#333', lineHeight: 18, marginBottom: 12 },
  bulletList: { marginLeft: 8, marginBottom: 16 },
  bullet: { fontSize: 13, color: '#333', lineHeight: 22, marginBottom: 4 },
  footerText: { fontSize: 13, color: '#333', lineHeight: 18 },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 4, paddingVertical: 12, alignItems: 'center' },
  continueText: { fontWeight: 'bold', fontSize: 14, color: '#333' },
});

export default AppPoliciesNoticeScreen;