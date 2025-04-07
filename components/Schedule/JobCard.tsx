// components/Schedule/JobCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  hours: string;
  clock: string;
  onPress: () => void;
};

const JobCard = ({ title, hours, clock, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.entryTitle}>{title}</Text>
          <Text style={styles.hours}>{hours}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.clockLabel}>Clock in & Out</Text>
          <Text style={styles.clockTime}>{clock}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fd',
    padding: 15,
    borderRadius: 12,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  entryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  hours: {
    fontSize: 13,
    color: '#444',
  },
  clockLabel: {
    fontSize: 12,
    color: '#999',
  },
  clockTime: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
  },
});
