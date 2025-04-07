// JobDetailScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DetailTab from '../../components/Schedule/DetailTab';
import ShiftChangeTab from '../../components/Schedule/ShiftChangeTab';
import CheckinTab from '../../components/Schedule/CheckinTab';
import HeaderCard from '../../components/Schedule/HeaderCard';

const JobDetailScreen = () => {
  const [activeTab, setActiveTab] = useState<'Chi tiết' | 'Đổi ca / Xin nghỉ' | 'Chấm công'>('Chi tiết');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <HeaderCard
          date="27 September 2025"
          title="Name Job 1"
          hours="08:00:00 hrs"
          clock="09:00 AM — 05:00 PM"
        />

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

        <View style={styles.tabContent}>
          {activeTab === 'Chi tiết' && <DetailTab />}
          {activeTab === 'Đổi ca / Xin nghỉ' && <ShiftChangeTab />}
          {activeTab === 'Chấm công' && <CheckinTab />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetailScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { paddingBottom: 40 },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#f1f2f6',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: { color: '#888', fontSize: 14 },
  tabActive: { backgroundColor: '#fff' },
  tabTextActive: { color: '#6C47FF', fontWeight: 'bold' },
  tabContent: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
});