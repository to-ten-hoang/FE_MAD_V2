import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type JobCardProps = {
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  logo: any;
  onPress?: () => void;
};

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  salary,
  tags,
  logo,
  onPress
}) => {
  // Lọc bỏ tag "Ứng tuyển"
  const filteredTags = tags.filter(tag => tag.toLowerCase() !== 'ứng tuyển');

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Image source={logo} style={styles.logo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{company} ・{location}</Text>
        </View>
        {/* <Ionicons name="ellipsis-vertical" size={20} color="#999" /> */}
      </View>

      {/* Salary */}
      <View style={styles.salaryRow}>
        <Text style={styles.salaryAmount}>{salary}</Text>
        <Text style={styles.salaryUnit}></Text>
      </View>

      {/* Tags */}
      <View style={styles.tags}>
        {filteredTags.map((tag, i) => (
          <Text key={i} style={styles.tag}>{tag}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f6fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    marginTop: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1e1e1e',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  salaryRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  salaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
    marginRight: 4,
  },
  salaryUnit: {
    fontSize: 13,
    color: '#999',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e4e6ed',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    color: '#555',
    marginRight: 6,
    marginBottom: 6,
  },
});
