// ChatBubble.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  message: string;
  time: string;
  isSender: boolean;
}

const ChatBubble = ({ message, time, isSender }: Props) => {
  return (
    <View style={[styles.wrapper, isSender ? styles.right : styles.left]}>
      <View style={[styles.bubble, isSender ? styles.sender : styles.receiver]}>
        <Text style={[styles.message, isSender && { color: '#fff' }]}>{message}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  bubble: {
    borderRadius: 14,
    padding: 10,
    maxWidth: '80%',
  },
  sender: {
    backgroundColor: '#12005e',
  },
  receiver: {
    backgroundColor: '#f1f1f1',
  },
  message: {
    fontSize: 14,
  },
  time: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});

export default ChatBubble;