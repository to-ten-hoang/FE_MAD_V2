import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import JobCard from '../../components/Schedule/JobCard';

const scheduleData = [
  {
    date: '27 September 2025',
    entries: [
      {
        title: 'Name Job 1',
        hours: '08:00:00 hrs',
        clock: '09:00 AM — 05:00 PM',
      },
      {
        title: 'Total Hours',
        hours: '08:00:00 hrs',
        clock: '09:00 AM — 05:00 PM',
      },
    ],
  },
  {
    date: '25 September 2024',
    entries: [
      {
        title: 'Total Hours',
        hours: '08:10:00 hrs',
        clock: '09:00 AM — 05:10 PM',
      },
    ],
  },
];

const ScheduleScreen = () => {
  const navigation = useNavigation();

  const handlePressJob = () => {
    // 👇 Điều hướng sang màn chi tiết công việc sau này
    navigation.navigate('JobDetail' as never);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTime}>08:15</Text>
            <Text style={styles.headerTitle}>Đi làm thôi!</Text>
            <Text style={styles.headerSubtitle}>Đừng bỏ lỡ lịch của bạn.</Text>
          </View>
          <Image
            source={require('../../assets/images/clock_wings.png')} // Bạn cần đặt ảnh đúng tên
            style={styles.headerImage}
          />
        </View>
      </View>

      {/* Nội dung */}
      <ScrollView style={styles.container}>
        {scheduleData.map((day, index) => (
          <View key={index} style={styles.dayBlock}>
            <Text style={styles.date}>{day.date}</Text>

            {day.entries.map((entry, idx) => (
              <JobCard
                key={idx}
                title={entry.title}
                hours={entry.hours}
                clock={entry.clock}
                onPress={handlePressJob}
              />
            ))}
          </View>
        ))}
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fd',
    padding: 15,
    borderRadius: 12,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  entryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  hours: {
    fontSize: 13,
    color: '#444',
  },
  clockLabel: {
    fontSize: 12,
    color: '#999',
  },
  clockTime: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
  },
});
