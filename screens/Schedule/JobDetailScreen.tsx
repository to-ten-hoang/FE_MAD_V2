import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const JobDetailScreen = () => {
  const [activeTab, setActiveTab] = useState<'Chi tiết' | 'Đổi ca / Xin nghỉ' | 'Chấm công'>('Chi tiết');
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.time}>08:15</Text>
          <Text style={styles.date}>27 September 2025</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.jobTitle}>Name Job 1</Text>
              <Text style={styles.hours}>08:00:00 hrs</Text>
            </View>
            <View>
              <Text style={styles.label}>Clock in & Out</Text>
              <Text style={styles.clock}>09:00 AM — 05:00 PM</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {['Chi tiết', 'Đổi ca / Xin nghỉ', 'Chấm công'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              style={[styles.tabItem, activeTab === tab && styles.tabActive]}
            >
              <Text style={activeTab === tab ? styles.tabTextActive : styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab content */}
        {activeTab === 'Chi tiết' && (
          <View style={styles.box}>
            <Text style={styles.boxText}>
              - Công việc: Thiết kế giao diện người dùng{'\n'}
              - Vị trí: California, USA{'\n'}
              - Loại hình: Bán thời gian, Thực tập
            </Text>
          </View>
        )}

        {activeTab === 'Đổi ca / Xin nghỉ' && (
          <View style={styles.box}>
            <Text style={styles.boxText}>Tính năng đang phát triển 🚧</Text>
          </View>
        )}

        {activeTab === 'Chấm công' && (
          <View style={styles.box}>
            <Text style={styles.section}>Cho điểm (thang 5 điểm)</Text>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.radioRow}
                onPress={() => setRating(num)}
              >
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
              style={styles.input}
              multiline
              numberOfLines={4}
              value={feedback}
              onChangeText={setFeedback}
            />

            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitText}>Hoàn thành công việc</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetailScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#6C47FF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  time: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 4,
  },
  date: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  jobTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  hours: {
    color: '#fff',
    fontSize: 13,
  },
  label: {
    color: '#fff',
    fontSize: 12,
  },
  clock: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f1f2f6',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
  },
  tabActive: {
    backgroundColor: '#fff',
  },
  tabTextActive: {
    color: '#6C47FF',
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: '#f8f9fd',
    padding: 16,
    borderRadius: 12,
  },
  boxText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  section: {
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 14,
    color: '#222',
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
