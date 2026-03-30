import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { supabase } from "@/services/supabase";
import PrettyBackground from '../../components/PrettyBackground';
import EditProfileHeader from '../../components/profilepage/EditProfileHeader';

const NAVY = '#002562';
const PAGE_BG = '#EAF1F8';
const CARD_BG = '#FFFFFF';
const LIGHT_BLUE = '#C2E3FF';
const INPUT_BG = '#D9D9D9';
const TAN = '#F2C078';

const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Grad Student',
  'Other',
];

const RELATIONSHIP_OPTIONS = [
  'Long-Term',
  'Short-Term',
  'Open',
  'Casual',
  'Hookup',
  'Other',
];

const LIFESTYLE_OPTIONS = [
  'Adventurous',
  'Homebody',
  'Fitness',
  'Workaholic',
  'Bookworm',
  'Night Owl',
  'Spiritual',
  'Traveler',
  'Early Bird',
];

const LOVE_LANGUAGE_OPTIONS = [
  'Words of Affirmation',
  'Acts of Service',
  'Gift Giving/Receiving',
  'Quality Time',
  'Physical Touch',
  'Deep Conversations',
];

const GENDER_OPTIONS = ['Woman', 'Man', 'Other'];
const SOCIAL_OPTIONS = ['Instagram', 'Discord', 'Snapchat'];

