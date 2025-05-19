import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useJobStore } from '../../stores/jobStore';

type RouteParams = {
  jobId: string;
};

const JobDetailScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { jobId } = params as RouteParams;
  const { selectedJob, loading, error, fetchJobDetail } = useJobStore();
  const [confirmVisible, setConfirmVisible] = useState(false);

  useEffect(() => {
    fetchJobDetail(jobId);
  }, [jobId, fetchJobDetail]);

  const handleApply = () => {
    Alert.alert(
      'Xác nhận ứng tuyển',
      `Bạn có chắc chắn muốn ứng tuyển vào vị trí ${selectedJob?.title} tại ${selectedJob?.recruiter}?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xác nhận',
          onPress: () => navigation.navigate('ApplyJob', { jobId }),
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#1e0eff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!selectedJob) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No job data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <Image source={require('../../assets/images/google.png')} style={styles.logo} />
        <Text style={styles.title}>{selectedJob.title}</Text>
        <Text style={styles.subtitle}>
          {selectedJob.recruiter}  ・  {selectedJob.location}  ・  {new Date(selectedJob.postDate).toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' })}
        </Text>

        {/* Sections */}
        <Text style={styles.sectionTitle}>Mô tả công việc</Text>
        <Text style={styles.paragraph}>{selectedJob.description}</Text>
        <TouchableOpacity style={styles.btnOutline}>
          <Text style={styles.btnOutlineText}>Xem thêm</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Yêu cầu công việc</Text>
        <View style={styles.list}>
          {selectedJob.requirement.split('. ').map((req: string, index: number) => (
            req && <Text key={index}>• {req.trim()}.</Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Mức lương</Text>
        <Text style={styles.paragraph}>{selectedJob.salary}</Text>

        <Text style={styles.sectionTitle}>Quyền lợi</Text>
        <Text style={styles.paragraph}>{selectedJob.benefit}</Text>

        <Text style={styles.sectionTitle}>Địa điểm làm việc</Text>
        <Text style={styles.paragraph}>{selectedJob.location}</Text>

        <Text style={styles.sectionTitle}>Số lượng vị trí</Text>
        <Text style={styles.paragraph}>{selectedJob.numberOfPositions}</Text>

        <Text style={styles.sectionTitle}>Trạng thái</Text>
        <Text style={styles.paragraph}>{selectedJob.status}</Text>

        <Text style={styles.sectionTitle}>Ngày đăng tuyển</Text>
        <Text style={styles.paragraph}>{new Date(selectedJob.postDate).toLocaleDateString('vi-VN')}</Text>

        <Text style={styles.sectionTitle}>Hạn chót ứng tuyển</Text>
        <Text style={styles.paragraph}>{new Date(selectedJob.deadLine).toLocaleDateString('vi-VN')}</Text>

        <Text style={styles.sectionTitle}>Ca làm việc</Text>
        <Text style={styles.paragraph}>{selectedJob.shift}</Text>

        {/* Button */}
        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
          <Text style={styles.applyBtnText}>ỨNG TUYỂN NGAY</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 16,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    color: '#444',
  },
  list: {
    gap: 6,
  },
  btnOutline: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#6C47FF',
    borderRadius: 8,
  },
  btnOutlineText: {
    color: '#6C47FF',
    fontSize: 13,
  },
  applyBtn: {
    backgroundColor: '#1e0eff',
    padding: 14,
    borderRadius: 12,
    marginTop: 30,
  },
  applyBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: '#e15a4f',
    marginTop: 20,
  },
});

export default JobDetailScreen;