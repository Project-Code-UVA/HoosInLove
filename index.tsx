import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './app/AppNavigator';
import { OnboardingProvider } from './app/context/OnboardingContext'; // Import your provider

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OnboardingProvider> {/* ✅ Wrap the navigator here */}
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </OnboardingProvider>
    </GestureHandlerRootView>
  );
}

export default App;
registerRootComponent(App);