import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatItem, { ChatItemProps } from '../../components/ChatItem';
import Header from '../../components/header';
import Footer from '../../components/footer';

const chatData: ChatItemProps[] = [
  {
    id: 1,
    name: 'Name #1',
    message: 'Hey cutie, how are you doing?',
    isFriend: false,
  },
  {
    id: 2,
    name: 'Name #2',
    message: 'A very normal conversation',
    isFriend: false,
  },
  {
    id: 3,
    name: 'Name #3',
    message: 'A very normal conversation',
    isFriend: true,
  },
  {
    id: 4,
    name: 'Name #4',
    message: 'A very normal conversation',
    isFriend: false,
  },
  {
    id: 5,
    name: 'Name #5',
    message: 'A very normal conversation',
    isFriend: true,
  },
  {
    id: 6,
    name: 'Name #6',
    message: 'A very normal conversation',
    isFriend: false,
  },
];

export default function Chats() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title Row */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Chats</Text>
          <Text style={styles.filterText}>Filter friends</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Chat List */}
        <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
          {chatData.map((chat) => (
            <ChatItem
              key={chat.id}
              {...chat}
              onPress={() => (navigation as any).navigate('InsideChat', { name: chat.name })}
            />
          ))}
        </ScrollView>
      </View>

      {/* Footer */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000000',
  },
  filterText: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.43)',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 16,
  },
  chatList: {
    flex: 1,
  },
});
