// MessageListScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import MessageCard from '../../components/Chat/MessageCard';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const messages = [
  {
    id: '1',
    name: 'Google inc',
    preview: 'Oh yes, please send your CV...',
    time: '5m ago',
    unreadCount: 2,
    avatar: require('../../assets/images/google.png'),
  },
  {
    id: '2',
    name: 'Giorgio Chiellini',
    preview: 'Hello sir, Good Morning',
    time: '30m ago',
    avatar: require('../../assets/images/avatar.jpg'),
  },
];

const MessageListScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Tin nhắn</Text>
        {messages.map(msg => (
          <MessageCard
            key={msg.id}
            name={msg.name}
            preview={msg.preview}
            time={msg.time}
            unreadCount={msg.unreadCount}
            avatar={msg.avatar}
            onPress={() => navigation.navigate('ChatDetail' as never)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 10,
  },
});

export default MessageListScreen;