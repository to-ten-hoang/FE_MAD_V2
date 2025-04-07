import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatInput = ({ onSend }: { onSend: (text: string) => void }) => {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <Ionicons name="attach" size={20} color="#888" />
      <TextInput
        placeholder="Viết tin nhắn của bạn"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={() => {
          if (text.trim()) {
            onSend(text);
            setText('');
          }
        }}
        style={styles.sendBtn}
      >
        <Ionicons name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#f1f2f6',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  sendBtn: {
    backgroundColor: '#341f97',
    padding: 10,
    borderRadius: 20
  },
});
