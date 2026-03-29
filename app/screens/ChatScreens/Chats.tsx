import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../../components/chatpage/ChatHeader';
import ChatItem from '../../components/chatpage/ChatItem';
import Footer from '../../components/footer';

import { MOCK_CURRENT_USER } from '../../data/MockCurrentUser';
import { MOCK_PROFILES } from '../../data/mockProfiles';

export default function Chats() {
  const navigation = useNavigation<any>();

  const [filter, setFilter] = React.useState<'all' | 'love' | 'friends'>('all');

  // get matches
  const loveMatches = MOCK_PROFILES.filter((p) =>
    MOCK_CURRENT_USER.loveMatchIds?.includes(p.id)
  );

  const friendMatches = MOCK_PROFILES.filter((p) =>
    MOCK_CURRENT_USER.friendMatchIds?.includes(p.id)
  );

  // apply filter
  const filteredProfiles =
    filter === 'all'
      ? [...loveMatches, ...friendMatches]
      : filter === 'love'
      ? loveMatches
      : friendMatches;

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <View style={styles.topSection}>
          <Text style={styles.pageTitle}>Chats</Text>
          <View style={styles.divider} />

          {/*  filter toggle */}
          <View style={styles.filterRow}>
            <TouchableOpacity onPress={() => setFilter('all')}>
              <Text
                style={[
                  styles.filterText,
                  filter === 'all' && styles.activeFilter,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setFilter('love')}>
              <Text
                style={[
                  styles.filterText,
                  filter === 'love' && styles.activeFilter,
                ]}
              >
                Love
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setFilter('friends')}>
              <Text
                style={[
                  styles.filterText,
                  filter === 'friends' && styles.activeFilter,
                ]}
              >
                Friends
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chat list */}
        <ScrollView
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => {
              const isLove =
                MOCK_CURRENT_USER.loveMatchIds?.includes(profile.id);
              const isFriend =
                MOCK_CURRENT_USER.friendMatchIds?.includes(profile.id);

              return (
                <ChatItem
                  key={profile.id}
                  id={profile.id}
                  name={profile.name}
                  message={
                    profile.quote || `Start chatting with ${profile.name}`
                  }
                  isLove={isLove}
                  isFriend={isFriend}
                  onPress={() =>
                    navigation.navigate('InsideChat', {
                      userId: profile.id,
                      name: profile.name,
                    })
                  }
                />
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No chats yet</Text>
              <Text style={styles.emptyText}>
                Match with someone to start chatting
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF1F8',
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10, 
  },

  topSection: {
    marginBottom: 10,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#002561',
  },

  divider: {
    height: 2,
    backgroundColor: '#002561',
    width: '100%',
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 12,
  },

  filterRow: {
    flexDirection: 'row',
    gap: 18,
    marginBottom: 8,
  },

  filterText: {
    fontSize: 15,
    color: '#6B7280',
    paddingBottom: 2,
  },

  activeFilter: {
    color: '#002561',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  chatList: {
    flex: 1,
  },

  chatListContent: {
    paddingBottom: 24,
  },

  emptyState: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#002561',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    color: '#667085',
    textAlign: 'center',
  },
});