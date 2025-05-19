import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useJobStore } from '../../stores/jobStore';

type RouteParams = {
  jobPostingId: number;
  startTime: string;
  endTime: string;
};

const JobDetailSchedule = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { jobPostingId, startTime, endTime } = params as RouteParams;
  const { selectedJob, loading, error, fetchJobDetail } = useJobStore();

  useEffect(() => {
    fetchJobDetail(jobPostingId.toString());
  }, [jobPostingId, fetchJobDetail]);

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

  if (!selectedJob) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>No job data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Nền tím chứa tiêu đề + header */}
      <View style={styles.purpleHeader}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chi tiết công việc</Text>
        </View>

        <View style={styles.headerCardWrapper}>
          <View style={styles.headerCard}>
            <Text style={styles.headerTitleJob}>{selectedJob.title}</Text>
            <Text style={styles.headerSubtitle}>
              {selectedJob.recruiter}  ・  {selectedJob.location}
            </Text>
            <Text style={styles.headerClock}>
              {new Date(startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: true })} —{' '}
              {new Date(endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: true })}
            </Text>
          </View>
        </View>
      </View>

      {/* Nội dung chi tiết */}
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Mô tả công việc</Text>
        <Text style={styles.paragraph}>{selectedJob.description || 'Không có mô tả'}</Text>

        <Text style={styles.sectionTitle}>Yêu cầu công việc</Text>
        <View style={styles.list}>
          {selectedJob.requirement ? (
            selectedJob.requirement.split('. ').map((req: string, index: number) => (
              req && <Text key={index} style={styles.listItem}>• {req.trim()}.</Text>
            ))
          ) : (
            <Text style={styles.paragraph}>Không có yêu cầu công việc.</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Mức lương</Text>
        <Text style={styles.paragraph}>{selectedJob.salary || 'Không xác định'}</Text>

        <Text style={styles.sectionTitle}>Quyền lợi</Text>
        <Text style={styles.paragraph}>{selectedJob.benefit || 'Không có thông tin'}</Text>

        <Text style={styles.sectionTitle}>Địa điểm làm việc</Text>
        <Text style={styles.paragraph}>{selectedJob.location || 'Không xác định'}</Text>

        <Text style={styles.sectionTitle}>Số lượng vị trí</Text>
        <Text style={styles.paragraph}>{selectedJob.numberOfPositions || 0}</Text>

        <Text style={styles.sectionTitle}>Trạng thái</Text>
        <Text style={styles.paragraph}>{selectedJob.status || 'Không xác định'}</Text>

        <Text style={styles.sectionTitle}>Ngày đăng tuyển</Text>
        <Text style={styles.paragraph}>{new Date(selectedJob.postDate).toLocaleDateString('vi-VN')}</Text>

        <Text style={styles.sectionTitle}>Hạn chót ứng tuyển</Text>
        <Text style={styles.paragraph}>{new Date(selectedJob.deadLine).toLocaleDateString('vi-VN')}</Text>

        <Text style={styles.sectionTitle}>Ca làm việc</Text>
        <Text style={styles.paragraph}>
          {startTime && endTime
            ? `${new Date(startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: true })} — ${new Date(endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: true })}`
            : selectedJob.shift || 'Không xác định'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetailSchedule;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  purpleHeader: {
    backgroundColor: '#6C47FF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerCardWrapper: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  headerCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },
  headerTitleJob: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  headerClock: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 16,
    marginBottom: 6,
    color: '#222',
  },
  paragraph: {
    fontSize: 14,
    color: '#444',
  },
  list: {
    gap: 6,
  },
  listItem: {
    fontSize: 14,
    color: '#444',
  },
  errorText: {
    textAlign: 'center',
    color: '#e15a4f',
    marginTop: 20,
  },
});