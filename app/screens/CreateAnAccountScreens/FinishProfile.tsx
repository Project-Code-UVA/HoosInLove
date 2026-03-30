// src/screens/FinishProfile.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrettyBackground from '../../components/PrettyBackground';
import { useOnboarding } from '../../context/OnboardingContext';
import { supabase } from '../../../services/supabase';

const FinishProfile: React.FC = () => {
  const { data: obData } = useOnboarding();
  const [bio, setBio] = useState('');
  const [playlistLink, setPlaylistLink] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleEnterLawn = async () => {
    setLoading(true);
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user) {
      setLoading(false);
      return Alert.alert("Session Error", "Your session has expired. Please sign up again.");
    }

    const user = session.user;
    try {
      // Primary mapping to the user_profile based on provided SQL schema
      const { error: profileError } = await supabase.from('user_profile').upsert({
        id: user.id, 
        first_name: obData.firstName, 
        email: user.email,
        bio: bio, 
        gender: obData.gender, 
        pronounds: obData.pronouns, // Deliberate match to schema spelling
        school_year: obData.year[0] || 'Other', 
        age: parseInt(obData.age) || 18, 
        playlist: playlistLink, 
        major: obData.major,
        favorite_club: obData.club,
        favorite_spot: obData.cvilleSpot,
        instagram: obData.primarySocial === 'Instagram' ? obData.username : null,
        account_status: 'active', 
        verificattion_status: true, // Deliberate match to schema spelling
      });
      
      if (profileError) throw profileError;

      // Map join table values (e.g., lifestyles) 
      if (obData.lifestyle.length > 0) {
        const { data: lifeMap } = await supabase.from('lifestyles').select('*');
        if (lifeMap) {
          const lifeInserts = obData.lifestyle.map(name => ({
            user_id: user.id, 
            lifestyle_id: lifeMap.find((l: any) => l.name === name)?.lifestyle_id
          })).filter(i => i.lifestyle_id);
          if (lifeInserts.length > 0) await supabase.from('user_lifestyles').insert(lifeInserts);
        }
      }

      // Map join table values (e.g., love_languages)
      if (obData.loveLanguages.length > 0) {
        const { data: loveMap } = await supabase.from('love_languages').select('*');
        if (loveMap) {
          const loveInserts = obData.loveLanguages.map(name => ({
            user_id: user.id, 
            love_language_id: loveMap.find((l: any) => l.name === name)?.love_language_id
          })).filter(i => i.love_language_id);
          if (loveInserts.length > 0) await supabase.from('user_love_languages').insert(loveInserts);
        }
      }
      
      // Upload Images logic would go here if extending picture table

      navigation.navigate('BaseScreen'); // Final navigation
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
            <View style={styles.picHolder}>
              <Ionicons name="camera-outline" size={30} color="#999" />
            </View>
            <View style={styles.picActions}>
              <TouchableOpacity style={styles.blueButton}><Text style={styles.blueText}>Add Picture</Text></TouchableOpacity>
              <TouchableOpacity style={styles.blueButton}><Text style={styles.blueText}>Edit Picture</Text></TouchableOpacity>
            </View>
          </View>
          
          <Text style={styles.label}>Add a Bio:</Text>
          <TextInput style={styles.bioInput} multiline value={bio} onChangeText={setBio} placeholder="Write a bit about yourself..." />
          
          <Text style={styles.label}>Let your music speak for you:</Text>
          <TextInput style={styles.input} value={playlistLink} onChangeText={setPlaylistLink} placeholder="Drop a link to your favorite playlist..." />
          
          <TouchableOpacity style={[styles.continueButton, loading && { opacity: 0.7 }]} onPress={handleEnterLawn} disabled={loading}>
            {loading ? <ActivityIndicator color="#333" /> : <Text style={styles.continueText}>Enter the Lawn of Love</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  card: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 8, padding: 20, elevation: 5 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  label: { marginTop: 12, marginBottom: 8, fontWeight: '600', fontSize: 13 },
  picRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  picHolder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#CCC', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  picActions: { justifyContent: 'center' },
  blueButton: { backgroundColor: '#C2E3FF', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 4, marginBottom: 8 },
  blueText: { fontWeight: '600', color: '#003366', fontSize: 12 },
  bioInput: { backgroundColor: '#C2E3FF', borderRadius: 4, padding: 10, height: 100, textAlignVertical: 'top', borderColor: '#A9D6FF', borderWidth: 1, fontSize: 13 },
  input: { backgroundColor: '#C2E3FF', borderRadius: 4, padding: 10, borderColor: '#A9D6FF', borderWidth: 1, fontSize: 13 },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 4, paddingVertical: 12, marginTop: 18, alignItems: 'center' },
  continueText: { fontWeight: 'bold', fontSize: 14, color: '#333' },
});

export default FinishProfile;