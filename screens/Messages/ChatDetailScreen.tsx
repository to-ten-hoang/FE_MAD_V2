import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image
} from 'react-native';
import ChatBubble from '../../components/Chat/ChatBubble';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const ChatDetailScreen = () => {
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Image source={require('../../assets/images/google.png')} style={styles.logo} />

          <View style={styles.titleContainer}>
            <Text style={styles.name}>Google inc</Text>
            <Text style={styles.status}>● Online</Text>
          </View>

          <View style={styles.actions}>
            <Ionicons name="call-outline" size={20} color="#f39c12" style={{ marginRight: 12 }} />
            <Ionicons name="videocam-outline" size={20} color="#f39c12" />
          </View>
        </View>

        {/* Tin nhắn */}
        <ScrollView contentContainerStyle={styles.messages}>
          <ChatBubble message="Hello sir, Good Morning" time="09:30 am" isSender={false} />
          <ChatBubble message="Morning. Can I help you?" time="09:31 am" isSender={true} />
          <ChatBubble message="Please send your CV/Resume here" time="09:35 am" isSender={false} />
          <View style={styles.attachment}>
            <View style={styles.attachmentLeft}>
              <Image source={require('../../assets/images/icon_pdf.png')} style={styles.pdfIcon} />
            </View>
            <View style={styles.attachmentRight}>
              <Text style={styles.pdfText}>Jamet - CV - UI/UX Designer.PDF</Text>
              <Text style={styles.pdfSub}>867 Kb PDF</Text>
            </View>
          </View>
        </ScrollView>

        {/* Thanh nhập tin nhắn */}
        <View style={styles.inputBar}>
          <Ionicons name="attach" size={20} color="#555" />
          <TextInput
            placeholder="Viết tin nhắn của bạn"
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />
          <TouchableOpacity>
            <Ionicons name="send" size={24} color="#fff" style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1 },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    backButton: {
      marginRight: 10,
    },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    titleContainer: { flex: 1 },
    name: { fontWeight: 'bold', fontSize: 14 },
    status: { fontSize: 12, color: '#4cd137' },
    actions: { flexDirection: 'row' },
    messages: { padding: 15 },
    inputBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      backgroundColor: '#fff',
    },
    input: { flex: 1, marginHorizontal: 10, fontSize: 14 },
    sendIcon: {
      backgroundColor: '#12005e',
      padding: 8,
      borderRadius: 999,
    },
    attachment: {
      flexDirection: 'row',
      backgroundColor: '#341f97',
      borderRadius: 12,
      padding: 12,
      marginTop: 12,
      alignItems: 'center',
    },
    attachmentLeft: { marginRight: 10 },
    attachmentRight: {},
    pdfIcon: { width: 32, height: 32 },
    pdfText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    pdfSub: { color: '#fff', fontSize: 12, marginTop: 4 },
  });
  