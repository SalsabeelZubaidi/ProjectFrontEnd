import React, { useEffect, useState, memo, useRef } from "react";
import {Text, View, TextInput, TouchableOpacity, ScrollView, StyleSheet, } from "react-native";
import LottieView from 'lottie-react-native';
import { sendMessageToChatbot } from "../apis/chatbot";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'


const ChatbotConvo = ({ text, isUser }) => (
  <View
    style={[
      styles.messageContainer,
      isUser ? styles.userMessage : styles.botMessage,
    ]}
  >
    <Text style={styles.messageText}>{text}</Text>
  </View>
);
const ChatbotScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const scrollViewRef = useRef();

  const toHomeScreen = () => {
        navigation.navigate('HomeScreen');
    };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    if (isFirstLoad) {
      setMessages([
        {
          text: "Hi there! I'm Quity, your smoke-free support companion. How can I help you on your journey today?",
          isUser: false,
        },
      ]);
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  const handleSendMessage = async () => {
    if (inputText.trim() === "") {
      return;
    }

    const newUserMessage = { text: inputText, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputText("");
    setIsBotTyping(true); // Indicate the bot is "typing"

    try {
      const botResponseData = await sendMessageToChatbot(inputText);
      const botMessage = { text: String(botResponseData.response), isUser: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Failed to get chatbot response:", error);
      const errorMessage = {
        text: "Sorry, I couldn't connect to the chatbot.",
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsBotTyping(false); // Bot is done "typing"
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={toHomeScreen} style={styles.Xicon}>
        <FontAwesomeIcon icon={faX} size={25} color='black' />
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        style={styles.ScrollView}
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
        bounces={false}
      >
        {messages.map((msg, index) => (
          <ChatbotConvo key={index} text={msg.text} isUser={msg.isUser} />
        ))}

        {isBotTyping && (
          <LottieView
            style={styles.lottie}
            source={require('../assets/botLoading.json')}
            autoPlay
            loop
          />
        )}
      </ScrollView>
      

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          onSubmitEditing={handleSendMessage} // Send message on pressing "Enter" key
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  messageList: {
    flex: 1,
    marginBottom: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: '#E7F0DC',
    alignSelf: "flex-end",
    color:"white",
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
    opacity:.85
  },
  botMessage: {
    backgroundColor: '#E9EFEC',
    alignSelf: "flex-start",
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%"
  },
  
  lottieContainer: {
    backgroundColor: "#E0E0E0",
    alignSelf: "flex-start",
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",

  },
  lottie:{
    height:90,
    width:90
  },
  messageText: {
    fontSize: 17,

  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    marginBottom:15,
    paddingHorizontal:3
    
    
  },
  input: {
    flex: 1,
    borderColor: "grey",
    borderWidth: 1.5,
    borderRadius: 7,
    marginRight: 10,
    fontFamily:'Poppins_400Regular',
    paddingHorizontal:10,
  },
  sendButton: {
    backgroundColor: '#6b8a6b',
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 17,
    paddingVertical:10,
    

  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily:'Poppins_700Bold',
    textAlign:'center'
  },
  ScrollView:{
    bounces:false ,
    padding:1.5,
    marginVertical:3, 
    backgroundColor:'white',
    paddingVertical:3,
  },
  Xicon:{
    marginLeft:368,
    marginTop:-30
  }
});

export default memo(ChatbotScreen);