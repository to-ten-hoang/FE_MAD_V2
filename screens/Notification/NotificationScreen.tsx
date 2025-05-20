import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useUserStore } from 'stores/userStore';
import { getNotifications, markNotificationAsRead } from 'api/authApi';

// Định nghĩa interface cho Notification
interface Notification {
  id: number;
  title: string;
  message: string;
  status: boolean;
  createdAt: string;
  jobPostingId: number;
}

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { userId, isAuthenticated, initialize } = useUserStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Hàm fetch dữ liệu thông báo
  const fetchNotifications = useCallback(async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    }
    setError(null);
    try {
      const data = await getNotifications(userId!);
      setNotifications(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notifications');
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      }
      if (initialLoading) {
        setInitialLoading(false);
      }
    }
  }, [userId, initialLoading]);

  // Khởi tạo dữ liệu lần đầu
  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchNotifications();
    } else {
      initialize().then(() => {
        if (isAuthenticated && userId) fetchNotifications();
      });
    }
  }, [isAuthenticated, userId, initialize, fetchNotifications]);

  // Làm mới dữ liệu trong nền khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated && userId) {
        // Làm mới trong nền, không hiển thị loading
        fetchNotifications(false);
      }
    }, [isAuthenticated, userId, fetchNotifications])
  );

  const markAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);
      const updatedNotifications = notifications.map((notification) =>
        notification.id === id ? { ...notification, status: true } : notification
      );
      setNotifications(updatedNotifications);
    } catch (err: any) {
      setError(err.message || 'Failed to mark notification as read');
    }
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity style={[styles.notificationItem, !item.status && styles.unread]} onPress={() => markAsRead(item.id)}>
      <View style={styles.notificationContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString('vi-VN')}</Text>
      </View>
      {!item.status && <Ionicons name="ellipse" size={10} color="#1e0eff" style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  if (initialLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1e0eff" />
      </SafeAreaView>
    );
  }

  if (error && notifications.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.heading}>Thông báo</Text>

        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>Không có thông báo nào</Text>}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchNotifications(true)}
              colors={['#1e0eff']}
            />
          }
        />
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  heading: { fontWeight: 'bold', fontSize: 18, marginVertical: 20 },
  list: { paddingBottom: 20 },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unread: {
    backgroundColor: '#f0f5ff', // Màu nền nhẹ cho thông báo chưa đọc
  },
  notificationContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  unreadIndicator: {
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  errorContainer: {
    padding: 10,
    backgroundColor: '#ffe6e6',
    borderRadius: 5,
    marginTop: 10,
  },
  errorText: {
    color: '#e15a4f',
    textAlign: 'center',
  },
});