import React, { useState, useEffect, memo } from 'react';
import 
{ Text, TextInput, StyleSheet, View, Button, TouchableOpacity, Animated, useWindowDimensions, ScrollView,useAnimatedValue,ImageBackground, Dimensions  } 
from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { useLanguage } from '../LanguageContext';

const ChatbotConvo = ({ route, navigation }) => {
    const { translation } = route.params;
    const { language, switchLanguage } = useLanguage(); 

    // const toHomeScreen = () => {
    //     navigation.navigate('HomeScreen');
    // }; 

    return (
        
        <SafeAreaProvider style={{backgroundColor:'white'}}>
            <SafeAreaView style={styles.container}>  
               <Text>chatbot chat will be here</Text>
             </SafeAreaView>
        </SafeAreaProvider>    
    );
    };

    const styles = StyleSheet.create({
    container: {
        marginTop:50,
        alignItems: 'center',
        backgroundColor:'white',
        
    },
    
    });



export default memo(ChatbotConvo);
