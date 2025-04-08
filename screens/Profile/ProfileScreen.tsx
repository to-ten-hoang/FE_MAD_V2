import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LogoutModal from './LogoutModal';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.avatar} />
          <View>
            <Text style={styles.name}>Orlando Diggs</Text>
            <Text style={styles.location}>California, USA</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editText}>Chỉnh sửa thông tin cá nhân</Text>
        </TouchableOpacity>

        <View style={styles.menu}>
          <Item title="Cài đặt thông báo" onPress={() => navigation.navigate('NotificationSettings')} />
          <Item title="Đổi mật khẩu" />
          <Item title="Điều khoản dịch vụ" />
          <Item title="Chính sách lao động" />
          <Item title="Cài đặt bảo mật" />
          <Item title="Trợ giúp" />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => setShowLogout(true)}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        {showLogout && <LogoutModal onClose={() => setShowLogout(false)} />}
      </ScrollView>
    </SafeAreaView>
  );
};

const Item = ({ title, onPress }: { title: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.itemText}>{title}</Text>
    <Text style={{ fontSize: 18 }}>›</Text>
  </TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  location: { color: '#666' },
  editButton: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginVertical: 12
  },
  editText: { color: '#333' },
  menu: { marginVertical: 10 },
  item: {
    backgroundColor: '#f7f8fc',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemText: { fontSize: 16 },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center'
  },
  logoutText: {
    color: '#333',
    fontWeight: 'bold'
  }
});
