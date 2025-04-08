// src/components/Common/CVUpload.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CVUpload = ({
  file,
  onPickFile,
}: {
  file: any;
  onPickFile: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPickFile} style={styles.uploadBox}>
      {file ? (
        <View style={styles.row}>
          <Image
            source={require('../../assets/images/icon_pdf.png')}
            style={styles.icon}
          />
          <Text style={styles.fileName}>{file.name}</Text>
        </View>
      ) : (
        <Text style={styles.placeholder}>Nhấn để tải lên</Text>
      )}
    </TouchableOpacity>
  );
};

export default CVUpload;

const styles = StyleSheet.create({
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#f5f6fa',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  fileName: {
    fontSize: 14,
    color: '#333',
  },
  placeholder: {
    color: '#888',
  },
});
