import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CheckinTab = () => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  return (
    <View>
      <Text style={styles.section}>Cho điểm (thang 5 điểm)</Text>
      {[1, 2, 3, 4, 5].map((num) => (
        <TouchableOpacity key={num} style={styles.radioRow} onPress={() => setRating(num)}>
          <Ionicons
            name={rating === num ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color="#6C47FF"
          />
          <Text style={styles.radioText}>{num} điểm</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.section}>Đánh giá</Text>
      <TextInput
        placeholder="Để lại bình luận về công việc này"
        multiline
        numberOfLines={4}
        value={feedback}
        onChangeText={setFeedback}
        style={styles.input}
      />

      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>Hoàn thành công việc</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckinTab;

const styles = StyleSheet.create({
  section: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 14,
    color: '#222',
    marginTop: 10,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: '#341f97',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
