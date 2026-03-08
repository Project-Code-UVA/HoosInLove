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
          <TextInput style={styles.input} value={pronouns} onChangeText={setPronouns} placeholder="ex. she/her/hers" />
          <Text style={styles.label}>What’s Your Age?</Text>
          <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
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
  card: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  label: { marginTop: 12, marginBottom: 6, fontWeight: '600' },
  input: { backgroundColor: '#C2E3FF', borderRadius: 8, padding: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 },
  circle: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#003366', marginRight: 6 },
  circleSelected: { backgroundColor: '#003366' },
  square: { width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: '#003366', marginRight: 6 },
  squareSelected: { backgroundColor: '#003366' },
  optionText: { fontSize: 14 },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 8, paddingVertical: 10, marginTop: 18 },
  continueText: { textAlign: 'center', fontWeight: 'bold' },
});

export default DatingPreferences1;