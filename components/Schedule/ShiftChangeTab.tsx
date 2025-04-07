import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const ShiftChangeTab = () => {
  return (
    <View>
      <Text style={styles.section}>Lý do</Text>
      <TextInput
        placeholder="Lý do của bạn"
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <Text style={styles.note}>
        *Lưu ý: Bạn sẽ phải chờ nhà tuyển dụng đồng ý trước khi đổi ca/xin nghỉ. Nếu không, bạn sẽ phải chịu hoàn toàn trách nhiệm theo hợp đồng.
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Gửi yêu cầu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShiftChangeTab;

const styles = StyleSheet.create({
  section: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
    color: '#222',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  note: {
    fontSize: 12,
    color: '#999',
    lineHeight: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#341f97',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
