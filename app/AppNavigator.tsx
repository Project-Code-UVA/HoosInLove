// app/AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BaseScreen from './screens/BaseScreen';
import LoginScreen from './screens/LoginScreen';

// NEW SCREENS — now inside CreateAnAccount Screens
import DatingPreferences1 from './screens/CreateAnAccountScreens/DatingPreferences1';
import DatingPreferences2 from './screens/CreateAnAccountScreens/DatingPreferences2';
import DatingPreferences3 from './screens/CreateAnAccountScreens/DatingPreferences3';
import FinishProfile from './screens/CreateAnAccountScreens/FinishProfile';

export type RootStackParamList = {
  BaseScreen: undefined;
  LoginScreen: undefined;

  DatingPreferences1: undefined;
  DatingPreferences2: undefined;
  DatingPreferences3: undefined;
  FinishProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BaseScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BaseScreen" component={BaseScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      {/* CREATE ACCOUNT FLOW */}
      <Stack.Screen name="DatingPreferences1" component={DatingPreferences1} />
      <Stack.Screen name="DatingPreferences2" component={DatingPreferences2} />
      <Stack.Screen name="DatingPreferences3" component={DatingPreferences3} />
      <Stack.Screen name="FinishProfile" component={FinishProfile} />

    </Stack.Navigator>
  );
}
