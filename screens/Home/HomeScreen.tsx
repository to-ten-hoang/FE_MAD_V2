import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import JobCard from '../../components/Common/JobCard';
import { useUserStore } from '../../stores/userStore';
import { useJobStore } from '../../stores/jobStore';

import bannerImg from '../../assets/images/banner.png';
import avatarImg from '../../assets/images/avatar.jpg';
import appleLogo from '../../assets/images/company_apple.png';
import searchIcon from '../../assets/images/icon_search.png';
import filterIcon from '../../assets/images/icon_filter.png';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { fullName, isAuthenticated, clearUser } = useUserStore();
  const { jobs, loading, error, fetchJobs } = useJobStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      clearUser();
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      return;
    }
    fetchJobs();
  }, [isAuthenticated, navigation, clearUser, fetchJobs]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchJobs();
    } catch (error) {
      // Lỗi đã được xử lý trong store
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearchFocus = () => {
    navigation.navigate('Search');
  };

  const handleJobPress = (jobId: number) => {
    navigation.navigate('JobDetail', { jobId: jobId.toString() });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#341f97" />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.hello}>Hello</Text>
            <Text style={styles.name}>{fullName || 'User'}.</Text>
          </View>
          <Image source={avatarImg} style={styles.avatar} />
        </View>

        <View style={styles.banner}>
          <View style={styles.bannerText}>
            <Text style={styles.discount}>50% off</Text>
            <Text style={styles.subText}>take any courses</Text>
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={styles.joinText}>Join Now</Text>
            </TouchableOpacity>
          </View>
          <Image source={bannerImg} style={styles.bannerImg} />
        </View>

        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBox} onPress={handleSearchFocus}>
            <Image source={searchIcon} style={styles.icon} />
            <Text style={styles.searchPlaceholder}>Tìm kiếm</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.filterButton}>
            <Image source={filterIcon} style={styles.iconSmall} />
          </TouchableOpacity> */}
        </View>

        <Text style={styles.section}>Danh sách công việc gần đây</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#341f97" />
        ) : error ? (
          <Text style={styles.noJobs}>{error}</Text>
        ) : !Array.isArray(jobs) || jobs.length === 0 ? (
          <Text style={styles.noJobs}>Không có công việc nào để hiển thị.</Text>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={`job-${job.id}`}
              title={job.title}
              company={job.recruiter}
              location={job.location}
              salary={job.salary}
              tags={[job.shift, job.status === 'OPEN' ? 'Đang tuyển' : 'Đã đóng']}
              // logo={appleLogo}
              onPress={() => handleJobPress(job.id)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  hello: { fontSize: 22 },
  name: { fontSize: 26, fontWeight: 'bold' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#341f97',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
  },
  bannerText: { flex: 1 },
  discount: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  subText: { color: '#fff' },
  joinBtn: {
    backgroundColor: '#ff9f43',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  joinText: { color: '#fff', textAlign: 'center' },
  bannerImg: { width: 90, height: 90, borderRadius: 12 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: '#888',
  },
  icon: { width: 20, height: 20 },
  iconSmall: { width: 24, height: 24 },
  filterButton: {
    backgroundColor: '#ff9f43',
    marginLeft: 10,
    padding: 10,
    borderRadius: 8,
  },
  section: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  noJobs: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
  },
});

export default HomeScreen;