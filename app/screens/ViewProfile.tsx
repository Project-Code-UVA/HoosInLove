// app/screens/ViewProfile.tsx
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import PrettyBackground from '../components/PrettyBackground';

interface ProfileData {
  name: string;
  age: number;
  pronouns: string;
  major: string;
  hobbies: string;
  favoriteSpot: string;
  lookingFor: string[];
  loveLanguages: string[];
  about: string;
  playlistLink?: string;
  instagram?: string;
  yearIcon: any; // require(...) for icon
}

interface ProfileScreenProps {
  profile: ProfileData;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ profile }) => {
  return (
    <PrettyBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>

          <Text style={styles.name}>
            {profile.name}, {profile.age}
          </Text>

          <Text style={styles.subtitle}>
            {profile.major} • {profile.hobbies}
          </Text>

          <Text style={styles.pronouns}>{profile.pronouns}</Text>

          {/* Year */}
          <View style={styles.yearSection}>
            <Text style={styles.yearLabel}>Year</Text>
            <Image source={profile.yearIcon} style={styles.yearIcon} />
          </View>

          {/* Looking For */}
          <Text style={styles.sectionHeader}>Looking for:</Text>
          <View style={styles.chipRow}>
            {profile.lookingFor.map((item, idx) => (
              <View key={idx} style={styles.orangeChip}>
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Love Languages */}
          <Text style={styles.sectionHeader}>Love Languages:</Text>
          <View style={styles.chipRow}>
            {profile.loveLanguages.map((item, idx) => (
              <View key={idx} style={styles.blueChip}>
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* About */}
          <Text style={styles.aboutText}>{profile.about}</Text>

          {/* Playlist */}
          {profile.playlistLink && (
            <>
              <Text style={styles.bottomLabel}>My Favorite Playlist:</Text>
              <TouchableOpacity onPress={() => console.log('Open Playlist', profile.playlistLink)}>
              <Text style={styles.linkText}>{profile.playlistLink}</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Instagram */}
          {profile.instagram && (
            <>
              <Text style={styles.bottomLabel}>Instagram:</Text>
              <TouchableOpacity onPress={() => console.log('Open Instagram', profile.instagram)}>
              <Text style={styles.linkText}>{profile.instagram}</Text>
              </TouchableOpacity>
            </>
          )}

        </View>
      </ScrollView>
    </PrettyBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: 'center',
  },

  card: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  headerRow: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },

  headerLink: {
    fontSize: 12,
    color: '#003366',
    backgroundColor: '#C2E3FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  subtitle: {
    marginTop: 4,
    color: '#444',
  },

  pronouns: {
    color: '#555',
    marginBottom: 10,
  },

  picWrapper: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },

  picHolder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#DCEBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  picIcon: {
    width: 50,
    height: 50,
    tintColor: '#777',
  },

  yearSection: {
    alignItems: 'center',
    marginBottom: 15,
  },

  yearLabel: {
    fontWeight: '600',
    marginBottom: 8,
  },

  yearIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },

  infoBlock: {
    marginTop: 10,
  },

  infoLabel: {
    marginTop: 10,
    marginBottom: 4,
    fontWeight: '600',
  },

  infoValueBox: {
    backgroundColor: '#EAF2FF',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  sectionHeader: {
    marginTop: 18,
    fontWeight: '700',
  },

  chipRow: {
    flexDirection: 'row',
    marginTop: 8,
  },

  orangeChip: {
    backgroundColor: '#F9C27A',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 6,
  },

  blueChip: {
    backgroundColor: '#C2E3FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 6,
  },

  chipText: {
    fontWeight: '600',
  },

  photoHolder: {
    width: '100%',
    height: 200,
    backgroundColor: '#C2E3FF',
    borderRadius: 12,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  photoHolderIcon: {
    width: 40,
    height: 40,
    tintColor: '#555',
  },

  aboutText: {
    marginTop: 18,
    color: '#333',
    lineHeight: 20,
  },

  bottomLabel: {
    marginTop: 16,
    fontWeight: '700',
  },

  linkText: {
    color: '#0033CC',
    textDecorationLine: 'underline',
  },

  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#F9C27A',
    paddingVertical: 12,
    marginTop: 20,
  },

  navIcon: {
    width: 26,
    height: 26,
    tintColor: '#002244',
  },
});

export default ProfileScreen;
