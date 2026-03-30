// src/screens/DatingPreferences1.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PrettyBackground from '../../components/PrettyBackground';
import { useOnboarding } from '../../context/OnboardingContext';

const DatingPreferences1: React.FC = () => {
  const navigation = useNavigation<any>();
  const { updateData } = useOnboarding();
  const [gender, setGender] = useState<string | null>(null);
  const [pronouns, setPronouns] = useState('');
  const [age, setAge] = useState('');
  const [attractedTo, setAttractedTo] = useState<string[]>([]);
  const [year, setYear] = useState<string[]>([]);

  const toggle = (val: string, list: string[], setter: (v: string[]) => void) => setter(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);

  const handleContinue = () => {
    updateData({ gender, pronouns, age, attractedTo, year });
    navigation.navigate('DatingPreferences2');
  };

  return (
    <PrettyBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Your Preferences</Text>
          
          <Text style={styles.label}>What Is Your Gender?</Text>
          <View style={styles.row}>
            {['Woman', 'Man', 'Other'].map(opt => (
              <TouchableOpacity key={opt} style={styles.optionRow} onPress={() => setGender(opt)}>
                <View style={[styles.circle, gender === opt && styles.circleSelected]} />
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.label}>What Are Your Pronouns?</Text>
          <TextInput style={styles.input} value={pronouns} onChangeText={setPronouns} placeholder="ex. she/her/hers (optional)" />
          
          <Text style={styles.label}>What’s Your Age?</Text>
          <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="ex. 20" keyboardType="numeric" />
          
          <Text style={styles.label}>Which Genders Are You Attracted To?</Text>
          <View style={styles.row}>
            {['Women', 'Men', 'Other'].map(opt => (
              <TouchableOpacity key={opt} style={styles.optionRow} onPress={() => toggle(opt, attractedTo, setAttractedTo)}>
                <View style={[styles.square, attractedTo.includes(opt) && styles.squareSelected]} />
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.label}>What Year Are You?</Text>
          <View style={styles.rowWrap}>
            {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Grad Student', 'Other'].map(opt => (
              <TouchableOpacity key={opt} style={styles.optionRow} onPress={() => toggle(opt, year, setYear)}>
                <View style={[styles.square, year.includes(opt) && styles.squareSelected]} />
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
  card: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 8, padding: 20, elevation: 5 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  label: { marginTop: 12, marginBottom: 8, fontWeight: '600', fontSize: 13 },
  input: { backgroundColor: '#C2E3FF', borderRadius: 4, padding: 10, fontSize: 13, borderColor: '#A9D6FF', borderWidth: 1 },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 },
  circle: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: '#555', marginRight: 6 },
  circleSelected: { backgroundColor: '#87CEEB', borderColor: '#87CEEB' },
  square: { width: 14, height: 14, borderRadius: 2, borderWidth: 1, borderColor: '#555', marginRight: 6 },
  squareSelected: { backgroundColor: '#87CEEB', borderColor: '#87CEEB' },
  optionText: { fontSize: 13 },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 4, paddingVertical: 12, marginTop: 18 },
  continueText: { textAlign: 'center', fontWeight: 'bold', fontSize: 14, color: '#333' },
});

export default DatingPreferences1;