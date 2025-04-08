// src/components/Common/SectionTitle.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SectionTitle = ({ title }: { title: string }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default SectionTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
