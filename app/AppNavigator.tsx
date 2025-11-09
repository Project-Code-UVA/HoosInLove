// app/AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BaseScreen from './screens/BaseScreen';
import LoginScreen from './screens/LoginScreen';

export type RootStackParamList = {
  BaseScreen: undefined;
  LoginScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="BaseScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BaseScreen" component={BaseScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}
