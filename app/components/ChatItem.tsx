import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export type ChatItemProps = {
  id: number;
  name: string;
  message: string;
  isFriend: boolean;
  onPress?: () => void;
};

// Shared avatar component for consistency across screens
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

export default function ChatItem({ name, message, isFriend, onPress }: ChatItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {/* Profile Picture */}
      <View style={styles.avatarWrapper}>
        <Avatar name={name} size={50} />
      </View>

      {/* Chat Info */}
      <View style={styles.chatInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{name}</Text>
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
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
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
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002561',
  },
  friendBadge: {
    marginLeft: 8,
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
