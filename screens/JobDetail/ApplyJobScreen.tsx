import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useJobStore } from '../../stores/jobStore';
import { useUserStore } from '../../stores/userStore';

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Image source={require('../../assets/images/google.png')} style={styles.logo} />
        <Text style={styles.title}>{selectedJob.title}</Text>
        <Text style={styles.subtitle}>
          {selectedJob.recruiter}  ・  {selectedJob.location}  ・  {new Date(selectedJob.postDate).toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' })}
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleApply}>
          <Text style={styles.buttonText}>XÁC NHẬN ỨNG TUYỂN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginVertical: 10,
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