import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import JobCard from '../../components/Schedule/JobCard';
import { useUserStore } from '../../stores/userStore';

const ScheduleScreen = () => {
  const navigation = useNavigation();
  const { schedule, loading, error, fetchSchedule } = useUserStore();

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  const handlePressJob = (jobPostingId: number, startTime: string, endTime: string) => {
    navigation.navigate('JobDetailSchedule' as never, { jobPostingId, startTime, endTime } as any);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#6C47FF" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

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
      <ScrollView style={styles.container}>
        {scheduleData.length === 0 ? (
          <Text style={styles.noSchedule}>Không có lịch làm việc nào.</Text>
        ) : (
          scheduleData.map((day, index) => (
            <View key={index} style={styles.dayBlock}>
              <Text style={styles.date}>{day.date}</Text>
              {day.entries.map((entry: any, idx: number) => (
                <JobCard
                  key={idx}
                  title={entry.title}
                  hours={entry.hours}
                  clock={entry.clock}
                  onPress={() => handlePressJob(entry.jobPostingId, entry.startTime, entry.endTime)}
                />
              ))}
            </View>
          ))
        )}
      </ScrollView>
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
  errorText: {
    textAlign: 'center',
    color: '#e15a4f',
    marginTop: 20,
  },
});