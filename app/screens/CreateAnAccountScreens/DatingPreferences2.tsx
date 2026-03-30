// src/screens/DatingPreferences2.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PrettyBackground from '../../components/PrettyBackground';
import { useOnboarding } from '../../context/OnboardingContext';

const DatingPreferences2: React.FC = () => {
  const navigation = useNavigation<any>();
  const { updateData } = useOnboarding();
  const [relationship, setRelationship] = useState<string[]>([]);
  const [lifestyle, setLifestyle] = useState<string[]>([]);
  const [loveLanguages, setLoveLanguages] = useState<string[]>([]);

  const toggle = (val: string, list: string[], setter: (v: string[]) => void) => setter(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);

  const handleContinue = () => {
    updateData({ relationship, lifestyle, loveLanguages });
    navigation.navigate('DatingPreferences3');
  };

  return (
    <PrettyBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Your Preferences (cont.)</Text>
          
          <Text style={styles.label}>What Type of Relationship Are You Looking For?</Text>
          <View style={styles.rowWrap}>
            {['Long-Term', 'Short-Term', 'Friend', 'Casual', 'Hookup', 'Other'].map(opt => (
              <TouchableOpacity key={opt} style={styles.optionRow} onPress={() => toggle(opt, relationship, setRelationship)}>
                <View style={[styles.square, relationship.includes(opt) && styles.squareSelected]} />
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.label}>What Is Your Typical Lifestyle?</Text>
          <View style={styles.rowWrap}>
            {['Adventurous', 'Homebody', 'Fitness', 'Workaholic', 'Bookworm', 'Night Owl', 'Spiritual', 'Traveler', 'Early Bird'].map(opt => (
              <TouchableOpacity key={opt} style={styles.optionRow} onPress={() => toggle(opt, lifestyle, setLifestyle)}>
                <View style={[styles.square, lifestyle.includes(opt) && styles.squareSelected]} />
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.label}>What Are Your Love Languages?</Text>
          <View style={styles.rowWrap}>
            {['Words of Affirmation', 'Acts of Service', 'Gift Giving/Receiving', 'Quality Time', 'Physical Touch', 'Deep Conversations'].map(opt => (
              <TouchableOpacity key={opt} style={styles.optionRow} onPress={() => toggle(opt, loveLanguages, setLoveLanguages)}>
                <View style={[styles.square, loveLanguages.includes(opt) && styles.squareSelected]} />
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}><Text style={styles.continueText}>Continue</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </PrettyBackground>
  );
};

// ... Use same styles from DatingPreferences1
const styles = StyleSheet.create({
  container: { paddingVertical: 50, alignItems: 'center' },
  card: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 8, padding: 20, elevation: 5 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  label: { marginTop: 12, marginBottom: 8, fontWeight: '600', fontSize: 13 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 8, width: '45%' },
  square: { width: 14, height: 14, borderRadius: 2, borderWidth: 1, borderColor: '#555', marginRight: 6 },
  squareSelected: { backgroundColor: '#87CEEB', borderColor: '#87CEEB' },
  optionText: { fontSize: 12 },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 4, paddingVertical: 12, marginTop: 18 },
  continueText: { textAlign: 'center', fontWeight: 'bold', fontSize: 14, color: '#333' },
});

export default DatingPreferences2;