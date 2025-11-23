// app/screens/DatingPreferences2.tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { RootStackParamList } from '../../AppNavigator';
import PrettyBackground from '../../components/PrettyBackground';

type Nav = NativeStackNavigationProp<RootStackParamList, 'DatingPreferences2'>;

const DatingPreferences2: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const [relationship, setRelationship] = useState<string[]>([]);
  const [lifestyle, setLifestyle] = useState<string[]>([]);
  const [loveLanguages, setLoveLanguages] = useState<string[]>([]);

  const toggle = (value: string, list: string[], setter: (v: string[]) => void) => {
    list.includes(value)
      ? setter(list.filter((x) => x !== value))
      : setter([...list, value]);
  };

  return (
    <PrettyBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Your Preferences (cont.)</Text>

          <Text style={styles.label}>What Type of Relationship Are You Looking For?</Text>
          <View style={styles.rowWrap}>
            {['Long-Term', 'Short-Term', 'Friend', 'Casual', 'Hookup', 'Other'].map(
              (option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionRow}
                  onPress={() => toggle(option, relationship, setRelationship)}
                >
                  <View
                    style={[
                      styles.square,
                      relationship.includes(option) && styles.squareSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>

          <Text style={styles.label}>What Is Your Typical Lifestyle?</Text>
          <View style={styles.rowWrap}>
            {[
              'Adventurous',
              'Homebody',
              'Fitness',
              'Workaholic',
              'Bookworm',
              'Night Owl',
              'Spiritual',
              'Traveler',
              'Early Bird',
            ].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.optionRow}
                onPress={() => toggle(option, lifestyle, setLifestyle)}
              >
                <View
                  style={[
                    styles.square,
                    lifestyle.includes(option) && styles.squareSelected,
                  ]}
                />
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>What Are Your Love Languages?</Text>
          <View style={styles.rowWrap}>
            {[
              'Words of Affirmation',
              'Acts of Service',
              'Gift Giving/Receiving',
              'Quality Time',
              'Physical Touch',
              'Deep Conversations',
            ].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.optionRow}
                onPress={() => toggle(option, loveLanguages, setLoveLanguages)}
              >
                <View
                  style={[
                    styles.square,
                    loveLanguages.includes(option) && styles.squareSelected,
                  ]}
                />
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('DatingPreferences3')}
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

export default DatingPreferences2;
