import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JobCard from '../../components/Common/JobCard';
import { useUserStore } from '../../stores/userStore';
import { searchJobs } from '../../api/authApi';
import debounce from 'lodash/debounce';

// Định nghĩa interface cho Job
interface Job {
  id: number;
  title: string;
  description: string;
  requirement: string;
  salary: string;
  benefit: string;
  location: string;
  numberOfPositions: number;
  postDate: string;
  deadLine: string;
  updatedDate: string;
  status: string;
  recruiter: string;
  shift: string;
}

const SearchScreen = () => {
  const navigation = useNavigation();
  const { userId, isAuthenticated, initialize } = useUserStore();
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm fetch dữ liệu tìm kiếm
  const fetchJobs = useCallback(async (searchQuery: string, isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await searchJobs(searchQuery);
      setJobs(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch jobs');
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, [userId]);

  // Debounce fetchJobs để tránh gọi API quá thường xuyên
  const debouncedFetchJobs = useCallback(
    debounce((query: string) => {
      fetchJobs(query);
    }, 500), // Trì hoãn 500ms
    [fetchJobs]
  );

  // Khởi tạo dữ liệu lần đầu
  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchJobs('');
    } else {
      initialize().then(() => {
        if (isAuthenticated && userId) fetchJobs('');
      });
    }
  }, [isAuthenticated, userId, initialize, fetchJobs]);

  // Làm mới dữ liệu khi focus
  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated && userId) {
        fetchJobs(search, false);
      }
    }, [isAuthenticated, userId, search, fetchJobs])
  );

  // Xử lý thay đổi search với debounce
  const handleSearchChange = (text: string) => {
    setSearch(text);
    debouncedFetchJobs(text);
  };

  const renderItem = ({ item }: { item: Job }) => (
    <JobCard
      title={item.title}
      company={item.recruiter}
      location={item.location}
      salary={item.salary}
      tags={item.benefit.split(', ').map(b => b.trim())}
      onPress={() => navigation.navigate('JobDetail', { jobId: item.id.toString() })}
    />
  );

  if (loading && jobs.length === 0) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ActivityIndicator size="large" color="#1e0eff" />
      </SafeAreaView>
    );
  }

  if (error && jobs.length === 0) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header search bar */}
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={handleSearchChange}
            style={styles.input}
          />
        </View>

        {/* Result list */}
        <FlatList
          data={jobs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>Không tìm thấy công việc nào</Text>}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchJobs(search, true)}
              colors={['#1e0eff']}
            />
          }
        />
        {error && jobs.length > 0 && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 20 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f1f2f6',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 48,
  },
  input: { flex: 1, paddingHorizontal: 10, height: 40 },
  list: { paddingBottom: 20 },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  errorContainer: {
    padding: 10,
    backgroundColor: '#ffe6e6',
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
  },
  errorText: {
    textAlign: 'center',
    color: '#e15a4f',
  },
});