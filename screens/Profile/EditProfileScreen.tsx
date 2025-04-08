import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SectionTitle from '../../components/Profile/SectionTitle';
import CVUpload from '../../components/Profile/CVUpload';

const EditProfileScreen = () => {
  const [name, setName] = useState('Brandone Louis');
  const [dob, setDob] = useState(new Date('1992-08-06'));
  const [showDate, setShowDate] = useState(false);
  const [phone, setPhone] = useState('619 3456 7890');
  const [email, setEmail] = useState('mad@gmail.com');
  const [cvFile, setCvFile] = useState<any>(null);

  const handlePickFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (!res.canceled) setCvFile(res.assets[0]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.avatar} />
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity>
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
          <Field label="Email" value={email} onChangeText={setEmail} />
        </View>

        <View style={styles.section}>
          <SectionTitle title="CV" />
          <CVUpload file={cvFile} onPickFile={handlePickFile} />
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>LƯU</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const Field = ({ label, value, onChangeText, editable = true }: any) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={[styles.input, !editable && { backgroundColor: '#f1f2f6' }]}
      value={value}
      editable={editable}
      onChangeText={onChangeText}
    />
  </View>
);

export default EditProfileScreen;

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
    backgroundColor: '#fff'
  },
  saveBtn: {
    backgroundColor: '#1e0eff',
    padding: 14,
    borderRadius: 12,
    marginTop: 30
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
