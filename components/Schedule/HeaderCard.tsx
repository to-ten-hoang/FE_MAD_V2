// components/Schedule/HeaderCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  date: string;
  title: string;
  hours: string;
  clock: string;
};

const HeaderCard = ({ date, title, hours, clock }: Props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.time}>08:15</Text>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.jobTitle}>{title}</Text>
          <Text style={styles.hours}>{hours}</Text>
        </View>
        <View>
          <Text style={styles.label}>Clock in & Out</Text>
          <Text style={styles.clock}>{clock}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderCard;

const styles = StyleSheet.create({
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
});
