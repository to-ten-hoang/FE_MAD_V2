// JobDetailSchedule.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import DetailTab from '../../components/Schedule/DetailTab';
import ShiftChangeTab from '../../components/Schedule/ShiftChangeTab';
import CheckinTab from '../../components/Schedule/CheckinTab';
import HeaderCard from '../../components/Schedule/HeaderCard';

const JobDetailSchedule = () => {
  const [activeTab, setActiveTab] = useState<'Chi tiết' | 'Xin nghỉ' | 'Chấm công'>('Chi tiết');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Nền tím chứa tiêu đề + header */}
      <View style={styles.purpleHeader}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chi tiết công việc</Text>
        </View>

        <View style={styles.headerCardWrapper}>
          <HeaderCard
            date="27 September 2025"
            title="Name Job 1"
            hours="08:00:00 hrs"
            clock="09:00 AM — 05:00 PM"
          />
        </View>
      </View>

      {/* Tabs + Nội dung */}
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.tabsWrapper}>
          <View style={styles.tabs}>
            {['Chi tiết', 'Xin nghỉ', 'Chấm công'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab as any)}
                style={[styles.tabItem, activeTab === tab && styles.tabActive]}
              >
                <Text style={activeTab === tab ? styles.tabTextActive : styles.tabText}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.tabContent}>
          {activeTab === 'Chi tiết' && <DetailTab />}
          {activeTab === 'Xin nghỉ' && <ShiftChangeTab />}
          {activeTab === 'Chấm công' && <CheckinTab />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetailSchedule;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  purpleHeader: {
    backgroundColor: '#6C47FF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerCardWrapper: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  container: {
    paddingBottom: 40,
  },
  tabsWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#f1f2f6',
    borderRadius: 12,
    padding: 4,
  },
  tabs: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
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
  tabContent: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
});
