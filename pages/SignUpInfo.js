import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import LottieView from 'lottie-react-native';
import LogoImage from '../components/LogoImage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'


const SignUpInfo = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage } = useLanguage(); 

  const [email, setEmail] = useState('');
 
  const QuestionsScreen = () => { ///go to FillInfo screen
     navigation.navigate('QuestionsScreen');
  };

  return (
    <SafeAreaProvider style={{backgroundColor:'white'}}>
     <LogoImage/>
      <SafeAreaView style={styles.container}>
      <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
          <View style={styles.lottie}>
            <LottieView style={{flex: 1}} source={require('../assets/bubblesBG.json')} autoPlay loop></LottieView>
          </View>
          <View style={styles.text}>
            <Text style= {{fontSize:20 , textAlign:'center',marginBottom:20}}> {translation('welcomeMsg')} </Text>
          </View>  
        <View style={{ borderRadius: 30, overflow: 'hidden', width:100 , alignSelf:'center'}}>
          <TouchableOpacity onPress={QuestionsScreen}> 
             <FontAwesomeIcon icon={faCircleChevronRight} size={39} style={styles.icon}/>
          </TouchableOpacity>
        </View>
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent:'center',
    fontFamily:'Quicksand_600SemiBold'

  },
  lottie:{
    height:300,
    marginTop:0,

  },
  icon:{
    alignSelf:'center',
    color:'#6b8a6b',
  }
  
  
});


export default SignUpInfo;
