import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DetailTab = () => {
  return (
    <View>
      <Text style={styles.section}>Mô tả công việc</Text>
      <Text style={styles.description}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...
      </Text>
      <TouchableOpacity style={styles.moreBtn}>
        <Text style={styles.moreText}>Xem thêm</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Địa điểm làm việc</Text>
      <Text style={styles.text}>Overlook Avenue, Belleville, NJ, USA</Text>

      <Text style={styles.section}>Thông tin công việc</Text>
      <Text style={styles.text}>Vị trí: Senior Designer</Text>
      <Text style={styles.text}>Bằng cấp: Cử nhân</Text>
      <Text style={styles.text}>Kinh nghiệm: 3 Years</Text>
      <Text style={styles.text}>Loại công việc: Part-Time</Text>
      <Text style={styles.text}>Chuyên môn: Design</Text>

      <Text style={styles.section}>Phúc lợi và các quyền lợi khác</Text>
      <Text style={styles.text}>- Bảo hiểm y tế</Text>
      <Text style={styles.text}>- Bảo hiểm nha khoa</Text>
      <Text style={styles.text}>- Chứng nhận kỹ thuật</Text>
      <Text style={styles.text}>- Phụ cấp bữa ăn</Text>
      <Text style={styles.text}>- Phụ cấp đi lại</Text>
      <Text style={styles.text}>- Làm việc thứ Hai đến thứ Sáu</Text>
    </View>
  );
};

export default DetailTab;

const styles = StyleSheet.create({
  section: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 6,
    color: '#222',
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  moreBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f2f6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  moreText: {
    fontSize: 13,
    color: '#6C47FF',
    fontWeight: '500',
  },
  text: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
});
