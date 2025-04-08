// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '@screens/Search/SearchScreen';
import JobDetailSchedule from '@screens/Schedule/JobDetailSchedule';
import ChatDetailScreen from '@screens/Messages/ChatDetailScreen';

export type RootStackParamList = {
  Tabs: undefined;
  Search: undefined;
  JobDetailSchedule: undefined;
  ChatDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="JobDetailSchedule" component={JobDetailSchedule} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
