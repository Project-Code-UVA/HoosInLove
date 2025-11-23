// app/screens/DatingPreferences1.tsx
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

type Nav = NativeStackNavigationProp<RootStackParamList, 'DatingPreferences1'>;

const DatingPreferences1: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const [gender, setGender] = useState<string | null>(null);
  const [pronouns, setPronouns] = useState('');
  const [age, setAge] = useState('');
  const [attractedTo, setAttractedTo] = useState<string[]>([]);
  const [year, setYear] = useState<string[]>([]);

  const toggle = (value: string, list: string[], setter: (v: string[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter((x) => x !== value));
    } else {
      setter([...list, value]);
    }
  };

  return (
    <PrettyBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Your Preferences</Text>

          {/* Gender (single select, circles) */}
          <Text style={styles.label}>What Is Your Gender?</Text>
          <View style={styles.row}>
            {['Woman', 'Man', 'Other'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.optionRow}
                onPress={() => setGender(option)}
              >
                <View
                  style={[
                    styles.circle,
                    gender === option && styles.circleSelected,
                  ]}
                />
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Pronouns */}
          <Text style={styles.label}>What Are Your Pronouns?</Text>
          <TextInput
            style={styles.input}
            value={pronouns}
            onChangeText={setPronouns}
            placeholder="ex. she/her/hers (optional)"
            placeholderTextColor="#666"
          />

          {/* Age */}
          <Text style={styles.label}>What’s Your Age?</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="ex. 20"
            keyboardType="numeric"
            placeholderTextColor="#666"
          />

          {/* Attracted to (multi select, squares) */}
          <Text style={styles.label}>Which Genders Are You Attracted To?</Text>
          <View style={styles.row}>
            {['Women', 'Men', 'Other'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.optionRow}
                onPress={() => toggle(option, attractedTo, setAttractedTo)}
              >
                <View
                  style={[
                    styles.square,
                    attractedTo.includes(option) && styles.squareSelected,
                  ]}
                />
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Year (multi select, squares) */}
          <Text style={styles.label}>What Year Are You?</Text>
          <View style={styles.rowWrap}>
            {[
              '1st Year',
              '2nd Year',
              '3rd Year',
              '4th Year',
              'Grad Student',
              'Other',
            ].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.optionRow}
                onPress={() => toggle(option, year, setYear)}
              >
                <View
                  style={[
                    styles.square,
                    year.includes(option) && styles.squareSelected,
                  ]}
                />
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('DatingPreferences2')}
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
  input: {
    backgroundColor: '#C2E3FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  square: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#003366',
    marginRight: 6,
  },
  squareSelected: {
    backgroundColor: '#003366',
  },
  optionText: {
    fontSize: 14,
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

export default DatingPreferences1;
