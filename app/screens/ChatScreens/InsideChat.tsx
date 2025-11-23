import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Avatar } from "../../components/ChatItem";
import Footer from "../../components/footer";

interface Message {
  id: number;
  text: string;
  isSent: boolean;
}

export default function InsideChat() {
  const route = useRoute();
  const navigation = useNavigation();

  // Get the name passed from Chats screen (default to "User" if not provided)
  const { name = "User" } = (route.params as { name?: string }) || {};

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi, How are you?", isSent: false },
    { id: 2, text: "Hi, How are you?", isSent: true },
    { id: 3, text: "Hi, How are you?", isSent: false },
    { id: 4, text: "Hi, How are you?", isSent: true },
    { id: 5, text: "Hi, How are you?", isSent: false },
    { id: 6, text: "Hi, How are you?", isSent: true },
  ]);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageInput,
        isSent: true,
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessageBubble = (message: Message) => {
    if (message.isSent) {
      return (
        <View key={message.id} style={styles.sentMessageContainer}>
          <View style={styles.sentBubble}>
            <Text style={styles.messageText}>{message.text}</Text>
            <Svg
              width="23"
              height="18"
              viewBox="0 0 23 18"
              style={styles.sentTail}
            >
              <Path
                d="M0 0C12.7025 0 23 8.05888 23 18H0V0Z"
                fill="#c1e2ff"
              />
            </Svg>
          </View>
        </View>
      );
    } else {
      return (
        <View key={message.id} style={styles.receivedMessageContainer}>
          <View style={styles.receivedBubble}>
            <Svg
              width="23"
              height="20"
              viewBox="0 0 23 20"
              style={styles.receivedTail}
            >
              <Path
                d="M23 0C10.2975 0 0 9.04305 0 20.1538H23V0Z"
                fill="#d9d9d9"
              />
            </Svg>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backButton}>{'<'}</Text>
            </TouchableOpacity>
            <Avatar name={name} size={50} />
            <Text style={styles.headerName}>{name}</Text>
          </View>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportText}>Report An Issue</Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <Text style={styles.timestamp}>Yesterday 9:21 AM</Text>
          {messages.map((message) => renderMessageBubble(message))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={messageInput}
              onChangeText={setMessageInput}
              placeholder="Type a message"
              placeholderTextColor="#8d8d8d"
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
            />
            <TouchableOpacity onPress={handleSendMessage}>
              <Text style={styles.sendButton}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Svg width="40" height="31" viewBox="0 0 40 31">
            <Path
              d="M8.5 0C3.80558 0 0 3.80558 0 8.5V22.5C0 27.1944 3.80558 31 8.5 31H31.5C36.1944 31 40 27.1944 40 22.5V8.5C40 3.80558 36.1944 0 31.5 0H8.5Z"
              fill="#ffc67c"
            />
          </Svg>
        </TouchableOpacity>

        <View style={styles.favoritesContainer}>
          <Svg width="41" height="32" viewBox="0 0 41 32">
            <Path d="M0 0L20.5 32L41 0H0Z" fill="#ffc67c" />
          </Svg>
        </View>

        <TouchableOpacity style={styles.footerButton}>
          <Svg width="30" height="30" viewBox="0 0 30 30">
            <Path
              d="M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0Z"
              fill="#ffc67c"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#ffc67c",
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    fontSize: 24,
    color: "#002561",
    fontWeight: "bold",
    marginRight: 12,
  },
  headerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#002561",
    marginLeft: 10,
  },
  reportButton: {
    paddingVertical: 4,
  },
  reportText: {
    fontFamily: "Faustina",
    fontWeight: "700",
    color: "#a6a6a6",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  keyboardAvoid: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  timestamp: {
    fontFamily: "Faustina",
    fontSize: 14,
    color: "#002561",
    textAlign: "center",
    marginBottom: 20,
  },
  receivedMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  receivedBubble: {
    backgroundColor: "#d9d9d9",
    borderRadius: 46,
    paddingVertical: 8,
    paddingHorizontal: 21,
    maxWidth: "70%",
    position: "relative",
  },
  receivedTail: {
    position: "absolute",
    left: -9,
    bottom: -1,
  },
  sentMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  sentBubble: {
    backgroundColor: "#c1e2ff",
    borderRadius: 46,
    paddingVertical: 8,
    paddingHorizontal: 21,
    maxWidth: "70%",
    position: "relative",
  },
  sentTail: {
    position: "absolute",
    right: -9,
    bottom: -1,
  },
  messageText: {
    fontFamily: "Faustina",
    fontSize: 17,
    color: "#002561",
    letterSpacing: -0.43,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  inputWrapper: {
    backgroundColor: "#eaeaea",
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontFamily: "Faustina",
    fontSize: 17,
    color: "#002561",
    letterSpacing: -0.43,
  },
  sendButton: {
    fontFamily: "Faustina",
    fontSize: 17,
    color: "#8d8d8d",
    letterSpacing: -0.43,
    marginLeft: 12,
  },
  footer: {
    backgroundColor: "#ffc67c",
    borderTopWidth: 1,
    borderTopColor: "#d9d9d9",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
  },
  footerButton: {
    padding: 8,
  },
  favoritesContainer: {
    padding: 8,
  },
});
