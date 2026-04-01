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

import { supabase } from "@/services/supabase";

export default function Chats() {
  const navigation = useNavigation<any>();

  const [filter, setFilter] = React.useState<'all' | 'love' | 'friends'>('all');

  // UNTESTED BACKEND INTEGRATION!!
  const [chats, setChats] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchChats = React.useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      // Step 1: get matches involving current user
      const { data: matches, error: matchError } = await supabase
        .from("matches")
        .select("*")
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`);
      if (matchError) throw matchError;

      // step 2: get chats tied to those matches
      const matchIds = matches.map((m) => m.match_id);

      const { data: chatsData, error: chatError } = await supabase
        .from("chat")
        .select("*")
        .in("match_id", matchIds);
      if (chatError) throw chatError;

      // step 3: build UI-friendly objects
      const formattedChats = await Promise.all(
        chatsData.map(async (chat) => {
          const match = matches.find((m) => m.match_id === chat.match_id);

          const otherUserId = 
            match.user1_id === user.id ? match.user2_id : match.user1_id;

          // get other user's profiles
          const { data: profile } = await supabase
            .from("user_profile")
            .select("id, first_name, bio")
            .eq("id", otherUserId)
            .single();

          // get last message
          const { data: messages } = await supabase
            .from("messages")
            .select("*")
            .eq("chat_id", chat.chat_id)
            .order("timestamp", {ascending: false})
            .limit(1);

          return {
            chat_id: chat.chat_id,
            is_friend: chat.is_friend,
            other_user: {
              id: profile?.id,
              name: profile?.first_name,
              quote: profile?.bio,
            },
            last_message: messages?.[0]?.message_content || null,
          };
        })
      );

      setChats(formattedChats);
    }
    catch (error) {
      console.error("failed to fetch chats", error);
    }
    finally {
      setLoading(false);
    }
  }, []);

  // initial fetch  
  React.useEffect(() => {
    fetchChats();
  }, [fetchChats]);

    // realtime updates
  React.useEffect(() => {
    const channel = supabase
      .channel("chat-list")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => {
          fetchChats();
        }
      )
      .subscribe();
    
      return () => {
        supabase.removeChannel(channel);
      };
  }, [fetchChats]);

  // get matches
  // const loveMatches = MOCK_PROFILES.filter((p) =>
  //   MOCK_CURRENT_USER.loveMatchIds?.includes(p.id)
  // );

  // const friendMatches = MOCK_PROFILES.filter((p) =>
  //   MOCK_CURRENT_USER.friendMatchIds?.includes(p.id)
  // );

  // apply filter
  const filteredChats =
    filter === "all"
      ? chats
      : filter === "love"
      ? chats.filter(c => !c.is_friend)
      : chats.filter(c => c.is_friend);

  // const filteredProfiles =
  //   filter === 'all'
  //     ? [...loveMatches, ...friendMatches]
  //     : filter === 'love'
  //     ? loveMatches
  //     : friendMatches;

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
          {filteredChats.length > 0 ? (
            filteredChats.map(chat => (
              <ChatItem
                key={chat.chat_id}
                id={chat.other_user.id}
                name={chat.other_user.name}
                message={chat.last_message || `Start chatting with ${chat.other_user.name}`}
                isLove={!chat.is_friend}
                isFriend={chat.is_friend}
                onPress={() =>
                  navigation.navigate("InsideChat", {
                    chatId: chat.chat_id,
                    userId: chat.other_user.id,
                    name: chat.other_user.name,
                  })
                }
              />
            ))
          ) : ( // if no matches yet, show empty chat view
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No chats yet</Text>
              <Text style={styles.emptyText}>Match with someone to start chatting!</Text>
            </View>
          )}
          {/* {filteredProfiles.length > 0 ? (
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
          )} */}
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