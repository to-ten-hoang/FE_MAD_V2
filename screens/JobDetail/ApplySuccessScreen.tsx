// src/screens/JobDetail/ApplySuccessScreen.tsx
import React from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const ApplySuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Image source={require('../../assets/images/google.png')} style={styles.logo} />
        <Text style={styles.title}>UI/UX Designer</Text>
        <Text style={styles.subtitle}>Google ・ California ・ 1 ngày trước</Text>

        <View style={styles.cvBox}>
          <Image
            source={require('../../assets/images/icon_pdf.png')}
            style={styles.pdfIcon}
          />
          <View>
            <Text style={styles.cvName}>Jamet Kudasi - CV - UI/UX Designer</Text>
            <Text style={styles.cvDate}>867 KB • 16 Feb 2022 at 11:30 am</Text>
          </View>
        </View>

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

export default ApplySuccessScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  logo: { width: 60, height: 60, borderRadius: 30, marginVertical: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 20 },
  cvBox: {
    flexDirection: 'row',
    backgroundColor: '#f1f2f6',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  pdfIcon: { width: 32, height: 32, marginRight: 10 },
  cvName: { fontWeight: 'bold' },
  cvDate: { fontSize: 12, color: '#777' },
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
});
