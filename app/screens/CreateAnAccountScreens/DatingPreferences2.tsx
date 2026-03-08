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
          <Text style={styles.label}>What Type of Relationship?</Text>
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

const styles = StyleSheet.create({
  container: { paddingVertical: 50, alignItems: 'center' },
  card: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  label: { marginTop: 12, marginBottom: 6, fontWeight: '600' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 },
  square: { width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: '#003366', marginRight: 6 },
  squareSelected: { backgroundColor: '#003366' },
  optionText: { fontSize: 14 },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 8, paddingVertical: 10, marginTop: 18 },
  continueText: { textAlign: 'center', fontWeight: 'bold' },
});

export default DatingPreferences2;