export default function EditProfileScreen() {
  const navigation = useNavigation<any>();
  // const profile = MOCK_CURRENT_USER; // get rid of later

  // start of database stuff (NOT TESTED MAY BE BROKEN!!!)
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("user_profile")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (data) {
        setProfile(data);

        setName(data.first_name || "");
        setAge(data.age ? String(data.age) : "");
        setFirstImpression(data.quote || "");
        setPronouns(data.pronouns || "");
        setMajor(data.major || "");
        setBio(data.bio || "");
        setClub(data.favorite_club || "");
        setFavoriteSpot(data.favorite_spot || "");
        setPlaylist(data.playlist || "");
        setUsername(data.instagram || "");

        setSelectedYear(data.school_year ? [data.school_year] : []);
        setRelationship(data.relationship_type || []);
        setLifestyle(data.lifestyle || []);
        setLoveLanguages(data.love_language || []);
        setGender(data.gender || null);
      }
    };

    loadProfile();
  }, []);
  // end of database stuff (NOT TESTED MAY BE BROKEN!!!)

  const [name, setName] = useState(profile.name || '');
  const [age, setAge] = useState(profile.age ? String(profile.age) : '');
  const [firstImpression, setFirstImpression] = useState(profile.quote || '');
  const [pronouns, setPronouns] = useState(profile.pronouns || '');
  const [major, setMajor] = useState(profile.major || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [club, setClub] = useState(profile.favoriteClub || '');
  const [favoriteSpot, setFavoriteSpot] = useState(profile.favoriteSpot || '');
  const [playlist, setPlaylist] = useState(profile.playlist || '');
  const [username, setUsername] = useState(profile.instagram || '');

  const [selectedYear, setSelectedYear] = useState<string[]>(
    profile.yearLabel ? [profile.yearLabel] : []
  );

  const [relationship, setRelationship] = useState<string[]>(
    profile.lookingFor || []
  );

  const [lifestyle, setLifestyle] = useState<string[]>(
    profile.lifestyle || []
  );

  const [loveLanguages, setLoveLanguages] = useState<string[]>(
    profile.loveLanguages || []
  );

  const [gender, setGender] = useState<string | null>(
    profile.gender || null
  );

  const [attractedTo, setAttractedTo] = useState<string[]>(
    profile.attractedTo || []
  );

  const [primarySocial, setPrimarySocial] = useState<string | null>(
    profile.primarySocial || 'Instagram'
  );

  const toggleMulti = (
    value: string,
    list: string[],
    setter: (value: string[]) => void
  ) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  // const handleSave = () => {
  //   console.log('save profile changes');
  // };
  // start of database stuff (NOT TESTED MAY BE BROKEN!!!)
  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user logged in");
        return;
      }

      const { error } = await supabase
        .from("user_profile")
        .update({
          first_name: name,
          age: Number(age),
          school_year: selectedYear[0] || null,
          bio: bio,
          pronouns: pronouns,
          major: major,
          favorite_club: club,
          favorite_spot: favoriteSpot,
          playlist: playlist,
          instagram: username,
          gender: gender,
          relationship_type: relationship,
          lifestyle: lifestyle,
          love_language: loveLanguages,
        })
        .eq("id", user.id);
      
      if (error) {
        console.error("Update failed:", error);
      }
      else {
        console.log("Profile updated!");
        navigation.replace("ViewProfile"); // go back to view profile screen
      }
    }
    catch (err) {
      console.error("Save error:", err);
    }
  };
  // end of database stuff (NOT TESTED MAY BE BROKEN!!!)

  return (
    <PrettyBackground>
      <View style={styles.screen}>
        <EditProfileHeader
          onSave={handleSave}
          onExit={() => navigation.replace('ViewProfile')}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Text style={styles.pageTitle}>Edit Profile</Text>
          <View style={styles.titleUnderline} />

          <View style={styles.card}>
            <View style={styles.topRow}>
              <View style={styles.nameBlock}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Name"
                  placeholderTextColor="#A6A6A6"
                />
              </View>

              <View style={styles.ageBlock}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.input}
                  value={age}
                  onChangeText={setAge}
                  placeholder="Age"
                  placeholderTextColor="#A6A6A6"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.label}>First Impression</Text>
            <TextInput
              style={styles.largeInput}
              value={firstImpression}
              onChangeText={setFirstImpression}
              placeholder="Write something short..."
              placeholderTextColor="#A6A6A6"
              multiline
              textAlignVertical="top"
            />

            <Text style={styles.label}>Profile Photo</Text>
            <View style={styles.photoRow}>
              <View style={styles.mainPhotoCircle}>
                <Text style={styles.photoIcon}>📷</Text>
              </View>

              <View style={styles.photoButtonColumn}>
                <TouchableOpacity style={styles.blueButton}>
                  <Text style={styles.blueButtonText}>Add Picture</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.blueButton}>
                  <Text style={styles.blueButtonText}>Edit Picture</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.label}>Class Year</Text>
            <View style={styles.optionGrid}>
              {YEAR_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionRow}
                  onPress={() => toggleMulti(option, selectedYear, setSelectedYear)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.square,
                      selectedYear.includes(option) && styles.squareSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <View style={styles.card}>
            <Text style={styles.label}>Pronouns</Text>
            <TextInput
              style={styles.input}
              value={pronouns}
              onChangeText={setPronouns}
              placeholder="he/him/his"
              placeholderTextColor="#A6A6A6"
            />

            <Text style={styles.label}>Major</Text>
            <TextInput
              style={styles.input}
              value={major}
              onChangeText={setMajor}
              placeholder="Computer Science"
              placeholderTextColor="#A6A6A6"
            />

            <Text style={styles.label}>My Photos</Text>
            <View style={styles.photosPreview}>
              <Text style={styles.photoIconLarge}>📷</Text>
            </View>

            <View style={styles.dotRow}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>

          <TouchableOpacity
            style={styles.tanButton}
            onPress={() => navigation.navigate('EditPhotos')}
          >
            <Text style={styles.tanButtonText}>Edit My Photos</Text>
          </TouchableOpacity>

            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={styles.bioInput}
              value={bio}
              onChangeText={setBio}
              placeholder="Write a bit about yourself..."
              placeholderTextColor="#A6A6A6"
              multiline
              textAlignVertical="top"
            />

            <Text style={styles.label}>Type of Relationship You Looking For?</Text>
            <View style={styles.optionGrid}>
              {RELATIONSHIP_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionRow}
                  onPress={() => toggleMulti(option, relationship, setRelationship)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.square,
                      relationship.includes(option) && styles.squareSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Typical Lifestyle</Text>
            <View style={styles.optionGrid}>
              {LIFESTYLE_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionRow}
                  onPress={() => toggleMulti(option, lifestyle, setLifestyle)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.squareTan,
                      lifestyle.includes(option) && styles.squareTanSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Love Languages</Text>
            <View style={styles.optionGrid}>
              {LOVE_LANGUAGE_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionRow}
                  onPress={() => toggleMulti(option, loveLanguages, setLoveLanguages)}
                  activeOpacity={0.8}
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

            <Text style={styles.label}>Favorite Club/Extracurricular</Text>
            <TextInput
              style={styles.input}
              value={club}
              onChangeText={setClub}
              placeholder="WXTJ Student Radio"
              placeholderTextColor="#A6A6A6"
            />

            <Text style={styles.label}>Favorite Cville Spot</Text>
            <TextInput
              style={styles.input}
              value={favoriteSpot}
              onChangeText={setFavoriteSpot}
              placeholder="Downtown Mall"
              placeholderTextColor="#A6A6A6"
            />

            <Text style={styles.label}>Link to Favorite Playlist</Text>
            <TextInput
              style={styles.input}
              value={playlist}
              onChangeText={setPlaylist}
              placeholder="link"
              placeholderTextColor="#A6A6A6"
            />

            <Text style={styles.label}>Primary Social</Text>
            <View style={styles.optionGrid}>
              {SOCIAL_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionRow}
                  onPress={() => setPrimarySocial(option)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.circle,
                      primarySocial === option && styles.circleSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Social Media Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              placeholderTextColor="#A6A6A6"
            />
          </View>

          <View style={styles.sectionDivider} />

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Personal Details</Text>

            <Text style={styles.label}>Gender</Text>
            <View style={styles.optionGrid}>
              {GENDER_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionRow}
                  onPress={() => setGender(option)}
                  activeOpacity={0.8}
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

            <Text style={styles.label}>Which Genders Are You Attracted To?</Text>
            <View style={styles.optionGrid}>
              {['Women', 'Men', 'Other'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionRow}
                  onPress={() => toggleMulti(option, attractedTo, setAttractedTo)}
                  activeOpacity={0.8}
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
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </PrettyBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },

  pageTitle: {
    color: NAVY,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
    marginBottom: 10,
  },

  titleUnderline: {
    height: 2,
    backgroundColor: '#2A5AA6',
    marginBottom: 12,
    width: '100%',
  },

  card: {
    backgroundColor: CARD_BG,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  sectionDivider: {
    height: 2,
    backgroundColor: '#2A5AA6',
    marginVertical: 18,
    width: '100%',
  },

  sectionTitle: {
    color: NAVY,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },

  nameBlock: {
    flex: 1,
  },

  ageBlock: {
    width: 100,
  },

  label: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },

  input: {
    backgroundColor: INPUT_BG,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333333',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  largeInput: {
    backgroundColor: INPUT_BG,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333333',
    minHeight: 110,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  bioInput: {
    backgroundColor: INPUT_BG,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333333',
    minHeight: 150,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },

  mainPhotoCircle: {
    width: 158,
    height: 158,
    borderRadius: 79,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },

  photoIcon: {
    fontSize: 34,
  },

  photoButtonColumn: {
    flex: 1,
    justifyContent: 'center',
  },

  blueButton: {
    backgroundColor: LIGHT_BLUE,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  blueButtonText: {
    color: NAVY,
    fontWeight: '700',
    fontSize: 16,
  },

  photosPreview: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: LIGHT_BLUE,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },

  photoIconLarge: {
    fontSize: 40,
  },

  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 14,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C9C9C9',
    marginHorizontal: 5,
  },

  dotActive: {
    backgroundColor: '#9E9E9E',
  },

  tanButton: {
    backgroundColor: TAN,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },

  tanButtonText: {
    color: NAVY,
    fontWeight: '800',
    fontSize: 16,
  },

  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 2,
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
    marginBottom: 12,
  },

  optionText: {
    fontSize: 14,
    color: '#111111',
  },

  square: {
    width: 22,
    height: 22,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: NAVY,
    backgroundColor: '#BFDDF5',
    marginRight: 8,
  },

  squareSelected: {
    backgroundColor: NAVY,
  },

  squareTan: {
    width: 22,
    height: 22,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: '#6F5325',
    backgroundColor: '#F1C173',
    marginRight: 8,
  },

  squareTanSelected: {
    backgroundColor: '#A77422',
  },

  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: NAVY,
    backgroundColor: '#BFDDF5',
    marginRight: 8,
  },

  circleSelected: {
    backgroundColor: NAVY,
  },

  bottomSpacer: {
    height: 20,
  },
});