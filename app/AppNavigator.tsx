import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BaseScreen from './screens/BaseScreen';
import LoginScreen from './screens/LoginScreen';
import AddPhotosScreen from './screens/CreateAnAccountScreens/AddPhotoScreen';
import AppPoliciesNoticeScreen from './screens/CreateAnAccountScreens/AppPoliciesNoticeScreen';
import CreateAccountScreen from './screens/CreateAnAccountScreens/CreateAccountScreen';
import DatingPreferences1 from './screens/CreateAnAccountScreens/DatingPreferences1';
import DatingPreferences2 from './screens/CreateAnAccountScreens/DatingPreferences2';
import DatingPreferences3 from './screens/CreateAnAccountScreens/DatingPreferences3';
import FinishProfile from './screens/CreateAnAccountScreens/FinishProfile';
import VerifyEmailScreen from './screens/CreateAnAccountScreens/VerifyEmailScreen';
import Chats from './screens/ChatScreens/Chats';
import InsideChat from './screens/ChatScreens/InsideChat';
import SwipeHome from './screens/SwipePageScreens/SwipeHome';
import ProfileScreen from './screens/ProfilePageScreens/ProfileScreen';
import EditProfileScreen from './screens/ProfilePageScreens/EditProfileScreen';
import EditPhotosScreen from './screens/ProfilePageScreens/EditPhotosScreen';

export type RootStackParamList = {
  SwipeHome: undefined;
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
  ViewProfile: { profile?: any | null };
  EditProfile: undefined;
  EditPhotos: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen" // Opens to login/signup options
      screenOptions={{
        headerShown: false,
        // Standard OS transitions
      }}
    >
      <Stack.Screen name="BaseScreen" component={BaseScreen} />
      <Stack.Screen name="SwipeHome" component={SwipeHome} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ViewProfile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="EditPhotos" component={EditPhotosScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="AppPoliciesNotice" component={AppPoliciesNoticeScreen} />
      <Stack.Screen name="AddPhotos" component={AddPhotosScreen} />
      <Stack.Screen name="DatingPreferences1" component={DatingPreferences1} />
      <Stack.Screen name="DatingPreferences2" component={DatingPreferences2} />
      <Stack.Screen name="DatingPreferences3" component={DatingPreferences3} />
      <Stack.Screen name="FinishProfile" component={FinishProfile} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="InsideChat" component={InsideChat} />
    </Stack.Navigator>
  );
}