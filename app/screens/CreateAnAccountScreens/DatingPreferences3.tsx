// src/screens/DatingPreferences3.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PrettyBackground from '../../components/PrettyBackground';
import { useOnboarding } from '../../context/OnboardingContext';

const DatingPreferences3: React.FC = () => {
  const navigation = useNavigation<any>();
  const { updateData } = useOnboarding();
  const [primarySocial, setPrimarySocial] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [major, setMajor] = useState('');
  const [club, setClub] = useState('');
  const [cvilleSpot, setCvilleSpot] = useState('');

  const handleContinue = () => {
    updateData({ primarySocial, username, major, club, cvilleSpot });
    navigation.navigate('FinishProfile');
  };

  return (
    <PrettyBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Your Preferences (cont.)</Text>
          <Text style={styles.label}>Primary Social</Text>
          <View style={styles.row}>
            {['Instagram', 'Discord', 'Snapchat'].map(opt => (
              <TouchableOpacity key={opt} style={styles.optionRow} onPress={() => setPrimarySocial(opt)}>
                <View style={[styles.circle, primarySocial === opt && styles.circleSelected]} />
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>What is your username?</Text>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="write username here" />
          
          <Text style={styles.label}>What is Your Major?</Text>
          <TextInput style={styles.input} value={major} onChangeText={setMajor} placeholder="ex. Computer Science" />
          
          <Text style={styles.label}>Favorite Club/Extracurricular?</Text>
          <TextInput style={styles.input} value={club} onChangeText={setClub} placeholder="ex. WXTJ Student Radio" />
          
          <Text style={styles.label}>Favorite Cville Spot?</Text>
          <TextInput style={styles.input} value={cvilleSpot} onChangeText={setCvilleSpot} placeholder="ex. Downtown Mall" />
          
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}><Text style={styles.continueText}>Continue</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </PrettyBackground>
  );
};

// ... Use identical input/layout styles from DatingPreferences1
const styles = StyleSheet.create({
  container: { paddingVertical: 50, alignItems: 'center' },
  card: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 8, padding: 20, elevation: 5 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  label: { marginTop: 12, marginBottom: 8, fontWeight: '600', fontSize: 13 },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5 },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginRight: 12, marginBottom: 8 },
  circle: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: '#555', marginRight: 6 },
  circleSelected: { backgroundColor: '#87CEEB', borderColor: '#87CEEB' },
  optionText: { fontSize: 13 },
  input: { backgroundColor: '#C2E3FF', borderRadius: 4, padding: 10, fontSize: 13, borderColor: '#A9D6FF', borderWidth: 1 },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 4, paddingVertical: 12, marginTop: 18 },
  continueText: { textAlign: 'center', fontWeight: 'bold', fontSize: 14, color: '#333' },
});

export default DatingPreferences3;