import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList } from '../../AppNavigator';
import PrettyBackground from '../../components/PrettyBackground';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AddPhotos'>;

const AddPhotosScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null, null, null, null]);

  const pickImage = async (index: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }

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
    const uploadedCount = photos.filter(p => p !== null).length;
    if (uploadedCount < 2) {
      Alert.alert('Not enough photos', 'Please add at least 2 photos to continue');
      return;
    }
    navigation.navigate('DatingPreferences1');
  };

  return (
    <PrettyBackground>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Add Your Photos</Text>

          <View style={styles.photoGrid}>
            {photos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                style={styles.photoBox}
                onPress={() => pickImage(index)}
                activeOpacity={0.7}
              >
                {photo ? (
                  <Image source={{ uri: photo }} style={styles.photo} />
                ) : (
                  <View style={styles.placeholder}>
                    <Ionicons name="camera-outline" size={40} color="#87CEEB" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  card: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  photoBox: {
    width: '48%',
    aspectRatio: 4/5,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#C2E3FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#87CEEB',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  continueButton: {
    backgroundColor: '#F9C27A',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
  },
  continueText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddPhotosScreen;