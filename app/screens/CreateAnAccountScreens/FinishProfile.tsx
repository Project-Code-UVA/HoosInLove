// app/screens/FinishProfile.tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { RootStackParamList } from '../../AppNavigator';
import EditPictureModal from '../../components/EditPictureModal';
import PrettyBackground from '../../components/PrettyBackground';
type Nav = NativeStackNavigationProp<RootStackParamList, 'FinishProfile'>;
const FinishProfile: React.FC = () => {
  const [bio, setBio] = useState('');
  const [playlistLink, setPlaylistLink] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<Nav>();

  return (
    <PrettyBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Finish Your Profile</Text>

          {/* picture row */}
          <Text style={styles.label}>Add A Profile Picture:</Text>
          <View style={styles.picRow}>
            <View style={styles.picHolder}>
              <Image
                //source={require('../assets/images/favicon.png')}
                style={styles.picImg}
              />
            </View>

            <View>
              <TouchableOpacity
                style={styles.blueButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.blueText}>Add Picture</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.blueButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.blueText}>Edit Picture</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* bio */}
          <Text style={styles.label}>Add a Bio:</Text>
          <TextInput
            style={styles.bioInput}
            multiline
            value={bio}
            onChangeText={setBio}
            placeholder="Write a bit about yourself..."
            placeholderTextColor="#666"
          />

          {/* playlist */}
          <Text style={styles.label}>Let your music speak for you:</Text>
          <TextInput
            style={styles.input}
            value={playlistLink}
            onChangeText={setPlaylistLink}
            placeholder="Drop a link to your favorite playlist..."
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              // later: submit to DB + navigate to main app
              console.log('Finish profile!');
              navigation.navigate('BaseScreen');
            }}
          >
            <Text style={styles.continueText}>Enter the Lawn of Love</Text>
          </TouchableOpacity>
        </View>

        <EditPictureModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
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
  picRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picHolder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F3F3F3',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  picImg: {
    width: 40,
    height: 40,
    tintColor: '#999999',
  },
  blueButton: {
    backgroundColor: '#C2E3FF',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  blueText: {
    fontWeight: '600',
    color: '#003366',
  },
  bioInput: {
    backgroundColor: '#C2E3FF',
    borderRadius: 10,
    padding: 10,
    height: 120,
    textAlignVertical: 'top',
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

export default FinishProfile;
