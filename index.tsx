import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo'; // ✅ this line is key
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from './app/AppNavigator';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

// ✅ this tells Expo / React Native to load your app correctly
registerRootComponent(App);
