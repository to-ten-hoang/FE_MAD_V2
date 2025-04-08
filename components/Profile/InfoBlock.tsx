// src/components/Common/InfoBlock.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InfoBlock = ({
  icon,
  title,
  value,
  onEdit,
}: {
  icon: any;
  title: string;
  value: string;
  onEdit?: () => void;
}) => {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {onEdit && (
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="pencil" size={20} color="#888" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InfoBlock;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  icon: { width: 24, height: 24, marginRight: 12 },
  title: { fontSize: 13, color: '#555' },
  value: { fontSize: 14, fontWeight: 'bold', color: '#000' },
});
