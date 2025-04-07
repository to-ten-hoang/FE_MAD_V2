import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

import bannerImg from '../../assets/images/banner.png';
import avatarImg from '../../assets/images/avatar.jpg';
import appleLogo from '../../assets/images/company_apple.png';
import searchIcon from '../../assets/images/icon_search.png';
import filterIcon from '../../assets/images/icon_filter.png';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSearchFocus = () => {
    navigation.navigate('Search');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.hello}>Hello</Text>
            <Text style={styles.name}>Huy Hoàng.</Text>
          </View>
          <Image source={avatarImg} style={styles.avatar} />
        </View>

        {/* Banner */}
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

        {/* Search */}
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBox} onPress={handleSearchFocus}>
            <Image source={searchIcon} style={styles.icon} />
            <Text style={styles.searchPlaceholder}>Tìm kiếm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Image source={filterIcon} style={styles.iconSmall} />
          </TouchableOpacity>
        </View>

        {/* Job List */}
        <Text style={styles.section}>Danh sách công việc gần đây</Text>

        {[1, 2].map((_, idx) => (
          <View key={idx} style={styles.jobCard}>
            <Image source={appleLogo} style={styles.logo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.jobTitle}>Product Designer</Text>
              <Text>Google inc - California, USA</Text>
              <Text style={styles.salary}>$15K/Mo</Text>
              <View style={styles.tags}>
                <Text style={styles.tag}>Thực tập designer</Text>
                <Text style={styles.tag}>Bán thời gian</Text>
                <Text style={styles.tagApply}>Ứng tuyển</Text>
              </View>
            </View>
          </View>
        ))}
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
    marginBottom: 10
  },
  hello: { fontSize: 22 },
  name: { fontSize: 26, fontWeight: 'bold' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#341f97',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20
  },
  bannerText: { flex: 1 },
  discount: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  subText: { color: '#fff' },
  joinBtn: {
    backgroundColor: '#ff9f43',
    marginTop: 10,
    padding: 10,
    borderRadius: 8
  },
  joinText: { color: '#fff', textAlign: 'center' },
  bannerImg: { width: 90, height: 90, borderRadius: 12 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: '#888'
  },
  icon: { width: 20, height: 20 },
  iconSmall: { width: 24, height: 24 },
  filterButton: {
    backgroundColor: '#ff9f43',
    marginLeft: 10,
    padding: 10,
    borderRadius: 8
  },
  section: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000'
  },
  jobCard: {
    flexDirection: 'row',
    backgroundColor: '#f5f6fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },
  logo: { width: 40, height: 40, marginRight: 10 },
  jobTitle: { fontWeight: 'bold', fontSize: 16 },
  salary: { marginTop: 2, marginBottom: 5, fontWeight: '500' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  tag: {
    backgroundColor: '#dcdde1',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    fontSize: 12
  },
  tagApply: {
    backgroundColor: '#ffe0dc',
    color: '#e15a4f',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12
  }
});

export default HomeScreen;
