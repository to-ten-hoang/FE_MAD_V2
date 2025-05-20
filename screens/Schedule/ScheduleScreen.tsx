import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import JobCard from '../../components/Schedule/JobCard';
import { useUserStore } from '../../stores/userStore';
import { Image } from 'react-native';

const ScheduleScreen = () => {
  const navigation = useNavigation();
  const { schedule, loading, error, fetchSchedule } = useUserStore();
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [scheduleError, setScheduleError] = React.useState<string | null>(null);

  // Hàm fetch dữ liệu lịch
  const fetchScheduleData = useCallback(async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    }
    setScheduleError(null);
    try {
      await fetchSchedule();
    } catch (err: any) {
      setScheduleError(err.message || 'Failed to fetch schedule');
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      }
      if (initialLoading) {
        setInitialLoading(false);
      }
    }
  }, [fetchSchedule, initialLoading]);

  // Khởi tạo dữ liệu lần đầu
  useEffect(() => {
    fetchScheduleData();
  }, [fetchScheduleData]);

  // Làm mới dữ liệu trong nền khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      fetchScheduleData(false);
    }, [fetchScheduleData])
  );

  const handlePressJob = (jobPostingId: number, startTime: string, endTime: string) => {
    navigation.navigate('JobDetailSchedule' as never, { jobPostingId, startTime, endTime } as any);
  };

  // Nhóm lịch theo ngày
  const groupedSchedule = schedule.reduce((acc: any, entry: any) => {
    const date = new Date(entry.startTime).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({
      title: entry.name,
      hours: `${new Date(entry.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - ${new Date(entry.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`,
      clock: `${new Date(entry.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: true })} — ${new Date(entry.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: true })}`,
      jobPostingId: entry.jobPostingId,
      startTime: entry.startTime,
      endTime: entry.endTime,
    });
    return acc;
  }, {});

  const scheduleData = Object.keys(groupedSchedule).map((date) => ({
    date,
    entries: groupedSchedule[date],
  }));

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#6C47FF" />
      </SafeAreaView>
    );
  }

  if (scheduleError && schedule.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>{scheduleError}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTime}>18:41</Text>
            <Text style={styles.headerTitle}>Đi làm thôi!</Text>
            <Text style={styles.headerSubtitle}>Đừng bỏ lỡ lịch của bạn.</Text>
          </View>
          <Image
            source={require('../../assets/images/clock_wings.png')}
            style={styles.headerImage}
          />
        </View>
      </View>

      {/* Nội dung */}
      <FlatList
        data={scheduleData}
        renderItem={({ item }) => (
          <View style={styles.dayBlock}>
            <Text style={styles.date}>{item.date}</Text>
            {item.entries.map((entry: any, idx: number) => (
              <JobCard
                key={idx}
                title={entry.title}
                hours={entry.hours}
                clock={entry.clock}
                onPress={() => handlePressJob(entry.jobPostingId, entry.startTime, entry.endTime)}
              />
            ))}
          </View>
        )}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.container}
        ListEmptyComponent={<Text style={styles.noSchedule}>Không có lịch làm việc nào.</Text>}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchScheduleData(true)}
            colors={['#6C47FF']}
          />
        }
      />
      {scheduleError && schedule.length > 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{scheduleError}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    backgroundColor: '#6C47FF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTime: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  headerImage: {
    width: 80,
    height: 80,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  container: {
    padding: 20,
  },
  dayBlock: {
    marginBottom: 25,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
    marginBottom: 10,
  },
  noSchedule: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  errorContainer: {
    padding: 10,
    backgroundColor: '#ffe6e6',
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
  },
  errorText: {
    textAlign: 'center',
    color: '#e15a4f',
  },
});