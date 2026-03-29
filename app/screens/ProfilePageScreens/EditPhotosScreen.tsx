import { useNavigation, useRoute } from '@react-navigation/native';
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

const PAGE_BG = '#EAF1F8';

const EditPhotosScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [photos, setPhotos] = useState<(string | null)[]>(
    route.params?.photos || [null, null, null, null, null, null]
  );

  const pickImage = async (index: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      return Alert.alert(
        'Permission needed',
        'Please grant camera roll permissions'
      );
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

  const handleDone = () => {
    navigation.navigate('EditProfile', {
      updatedPhotos: photos,
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Edit My Photos</Text>

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

          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },

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
    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#002562',
  },

  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  photoBox: {
    width: '48%',
    aspectRatio: 4 / 5,
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

  doneButton: {
    backgroundColor: '#F2C078',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },

  doneText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#002562',
  },
});

export default EditPhotosScreen;