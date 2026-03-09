// app/AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useFonts } from 'expo-font';

import BaseScreen from './screens/BaseScreen';
import LoginScreen from './screens/LoginScreen';

// NEW SCREENS — now inside CreateAnAccount Screens
import AddPhotosScreen from './screens/CreateAnAccountScreens/AddPhotoScreen';
import AppPoliciesNoticeScreen from './screens/CreateAnAccountScreens/AppPoliciesNoticeScreen';
import CreateAccountScreen from './screens/CreateAnAccountScreens/CreateAccountScreen';
import DatingPreferences1 from './screens/CreateAnAccountScreens/DatingPreferences1';
import DatingPreferences2 from './screens/CreateAnAccountScreens/DatingPreferences2';
import DatingPreferences3 from './screens/CreateAnAccountScreens/DatingPreferences3';
import FinishProfile from './screens/CreateAnAccountScreens/FinishProfile';
import VerifyEmailScreen from './screens/CreateAnAccountScreens/VerifyEmailScreen';

// CHAT SCREENS
import Chats from './screens/ChatScreens/Chats';
import InsideChat from './screens/ChatScreens/InsideChat';

// SWIPE PAGE SCREENS
import SwipeHome from './screens/SwipePageScreens/SwipeHome';

import ProfileScreen from "./screens/ProfilePageScreens/ProfileScreen";

export type RootStackParamList = {
  StartScreen: undefined;
  BaseScreen: undefined;
  LoginScreen: undefined;
  CreateAccount: undefined;
  VerifyEmail: { email: string };
  AppPoliciesNotice: undefined;
  AddPhotos: undefined;
  DatingPreferences1: undefined;
  DatingPreferences2: undefined;
  DatingPreferences3: undefined;
  FinishProfile: undefined;

  Chats: undefined;
  InsideChat: { name: string };

  ViewProfile: { profile: any | null };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  // ✅ load fonts ONCE here
  const [fontsLoaded] = useFonts({
    Gwendolyn: require('../assets/fonts/Gwendolyn-Regular.ttf'),
    GwendolynBold: require('../assets/fonts/Gwendolyn-Bold.ttf'),
  });

  // ✅ don’t render until fonts are ready
  if (!fontsLoaded) return null;

  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="StartScreen" component={SwipeHome} />
      <Stack.Screen name="BaseScreen" component={BaseScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      {/* PROFILE SCREEN */}
      <Stack.Screen name="ViewProfile" component={ProfileScreen} />

      {/* CREATE ACCOUNT FLOW */}
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmailScreen}
        options={{
          presentation: 'modal',
        }}
      />

      {/* APP POLICIES & ADD PHOTOS */}
      <Stack.Screen name="AppPoliciesNotice" component={AppPoliciesNoticeScreen} />
      <Stack.Screen name="AddPhotos" component={AddPhotosScreen} />

      {/* DATING PREFERENCES & FINISH PROFILE */}
      <Stack.Screen name="DatingPreferences1" component={DatingPreferences1} />
      <Stack.Screen name="DatingPreferences2" component={DatingPreferences2} />
      <Stack.Screen name="DatingPreferences3" component={DatingPreferences3} />
      <Stack.Screen name="FinishProfile" component={FinishProfile} />

      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="InsideChat" component={InsideChat} />

      {/* <Stack.Screen name="ViewProfile" component={ViewProfile}/> */}
    </Stack.Navigator>
  );
}