// ✅ Update AppNavigator.tsx with new Profile screens
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '@screens/Search/SearchScreen';
import JobDetailSchedule from '@screens/Schedule/JobDetailSchedule';
import ChatDetailScreen from '@screens/Messages/ChatDetailScreen';
import JobDetailScreen from '../screens/JobDetail/JobDetailScreen';
import ApplyJobScreen from '../screens/JobDetail/ApplyJobScreen';
import ApplySuccessScreen from '../screens/JobDetail/ApplySuccessScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import NotificationSettingsScreen from '../screens/Profile/NotificationSettingsScreen';

export type RootStackParamList = {
  Tabs: undefined;
  Search: undefined;
  JobDetailSchedule: undefined;
  ChatDetail: undefined;
  JobDetail: undefined;
  ApplyJob: undefined;
  ApplySuccess: undefined;
  Profile: undefined;
  EditProfile: undefined;
  NotificationSettings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="JobDetailSchedule" component={JobDetailSchedule} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} />
      <Stack.Screen name="ApplyJob" component={ApplyJobScreen} />
      <Stack.Screen name="ApplySuccess" component={ApplySuccessScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;