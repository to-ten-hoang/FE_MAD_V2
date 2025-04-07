// MessageCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Props {
  avatar: any;
  name: string;
  preview: string;
  time: string;
  unreadCount?: number;
  onPress: () => void;
}

const MessageCard = ({ avatar, name, preview, time, unreadCount, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={avatar} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text numberOfLines={1} style={styles.preview}>{preview}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.time}>{time}</Text>
        {unreadCount ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6'
  },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  name: { fontWeight: 'bold', fontSize: 14, marginBottom: 2 },
  preview: { color: '#666', fontSize: 13 },
  right: { alignItems: 'flex-end', marginLeft: 8 },
  time: { fontSize: 11, color: '#999' },
  badge: {
    backgroundColor: '#f39c12',
    borderRadius: 12,
    paddingHorizontal: 6,
    marginTop: 6,
    minWidth: 18,
    alignItems: 'center'
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '500' },
});

export default MessageCard;