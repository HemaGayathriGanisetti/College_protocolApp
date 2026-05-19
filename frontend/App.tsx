 import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

 
import { AuthProvider } from './src/context/AuthContext';
 
import { SettingsProvider } from './src/context/SettingsContext';

import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen';
import { navigationRef } from "./src/navigation/RootNavigation";
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);  

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
      <SettingsProvider>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </SettingsProvider>
    </AuthProvider>
  );
}