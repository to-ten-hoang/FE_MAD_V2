import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { useUserStore } from './stores/userStore';

export default function App() {
  const initialize = useUserStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}