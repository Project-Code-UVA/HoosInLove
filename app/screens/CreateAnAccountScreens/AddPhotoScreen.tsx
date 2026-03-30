// src/screens/AddPhotosScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import PrettyBackground from '../../components/PrettyBackground';
import { useOnboarding } from '../../context/OnboardingContext';

const AddPhotosScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { updateData } = useOnboarding();
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null, null, null, null]);

  const pickImage = async (index: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Permission needed', 'Please grant camera roll permissions');

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8,
    });

    if (!result.canceled) {
      const newPhotos = [...photos];
      newPhotos[index] = result.assets[0].uri;
      setPhotos(newPhotos);
    }
  };

  const handleContinue = () => {
    if (photos.filter(p => p !== null).length < 2) return Alert.alert('Not enough photos', 'Please add at least 2 photos to continue');
    updateData({ photos });
    navigation.navigate('DatingPreferences1');
  };

  return (
    <PrettyBackground>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Add Your Photos</Text>
          <View style={styles.photoGrid}>
            {photos.map((photo, index) => (
              <TouchableOpacity key={index} style={styles.photoBox} onPress={() => pickImage(index)} activeOpacity={0.7}>
                {photo ? <Image source={{ uri: photo }} style={styles.photo} /> : (
                  <View style={styles.placeholder}><Ionicons name="camera-outline" size={30} color="#87CEEB" /></View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  card: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 8, padding: 20, elevation: 5 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 10 },
  photoBox: { width: '48%', aspectRatio: 4/5, marginBottom: 12, borderRadius: 8, overflow: 'hidden' },
  placeholder: { flex: 1, backgroundColor: '#C2E3FF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#87CEEB', borderStyle: 'dashed', borderRadius: 8 },
  photo: { width: '100%', height: '100%' },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 4, paddingVertical: 12, alignItems: 'center' },
  continueText: { fontWeight: 'bold', fontSize: 14, color: '#333' },
});

export default AddPhotosScreen;