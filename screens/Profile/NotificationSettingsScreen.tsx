import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NotificationSettingsScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    jobMatch: true,
    successApply: true,
    recruiterMessage: true,
    chat: true,
    promo: true
  });

  const toggleSwitch = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.heading}>Cài đặt thông báo</Text>

        {[
          ['jobMatch', 'Nhận thông báo khi có công việc phù hợp'],
          ['successApply', 'Nhận thông báo khi nộp đơn thành công'],
          ['recruiterMessage', 'Thông báo từ nhà tuyển dụng'],
          ['chat', 'Tin nhắn'],
          ['promo', 'Giới thiệu dịch vụ'],
        ].map(([key, label]) => (
          <View style={styles.row} key={key}>
            <Text>{label}</Text>
            <Switch value={settings[key as keyof typeof settings]} onValueChange={() => toggleSwitch(key as keyof typeof settings)} />
          </View>
        ))}

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>LƯU</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NotificationSettingsScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontWeight: 'bold', fontSize: 16, marginVertical: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
  },
  saveBtn: {
    backgroundColor: '#1e0eff',
    padding: 14,
    borderRadius: 12,
    marginTop: 30
  },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
