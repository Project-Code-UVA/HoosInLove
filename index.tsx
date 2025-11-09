import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo'; // ✅ this line is key
import React from 'react';
import AppNavigator from './app/AppNavigator';

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;

// ✅ this tells Expo / React Native to load your app correctly
registerRootComponent(App);
