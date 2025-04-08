// src/components/Common/Tag.tsx
import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';

const Tag = ({ label, style }: { label: string; style?: ViewStyle }) => {
  return <Text style={[styles.tag, style]}>{label}</Text>;
};

export default Tag;

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#f1f2f6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    marginRight: 6,
    marginBottom: 6,
    color: '#333',
  },
});
