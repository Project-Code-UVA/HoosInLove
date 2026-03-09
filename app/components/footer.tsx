import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AccountIcon from './footercomponents/accountIcon';
import ChatIcon from './footercomponents/chatIcon';
import HeartIcon from './footercomponents/heartIcon';

type RootStackParamList = {
  Chats: undefined;
  SwipeHome: undefined;
  ViewProfile: { profile: any | null };
};

export default function Footer() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => {
          navigation.navigate('Chats');
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <ChatIcon height={30.5} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconButton, styles.centerIcon]}
        onPress={() => navigation.navigate('SwipeHome')}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <HeartIcon size={43} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate('ViewProfile', { profile: null })}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <AccountIcon size={22} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 65,
    width: '100%',
    backgroundColor: '#FFC77D',
    borderTopWidth: 1,
    borderTopColor: '#E9E9E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerIcon: {
    marginBottom: 1.5,
  },
});