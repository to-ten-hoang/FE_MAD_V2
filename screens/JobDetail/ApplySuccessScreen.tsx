import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useJobStore } from '../../stores/jobStore';

type RouteParams = {
  jobId: string;
};

const ApplySuccessScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { jobId } = params as RouteParams;
  const { selectedJob } = useJobStore();

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
        <Image source={require('../../assets/images/google.png')} style={styles.logo} />
        <Text style={styles.title}>{selectedJob.title}</Text>
        <Text style={styles.subtitle}>
          {selectedJob.recruiter}  ・  {selectedJob.location}  ・  {new Date(selectedJob.postDate).toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' })}
        </Text>

        <Image
          source={require('../../assets/images/success.png')}
          style={styles.successIcon}
        />
        <Text style={styles.successText}>Thành công</Text>
        <Text style={styles.successDesc}>Chúc mừng, đơn ứng tuyển của bạn đã được gửi đi.</Text>

        <TouchableOpacity style={styles.btnSecondary}>
          <Text style={styles.btnSecondaryText}>LIÊN HỆ VỚI NHÀ TUYỂN DỤNG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('Tabs')}>
          <Text style={styles.btnPrimaryText}>QUAY LẠI TRANG CHỦ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  logo: { width: 60, height: 60, borderRadius: 30, marginVertical: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 20 },
  successIcon: { width: 80, height: 80, marginTop: 20 },
  successText: { fontSize: 20, fontWeight: 'bold', marginTop: 16 },
  successDesc: { fontSize: 14, color: '#444', textAlign: 'center', marginTop: 6 },
  btnSecondary: {
    padding: 14,
    backgroundColor: '#f1f2f6',
    borderRadius: 10,
    width: '100%',
    marginTop: 12,
  },
  btnSecondaryText: { textAlign: 'center', fontWeight: 'bold' },
  btnPrimary: {
    backgroundColor: '#1e0eff',
    padding: 14,
    borderRadius: 12,
    width: '100%',
    marginTop: 20,
  },
  btnPrimaryText: {
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

export default ApplySuccessScreen;