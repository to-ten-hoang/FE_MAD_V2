import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { register } from '../../api/authApi';
import { Picker } from '@react-native-picker/picker'; // Import từ thư viện mới

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('JOB_SEEKER');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      const response = await register(fullName, email, password, role);
      if (response.success) {
        Alert.alert('Thành công', response.message || 'Đăng ký thành công', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('Lỗi', response.message || 'Đăng ký thất bại');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      Alert.alert('Lỗi', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo và tiêu đề */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>JobSpot</Text>
        <Text style={styles.subtitle}>Đăng ký tài khoản</Text>
      </View>

      {/* Trường nhập Tên */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên đầy đủ</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên của bạn"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
      </View>

      {/* Trường nhập Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email của bạn"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Trường nhập Mật khẩu */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nhập mật khẩu</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#888"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chọn vai trò */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bạn là</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Người tìm việc" value="JOB_SEEKER" />
            <Picker.Item label="Nhà tuyển dụng" value="RECRUITER" />
          </Picker>
        </View>
      </View>

      {/* Nút Đăng ký */}
      <TouchableOpacity
        style={[styles.registerButton, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.registerButtonText}>ĐĂNG KÝ</Text>
      </TouchableOpacity>

      {/* Liên kết Đăng nhập */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#341f97',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f5f6fa',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f5f6fa',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  registerButton: {
    backgroundColor: '#341f97',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#f39c12',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;