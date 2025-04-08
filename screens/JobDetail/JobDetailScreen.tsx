// src/screens/JobDetail/JobDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const JobDetailScreen = () => {
  const navigation = useNavigation();

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
        <Text style={styles.title}>UI/UX Designer</Text>
        <Text style={styles.subtitle}>Google  ・  California  ・  1 ngày trước</Text>

        {/* Sections */}
        <Text style={styles.sectionTitle}>Mô tả công việc</Text>
        <Text style={styles.paragraph}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...
        </Text>
        <TouchableOpacity style={styles.btnOutline}>
          <Text style={styles.btnOutlineText}>Xem thêm</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Yêu cầu công việc</Text>
        <View style={styles.list}>
          <Text>• Sed ut perspiciatis unde omnis iste natus.</Text>
          <Text>• Neque porro quisquam est qui dolorem.</Text>
          <Text>• Nemo enim ipsam voluptatem quia voluptas.</Text>
        </View>

        <Text style={styles.sectionTitle}>Địa điểm làm việc</Text>
        <Text style={styles.paragraph}>Overlook Avenue, Belleville, NJ, USA</Text>

        {/* Button */}
        <TouchableOpacity style={styles.applyBtn} onPress={() => navigation.navigate('ApplyJob')}>
          <Text style={styles.applyBtnText}>ỨNG TUYỂN NGAY</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetailScreen;

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
});
