import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUserStore } from '../../stores/userStore';
import SectionTitle from '../../components/Profile/SectionTitle';
import CVUpload from '../../components/Profile/CVUpload';

const EditProfileScreen = () => {
  const {
    userId,
    fullName,
    email,
    phoneNumber,
    birthDate,
    workExperience,
    education,
    skills,
    languages,
    certifications,
    cvFile,
    profilePicture,
    loading,
    error,
    setUser,
    updateUserProfile,
  } = useUserStore();

  const [name, setName] = useState(fullName || '');
  const [dob, setDob] = useState(birthDate ? new Date(birthDate) : new Date());
  const [showDate, setShowDate] = useState(false);
  const [phone, setPhone] = useState(phoneNumber || '');
  const [userEmail, setUserEmail] = useState(email || '');
  const [userWorkExperience, setUserWorkExperience] = useState(workExperience || '');
  const [userEducation, setUserEducation] = useState(education || '');
  const [userSkills, setUserSkills] = useState(skills?.join(', ') || '');
  const [userLanguages, setUserLanguages] = useState(languages?.join(', ') || '');
  const [userCertifications, setUserCertifications] = useState(certifications?.join(', ') || '');
  const [userCvFile, setUserCvFile] = useState<any>(cvFile || null);
  const [userProfilePicture, setUserProfilePicture] = useState<any>(profilePicture || null);

  useEffect(() => {
    if (userId) {
      setUser(userId);
    }
  }, [userId, setUser]);

  const handlePickFile = async (type: 'cv' | 'profilePicture') => {
    const res = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (!res.canceled && res.assets && res.assets.length > 0) {
      if (type === 'cv') {
        setUserCvFile(res.assets[0].uri);
      } else {
        setUserProfilePicture(res.assets[0].uri);
      }
    }
  };

  const handleSave = async () => {
    if (!userId) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng.');
      return;
    }

    const profileData = {
      fullName: name,
      email: userEmail,
      phoneNumber: phone,
      birthDate: dob.toISOString(),
      workExperience: userWorkExperience,
      education: userEducation,
      skills: userSkills.split(',').map((skill: string) => skill.trim()),
      languages: userLanguages.split(',').map((lang: string) => lang.trim()),
      certifications: userCertifications.split(',').map((cert: string) => cert.trim()),
      cvFile: userCvFile,
      profilePicture: userProfilePicture,
    };

    try {
      await updateUserProfile(profileData);
      Alert.alert('Thành công', 'Cập nhật thông tin cá nhân thành công.');
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Cập nhật thông tin thất bại.');
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={userProfilePicture ? { uri: userProfilePicture } : require('../../assets/images/avatar.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity onPress={() => handlePickFile('profilePicture')}>
            <Text style={styles.changePhoto}>Thay đổi ảnh</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <SectionTitle title="Thông tin cơ bản" />
          <Field label="Họ tên" value={name} onChangeText={setName} />
          <TouchableOpacity onPress={() => setShowDate(true)}>
            <Field label="Ngày sinh" value={dob.toLocaleDateString('vi-VN')} editable={false} />
          </TouchableOpacity>
          {showDate && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={(_, date) => {
                setShowDate(false);
                if (date) setDob(date);
              }}
            />
          )}
          <Field label="Số điện thoại" value={phone} onChangeText={setPhone} />
          <Field label="Email" value={userEmail} onChangeText={setUserEmail} />
        </View>

        <View style={styles.section}>
          <SectionTitle title="Kinh nghiệm làm việc" />
          <Field
            label="Kinh nghiệm làm việc"
            value={userWorkExperience}
            onChangeText={setUserWorkExperience}
            multiline
          />
        </View>

        <View style={styles.section}>
          <SectionTitle title="Học vấn" />
          <Field label="Học vấn" value={userEducation} onChangeText={setUserEducation} multiline />
        </View>

        <View style={styles.section}>
          <SectionTitle title="Kỹ năng" />
          <Field label="Kỹ năng (phân cách bởi dấu phẩy)" value={userSkills} onChangeText={setUserSkills} />
        </View>

        <View style={styles.section}>
          <SectionTitle title="Ngôn ngữ" />
          <Field label="Ngôn ngữ (phân cách bởi dấu phẩy)" value={userLanguages} onChangeText={setUserLanguages} />
        </View>

        <View style={styles.section}>
          <SectionTitle title="Chứng chỉ" />
          <Field label="Chứng chỉ (phân cách bởi dấu phẩy)" value={userCertifications} onChangeText={setUserCertifications} />
        </View>

        <View style={styles.section}>
          <SectionTitle title="CV" />
          <CVUpload file={userCvFile} onPickFile={() => handlePickFile('cv')} />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>LƯU</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const Field = ({ label, value, onChangeText, editable = true, multiline = false }: any) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={[styles.input, !editable && { backgroundColor: '#f1f2f6' }, multiline && { minHeight: 100, textAlignVertical: 'top' }]}
      value={value}
      editable={editable}
      onChangeText={onChangeText}
      multiline={multiline}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  name: { marginTop: 10, fontSize: 18, fontWeight: 'bold' },
  changePhoto: { color: '#6c47ff', marginTop: 5 },
  section: { marginBottom: 24 },
  fieldLabel: { marginBottom: 6, color: '#555' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  saveBtn: {
    backgroundColor: '#1e0eff',
    padding: 14,
    borderRadius: 12,
    marginTop: 30,
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'center',
    color: '#e15a4f',
    marginTop: 20,
  },
});

export default EditProfileScreen;