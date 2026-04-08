// app/screens/CreateAnAccountScreens/FinishProfile.tsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../../services/supabase';
import PrettyBackground from '../../components/PrettyBackground';
import { useOnboarding } from '../../context/OnboardingContext';

const FinishProfile: React.FC = () => {
  const { data: obData } = useOnboarding();
  const [bio, setBio] = useState('');
  const [playlistLink, setPlaylistLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImageUri(result.assets[0].uri);
    }
  };

  const uploadAndLinkPicture = async (userId: string) => {
    if (!profileImageUri) return null;

    // 1. Prepare file for Supabase Storage
    const response = await fetch(profileImageUri);
    const blob = await response.blob();
    const filePath = `${userId}/profile_${Date.now()}.jpg`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('profile_pics')
      .upload(filePath, blob, { contentType: 'image/jpeg', upsert: true });

    if (uploadError) throw uploadError;

    // 2. Insert record into your 'pictures' table
    const { data: picData, error: picError } = await supabase
      .from('pictures')
      .insert({
        user_id: userId,
        picture_type: 'profile', // Matches your varchar requirement
        order_index: 0,
        // The URL isn't in your 'pictures' schema, 
        // but typically you'd store the path or URL here.
        // For now, we return the ID to link it to the profile.
      })
      .select('pictures_id')
      .single();

    if (picError) throw picError;
    return picData.pictures_id;
  };

  const handleEnterLawn = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      setLoading(false);
      return Alert.alert("Session Error", "Please sign up again.");
    }

    const user = session.user;

    try {
      // 1. Handle Picture Upload first
      const newPicId = await uploadAndLinkPicture(user.id);

      // 2. Update user_profile (using your specific misspelled columns)
      const { error: profileError } = await supabase.from('user_profile').upsert({
        id: user.id, 
        first_name: obData.firstName, 
        email: user.email,
        bio: bio, 
        gender: obData.gender, 
        pronounds: obData.pronouns, // schema spelling
        school_year: obData.year[0] || 'Other', 
        age: parseInt(obData.age) || 18, 
        playlist: playlistLink, 
        major: obData.major,
        favorite_club: obData.club,
        favorite_spot: obData.cvilleSpot,
        instagram: obData.primarySocial === 'Instagram' ? obData.username : null,
        account_status: 'active', 
        verificattion_status: true, // schema spelling
        pictures_id: newPicId, // Linking the primary picture
      });
      
      if (profileError) throw profileError;

      navigation.navigate('BaseScreen');
    } catch (err: any) {
      Alert.alert('Database Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrettyBackground>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Finish Your Profile</Text>
          
          <Text style={styles.label}>Add A Profile Picture:</Text>
          <View style={styles.picRow}>
            <TouchableOpacity style={styles.picHolder} onPress={pickImage}>
              {profileImageUri ? (
                <Image source={{ uri: profileImageUri }} style={styles.image} />
              ) : (
                <Ionicons name="camera-outline" size={30} color="#999" />
              )}
            </TouchableOpacity>
            <View style={styles.picActions}>
              <TouchableOpacity style={styles.blueButton} onPress={pickImage}>
                <Text style={styles.blueText}>{profileImageUri ? 'Change Picture' : 'Add Picture'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <Text style={styles.label}>Add a Bio:</Text>
          <TextInput 
            style={styles.bioInput} 
            multiline 
            value={bio} 
            onChangeText={setBio} 
            placeholder="Write a bit about yourself..." 
          />
          
          <Text style={styles.label}>Favorite Playlist Link:</Text>
          <TextInput 
            style={styles.input} 
            value={playlistLink} 
            onChangeText={setPlaylistLink} 
            placeholder="Spotify/Apple Music link..." 
          />
          
          <TouchableOpacity 
            style={[styles.continueButton, loading && { opacity: 0.7 }]} 
            onPress={handleEnterLawn} 
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#333" /> : <Text style={styles.continueText}>Enter the Lawn of Love</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  card: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  label: { marginTop: 12, marginBottom: 8, fontWeight: '600', fontSize: 14 },
  picRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  picHolder: { 
    width: 90, 
    height: 90, 
    borderRadius: 45, 
    backgroundColor: '#F0F0F0', 
    borderWidth: 1, 
    borderColor: '#CCC', 
    borderStyle: 'dashed', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15,
    overflow: 'hidden'
  },
  image: { width: '100%', height: '100%' },
  picActions: { flex: 1 },
  blueButton: { backgroundColor: '#C2E3FF', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  blueText: { fontWeight: '700', color: '#003366', fontSize: 13 },
  bioInput: { backgroundColor: '#C2E3FF', borderRadius: 8, padding: 12, height: 100, textAlignVertical: 'top', fontSize: 14 },
  input: { backgroundColor: '#C2E3FF', borderRadius: 8, padding: 12, fontSize: 14 },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 8, paddingVertical: 14, marginTop: 20, alignItems: 'center' },
  continueText: { fontWeight: 'bold', fontSize: 16, color: '#333' },
});

export default FinishProfile;