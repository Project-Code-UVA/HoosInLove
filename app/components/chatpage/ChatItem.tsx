import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export type ChatItemProps = {
  id: string;
  name: string;
  message: string;
  isFriend?: boolean;
  isLove?: boolean;
  onPress?: () => void;
};

export function Avatar({ name, size = 50 }: { name: string; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#C2E3FF',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: '#002561',
          fontSize: size * 0.4,
          fontWeight: 'bold',
        }}
      >
        {name.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

export default function ChatItem({
  name,
  message,
  isFriend,
  isLove,
  onPress,
}: ChatItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.avatarWrapper}>
        <Avatar name={name} size={50} />
      </View>

      <View style={styles.chatInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{name}</Text>

          {isLove && (
            <View style={styles.loveBadge}>
              <Text style={styles.loveBadgeText}>Love</Text>
            </View>
          )}

          {isFriend && (
            <View style={styles.friendBadge}>
              <Text style={styles.friendBadgeText}>Friend</Text>
            </View>
          )}
        </View>

        <Text style={styles.message} numberOfLines={1}>
          {message}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarWrapper: {
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002561',
  },
  loveBadge: {
    marginLeft: 8,
    backgroundColor: '#FFB6C1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  loveBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#002561',
  },
  friendBadge: {
    marginLeft: 6,
    backgroundColor: '#FFC67C',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  friendBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#002561',
  },
  message: {
    fontSize: 14,
    color: '#666666',
  },
});