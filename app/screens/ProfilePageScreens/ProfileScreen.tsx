import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { supabase } from "@/services/supabase";
import Footer from "../../components/footer";
import ProfileHeader from "../../components/profilepage/ProfileHeader";
import ProfileInfoBlock from "../../components/profilepage/ProfileInfoBlock";
import ProfileMenuOverlay from "../../components/profilepage/ProfileMenuOverlay";
import ProfilePhotoCard from "../../components/profilepage/ProfilePhotoCard";
import ProfileTagSection from "../../components/profilepage/ProfileTagSection";
import InfoBubble from "../../components/Swipepage/InfoBubble";


// Year Images
import firstYearImg from "../../../assets/images/account_year_images/1st_year_rotunda.png";
import secondYearImg from "../../../assets/images/account_year_images/2nd_year_rotunda.png";
import thirdYearImg from "../../../assets/images/account_year_images/3rd_year_rotunda.png";
import fourthYearImg from "../../../assets/images/account_year_images/4th_year_rotunda.png";
import gradImg from "../../../assets/images/account_year_images/Grad_rotunda.png";
import hooImg from "../../../assets/images/account_year_images/Hoo_rotunda.png";

type RootStackParamList = {
  BaseScreen: undefined;
  EditProfile: undefined;
};

const NAVY = "#002562";
const PAGE_BG = "#EAF1F8";
const CARD_BG = "#FFFFFF";
const TAN = "#F2CF9D";
const HEADER_H = 110;

function getYearImage(yearLabel?: string) {
  if (!yearLabel) return hooImg;

  const normalized = yearLabel.toLowerCase().trim();

  if (normalized.includes("1st")) return firstYearImg;
  if (normalized.includes("2nd")) return secondYearImg;
  if (normalized.includes("3rd")) return thirdYearImg;
  if (normalized.includes("4th")) return fourthYearImg;
  if (normalized.includes("grad")) return gradImg;
  if (normalized.includes("hoo")) return hooImg;

  return hooImg;
}

export default function ProfileScreen() {
  // const profile = MOCK_CURRENT_USER; // get rid of later
  const [profile, setProfile] = useState<any>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<any>();

  const closeMenu = () => setMenuVisible(false);
  
  // start of database stuff (NOT TESTED MAY BE BROKEN!!!)
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user logged in");
        return;
      }

      const { data, error } = await supabase
        .from("user_profile")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching profile:", error);
      } 
      if (!data) {
        console.log("No profile found -> redirect to CreateProfile");
        navigation.replace("CreateAccount");
        return;
      }

      else {
        setProfile({
          name: `${data.first_name ?? ""}`,
          age: data.age ?? 0,
          yearLabel: data.school_year,
          pronouns: data.pronouns,
          major: data.major,
          about: data.bio,
          favoriteClub: data.favorite_club,
          favoriteSpot: data.favorite_spot,
          playlist: data.playlist,
          instagram: data.instagram,
          lifestyle: data.lifestyle || [],
          lookingFor: data.relationship_type || [],
          loveLanguages: data.love_language || [],
          gender: data.gender,
          photoUri: null, // add later
        });
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <Text>Loading...</Text>;
  }
  // end of database stuff (NOT TESTED MAY BE BROKEN!!!)

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={PAGE_BG} />

      <View style={styles.headerFixed}>
        <ProfileHeader onMenuPress={() => setMenuVisible(true)} />
      </View>

      <View style={styles.viewport}>
        <ScrollView
          scrollEnabled={!menuVisible}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Text style={styles.pageTitle}>My Profile</Text>
          <View style={styles.titleUnderline} />

          <InfoBubble
            profile={profile}
            expandEnabled={false}
            showHandle={false}
          />

          <View style={styles.bottomCard}>
            {/* MAJOR SECTION */}
            <View style={styles.majorRow}>
              <Image
                source={getYearImage(profile.yearLabel)}
                style={styles.yearBadge}
              />

              <View style={styles.rightSide}>
                {!!profile.pronouns && (
                  <View style={styles.pronounPill}>
                    <Text style={styles.pronounText}>
                      {profile.pronouns}
                    </Text>
                  </View>
                )}

                <View style={styles.majorTextWrap}>
                  <Text style={styles.majorLabel}>Major:</Text>
                  <Text style={styles.majorValue}>
                    {profile.major}
                  </Text>
                </View>
              </View>
            </View>

            <ProfilePhotoCard photoUri={profile.photoUri} />

            {!!profile.bio && (
              <>
                <Text style={styles.sectionTitle}>About me:</Text>
                <Text style={styles.aboutText}>{profile.bio}</Text>
              </>
            )}

            <ProfileTagSection title="Looking For" items={profile.lookingFor} />
            <ProfileTagSection title="Lifestyle" items={profile.lifestyle} />
            <ProfileTagSection
              title="Love Languages"
              items={profile.loveLanguages}
            />

            {/* ONLY spacing added here */}
            <View style={styles.firstBlockSpacing}>
              <ProfileInfoBlock
                label="When I’m not in class, I’m..."
                value={profile.favoriteClub}
                variant="tan"
              />
            </View>

            <ProfileInfoBlock
              label="My Favorite Cville Spot is..."
              value={profile.favoriteSpot}
              variant="blue"
            />
            <ProfileInfoBlock
              label="My Favorite Playlist:"
              value={profile.playlist}
              variant="tan"
            />
            <ProfileInfoBlock
              label="Instagram:"
              value={profile.instagram}
              variant="blue"
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footerFixed}>
        <Footer />
      </View>

      <ProfileMenuOverlay
        visible={menuVisible}
        onClose={closeMenu}
        onEditProfile={() => {
          closeMenu();
          navigation.navigate('EditProfile');
        }}
        onEditDoor={() => {
          closeMenu();
          console.log("Edit Door");
        }}
        onReportIssue={() => {
          closeMenu();
          console.log("Report An Issue");
        }}
        onLogout={() => {
          closeMenu();
          navigation.navigate("BaseScreen");
        }}
        onDeleteProfile={() => {
          closeMenu();
          console.log("Delete Profile");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },

  headerFixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  viewport: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: HEADER_H + 10,
    paddingBottom: 110,
  },

  pageTitle: {
    color: NAVY,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    marginBottom: 10,
  },

  titleUnderline: {
    height: 2,
    backgroundColor: "#2A5AA6",
    marginBottom: 12,
    width: "100%",
  },

  bottomCard: {
    backgroundColor: CARD_BG,
    borderRadius: 24,
    marginTop: 14,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  majorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  yearBadge: {
    width: 96,
    height: 96,
    resizeMode: "contain",
    marginRight: 18,
    transform: [{ scale: 1.4 }],
  },

  rightSide: {
    flex: 1,
    justifyContent: "center",
  },

  majorTextWrap: {
    marginTop: -5,
  },

  majorLabel: {
    color: NAVY,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "800",
    marginBottom: 6,
  },

  majorValue: {
    color: NAVY,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
  },

  pronounPill: {
    alignSelf: "flex-end",
    backgroundColor: TAN,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 6,
    marginTop: -4,
  },

  pronounText: {
    color: NAVY,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    fontStyle: "italic",
  },

  sectionTitle: {
    color: NAVY,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "800",
    marginBottom: 10,
  },

  aboutText: {
    color: "#1C1C1C",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },

  firstBlockSpacing: {
    marginTop: 15,
  },

  footerFixed: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});