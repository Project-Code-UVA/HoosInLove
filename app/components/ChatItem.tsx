import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export type ChatItemProps = {
  id: number;
  name: string;
  message: string;
  isFriend: boolean;
  onPress?: () => void;
};

export default function ChatItem({ name, message, isFriend, onPress }: ChatItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {/* Profile Picture Placeholder */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name.charAt(0)}</Text>
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#C2E3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#002561',
    fontSize: 20,
    fontWeight: 'bold',
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
