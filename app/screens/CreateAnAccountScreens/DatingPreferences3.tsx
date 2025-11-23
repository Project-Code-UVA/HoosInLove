// app/screens/DatingPreferences3.tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import type { RootStackParamList } from '../../AppNavigator';
import PrettyBackground from '../../components/PrettyBackground';

type Nav = NativeStackNavigationProp<RootStackParamList, 'DatingPreferences3'>;

const DatingPreferences3: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const [primarySocial, setPrimarySocial] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [major, setMajor] = useState('');
  const [club, setClub] = useState('');
  const [cvilleSpot, setCvilleSpot] = useState('');

  return (
    <PrettyBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Your Preferences (cont.)</Text>

          <Text style={styles.label}>Primary Social</Text>
          <View style={styles.row}>
            {['Instagram', 'Discord', 'Snapchat'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.optionRow}
                onPress={() => setPrimarySocial(option)}
              >
                <View
                  style={[
                    styles.circle,
                    primarySocial === option && styles.circleSelected,
                  ]}
                />
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>What’s your username?</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="write username here"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>What’s Your Major?</Text>
          <TextInput
            style={styles.input}
            value={major}
            onChangeText={setMajor}
            placeholder="ex. Computer Science"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Favorite Club/Extracurricular?</Text>
          <TextInput
            style={styles.input}
            value={club}
            onChangeText={setClub}
            placeholder="ex. WXTJ Student Radio"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Favorite Cville Spot?</Text>
          <TextInput
            style={styles.input}
            value={cvilleSpot}
            onChangeText={setCvilleSpot}
            placeholder="ex. Downtown Mall"
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('FinishProfile')}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#003366',
    marginRight: 6,
  },
  circleSelected: {
    backgroundColor: '#003366',
  },
  optionText: {
    fontSize: 14,
  },
  input: {
    backgroundColor: '#C2E3FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  continueButton: {
    backgroundColor: '#F9C27A',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 18,
  },
  continueText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DatingPreferences3;
