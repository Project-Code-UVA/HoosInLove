import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useFonts } from 'expo-font';

import CreateAccountScreen from './screens/CreateAnAccountScreens/CreateAccountScreen';
import VerifyEmailScreen from './screens/CreateAnAccountScreens/VerifyEmailScreen';
import AppPoliciesNoticeScreen from './screens/CreateAnAccountScreens/AppPoliciesNoticeScreen';
import AddPhotosScreen from './screens/CreateAnAccountScreens/AddPhotoScreen';
import DatingPreferences1 from './screens/CreateAnAccountScreens/DatingPreferences1';
import DatingPreferences2 from './screens/CreateAnAccountScreens/DatingPreferences2';
import DatingPreferences3 from './screens/CreateAnAccountScreens/DatingPreferences3';
import FinishProfile from './screens/CreateAnAccountScreens/FinishProfile';
import SwipeHome from './screens/SwipePageScreens/SwipeHome';

export type RootStackParamList = {
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
  const [fontsLoaded] = useFonts({
    Gwendolyn: require('../assets/fonts/Gwendolyn-Regular.ttf'),
    GwendolynBold: require('../assets/fonts/Gwendolyn-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <Stack.Navigator
      initialRouteName="CreateAccount"
      screenOptions={{ 
        headerShown: false,
        animation: 'none' // ✅ Removes sliding animations for simple changes
      }}
    >
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="AppPoliciesNotice" component={AppPoliciesNoticeScreen} />
      <Stack.Screen name="AddPhotos" component={AddPhotosScreen} />
      <Stack.Screen name="DatingPreferences1" component={DatingPreferences1} />
      <Stack.Screen name="DatingPreferences2" component={DatingPreferences2} />
      <Stack.Screen name="DatingPreferences3" component={DatingPreferences3} />
      <Stack.Screen name="FinishProfile" component={FinishProfile} />
      <Stack.Screen name="BaseScreen" component={SwipeHome} />
    </Stack.Navigator>
  );
}