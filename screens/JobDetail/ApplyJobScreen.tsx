// src/screens/JobDetail/ApplyJobScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, Image
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ApplyJobScreen = () => {
  const [cvFile, setCvFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const navigation = useNavigation();

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (result.assets && result.assets.length > 0) {
      setCvFile(result.assets[0]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Image source={require('../../assets/images/google.png')} style={styles.logo} />
        <Text style={styles.title}>UI/UX Designer</Text>
        <Text style={styles.subtitle}>Google ・ California ・ 1 ngày trước</Text>

        <Text style={styles.section}>Tải CV lên</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={handlePickFile}>
          {cvFile ? (
            <Text style={styles.fileName}>{cvFile.name}</Text>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={24} color="#888" />
              <Text style={styles.uploadText}>Nhấn để tải lên</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.section}>Thư giới thiệu</Text>
        <TextInput
          multiline
          placeholder="Giải thích lý do vì sao bạn là người phù hợp..."
          style={styles.input}
          value={coverLetter}
          onChangeText={setCoverLetter}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ApplySuccess')}
          disabled={!cvFile}
        >
          <Text style={styles.buttonText}>ỨNG TUYỂN NGAY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ApplyJobScreen;

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
  section: {
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: '#666',
    marginTop: 6,
  },
  fileName: {
    fontSize: 14,
    color: '#333',
  },
  input: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
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
});
