import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JobCard from '../../components/Common/JobCard';


const mockJobs = [
  {
    id: '1',
    title: 'UI/UX Designer',
    company: 'Google inc',
    location: 'California, USA',
    salary: '$15K/Mo',
    tags: ['Design', 'Full time', 'Senior designer'],
    logo: require('../../assets/images/google.png'),
  },
  {
    id: '2',
    title: 'Lead Designer',
    company: 'Dribbble inc',
    location: 'California, USA',
    salary: '$20K/Mo',
    tags: ['Design', 'Full time', 'Senior designer'],
    logo: require('../../assets/images/dribbble.png'),
  },
  {
    id: '3',
    title: 'UX Researcher',
    company: 'Twitter inc',
    location: 'California, USA',
    salary: '$12K/Mo',
    tags: ['Design', 'Full time', 'Senior designer'],
    logo: require('../../assets/images/twitter.png'),
  },
];

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const filtered = search
    ? mockJobs.filter(job => job.title.toLowerCase().includes(search.toLowerCase()))
    : [];

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
            onChangeText={setSearch}
            style={styles.input}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Image
              source={require('../../assets/images/icon_filter.png')}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>

        {/* Result list */}
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <JobCard
              title={item.title}
              company={item.company}
              location={item.location}
              salary={item.salary.replace('/Mo', '')} // gọt /Mo để tránh lỗi
              tags={item.tags}
              logo={item.logo}
              onPress={() => navigation.navigate('JobDetail')} // <-- Thêm dòng này
            />
          )}
/>
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
  filterBtn: {
    backgroundColor: '#ff9f43',
    padding: 8,
    borderRadius: 8,
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f5f6fa',
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  logo: { width: 40, height: 40, marginRight: 10 },
  title: { fontWeight: 'bold' },
  tags: { flexDirection: 'row', marginTop: 5 },
  tag: {
    backgroundColor: '#dcdde1',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    fontSize: 12,
  },
  salary: {
    fontWeight: '600',
    marginTop: 8,
    color: '#444'
  }
});
