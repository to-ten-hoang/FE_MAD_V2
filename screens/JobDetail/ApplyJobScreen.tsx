import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useJobStore } from '../../stores/jobStore';
import { useUserStore } from '../../stores/userStore';
import Animated, { FadeIn } from 'react-native-reanimated'; // Thêm animation

type RouteParams = {
  jobId: string;
};

const ApplyJobScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { jobId } = params as RouteParams;
  const { selectedJob, loading, error, fetchJobDetail, applyJob } = useJobStore();
  const { userId, isAuthenticated } = useUserStore();

  useEffect(() => {
    fetchJobDetail(jobId);
  }, [jobId, fetchJobDetail]);

  const handleApply = async () => {
    if (!isAuthenticated || !userId) {
      Alert.alert('Lỗi', 'Vui lòng đăng nhập để ứng tuyển.');
      return;
    }

    if (!selectedJob) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin công việc.');
      return;
    }

    try {
      await applyJob(userId, parseInt(jobId));
      navigation.navigate('ApplySuccess', { jobId });
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Ứng tuyển thất bại. Vui lòng thử lại.');
    }
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
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Job Header Card */}
        <Animated.View style={styles.jobHeaderCard} entering={FadeIn.duration(500)}>
          <Text style={styles.title}>{selectedJob.title}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleItem}>
              <Ionicons name="business" size={14} color="#6C47FF" /> {selectedJob.recruiter}
            </Text>
            <Text style={styles.subtitleItem}>
              <Ionicons name="location" size={14} color="#6C47FF" /> {selectedJob.location}
            </Text>
            {/* <Text style={styles.subtitleItem}>
              <Ionicons name="calendar" size={14} color="#6C47FF" /> {new Date(selectedJob.postDate).toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' })}
            </Text> */}
          </View>
        </Animated.View>

        {/* <Image source={require('../../assets/images/google.png')} style={styles.logo} /> */}
        <TouchableOpacity style={styles.button} onPress={handleApply}>
          <Text style={styles.buttonText}>XÁC NHẬN ỨNG TUYỂN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 10 },
  jobHeaderCard: {
    backgroundColor: '#f8f9fd',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2, // Thêm shadow trên Android
    shadowColor: '#000', // Shadow trên iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: '#1e0eff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Hiệu ứng bóng nhẹ
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitleContainer: {
    flexDirection: 'column',
    gap: 6,
  },
  subtitleItem: {
    fontSize: 14,
    color: '#555',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  button: {
    backgroundColor: '#1e0eff',
    padding: 14,
    borderRadius: 12,
    marginTop: 30,
  },
  buttonText: {
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

export default ApplyJobScreen;