import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NotificationItem = {
  id: string;
  title: string;
  content: string;
  logo: any;
  buttonText: string;
  time: string;
  color: string;
  read: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Đã gửi đơn ứng tuyển',
    content:
      'Đơn ứng tuyển của bạn vào Google Inc. đã được chuyển đến công ty để xem xét.',
    logo: require('../../assets/images/google.png'),
    buttonText: 'Chi tiết đơn ứng tuyển',
    time: '25 phút trước',
    color: '#f1efff',
    read: false,
  },
  {
    id: '2',
    title: 'Thông báo việc làm của bạn',
    content:
      'Brandon, có hơn 10 công việc mới cho vị trí UI/UX Designer tại California, USA.',
    logo: require('../../assets/images/dribbble.png'),
    buttonText: 'Xem việc mới',
    time: '1 giờ trước',
    color: '#fff0f5',
    read: false,
  },
  {
    id: '3',
    title: 'Twitter Inc.',
    content:
      'đang tìm kiếm một Nhà thiết kế UI/UX. Xem ngay công việc này và 9 gợi ý việc làm khác.',
    logo: require('../../assets/images/twitter.png'),
    buttonText: 'Xem công việc',
    time: '6 giờ trước',
    color: '#e8f6ff',
    read: true,
  },
  {
    id: '4',
    title: 'Facebook',
    content:
      'Check out 5 jobs similar to the one you saw recently: UI/UX Designer on Facebook',
    logo: require('../../assets/images/facebook.png'),
    buttonText: 'Xem công việc',
    time: '1 ngày trước',
    color: '#f0f2ff',
    read: true,
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Thông báo</Text>
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAll}>Đã đọc tất cả</Text>
          </TouchableOpacity>
        </View>

        {/* Notification cards */}
        {notifications.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card,
              { backgroundColor: item.read ? '#f8f8f8' : item.color },
            ]}
          >
            <Image source={item.logo} style={styles.logo} />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.cardTitle,
                  !item.read && { color: '#341f97' },
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.content}>{item.content}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{item.buttonText}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#fff' },
  container: {
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  markAll: {
    color: '#f39c12',
    fontSize: 13,
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'flex-start',
    position: 'relative',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop: 4,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 14,
  },
  content: {
    fontSize: 13,
    marginBottom: 10,
  },
  button: {
    borderColor: '#333',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  time: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    fontSize: 11,
    color: '#888',
  },
});
