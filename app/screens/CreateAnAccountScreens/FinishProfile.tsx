import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import PrettyBackground from '../../components/PrettyBackground';
import EditPictureModal from '../../components/EditPictureModal';
import { useOnboarding } from '../../context/OnboardingContext';
import { supabase } from '../../../services/supabase';

const FinishProfile: React.FC = () => {
  const { data: obData } = useOnboarding();
  const [bio, setBio] = useState('');
  const [playlistLink, setPlaylistLink] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
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
      // 1. Profile Upsert
      const { error: profileError } = await supabase.from('user_profile').upsert({
        id: user.id, first_name: obData.firstName, email: user.email,
        bio, gender: obData.gender, pronounds: obData.pronouns, 
        school_year: obData.year[0] || 'Other', age: obData.age, 
        playlist: playlistLink, account_status: 'active', verificattion_status: true,
      });
      if (profileError) throw profileError;

      // 2. Join Table Mappings (Lifestyles & Love Languages)
      if (obData.lifestyle.length > 0) {
        const { data: lifeMap } = await supabase.from('lifestyles').select('*');
        const lifeInserts = obData.lifestyle.map(name => ({
          user_id: user.id, lifestyle_id: lifeMap?.find(l => l.name === name)?.lifestyle_id
        })).filter(i => i.lifestyle_id);
        if (lifeInserts.length > 0) await supabase.from('user_lifestyles').insert(lifeInserts);
      }

      if (obData.loveLanguages.length > 0) {
        const { data: loveMap } = await supabase.from('love_languages').select('*');
        const loveInserts = obData.loveLanguages.map(name => ({
          user_id: user.id, love_language_id: loveMap?.find(l => l.name === name)?.love_language_id
        })).filter(i => i.love_language_id);
        if (loveInserts.length > 0) await supabase.from('user_love_languages').insert(loveInserts);
      }

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
            <View style={styles.picHolder}><Image source={require('../../../assets/images/favicon.png')} style={styles.picImg} /></View>
            <View>
              <TouchableOpacity style={styles.blueButton} onPress={() => setModalVisible(true)}><Text style={styles.blueText}>Add Picture</Text></TouchableOpacity>
              <TouchableOpacity style={styles.blueButton} onPress={() => setModalVisible(true)}><Text style={styles.blueText}>Edit Picture</Text></TouchableOpacity>
            </View>
          </View>
          <Text style={styles.label}>Add a Bio:</Text>
          <TextInput style={styles.bioInput} multiline value={bio} onChangeText={setBio} placeholder="Write a bit about yourself..." />
          <Text style={styles.label}>Let your music speak for you:</Text>
          <TextInput style={styles.input} value={playlistLink} onChangeText={setPlaylistLink} placeholder="Favorite playlist link..." />
          <TouchableOpacity style={[styles.continueButton, loading && { opacity: 0.7 }]} onPress={handleEnterLawn} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.continueText}>Enter the Lawn of Love</Text>}
          </TouchableOpacity>
        </View>
        <EditPictureModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      </ScrollView>
    </PrettyBackground>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50 },
  card: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  label: { marginTop: 12, marginBottom: 6, fontWeight: '600' },
  picRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  picHolder: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#F3F3F3', borderWidth: 1, borderColor: '#CCCCCC', justifyContent: 'center', alignItems: 'center', marginRight: 20 },
  picImg: { width: 40, height: 40, tintColor: '#999999' },
  blueButton: { backgroundColor: '#C2E3FF', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 8, marginBottom: 8 },
  blueText: { fontWeight: '600', color: '#003366' },
  bioInput: { backgroundColor: '#C2E3FF', borderRadius: 10, padding: 10, height: 120, textAlignVertical: 'top' },
  input: { backgroundColor: '#C2E3FF', borderRadius: 8, padding: 10 },
  continueButton: { backgroundColor: '#F9C27A', borderRadius: 8, paddingVertical: 10, marginTop: 18 },
  continueText: { textAlign: 'center', fontWeight: 'bold' },
});

export default FinishProfile;