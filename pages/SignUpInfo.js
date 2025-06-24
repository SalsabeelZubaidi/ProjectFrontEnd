import React, { useState, memo } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import LottieView from 'lottie-react-native';
import LogoImage from '../components/LogoImage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useUserInfo } from '../UserContext';


const SignUpInfo = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage, isRtl } = useLanguage(); 
  const { user } = useUserInfo();

  const [email, setEmail] = useState('');
 
  const QuestionsScreen = () => { 
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
          <View>
            <Text style={[styles.text, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular', fontSize:isRtl?27:22}]}>{translation('welcome')}{translation(' ')}{user?.first_name}{translation('! ')}{translation('helloMsg')}</Text>
          </View>  
        <View style={{ borderRadius: 30, overflow: 'hidden', width:100 , alignSelf:'center'}}>
          <TouchableOpacity onPress={QuestionsScreen}> 
             <FontAwesomeIcon icon={faCircleChevronRight} size={37} style={styles.icon}/>
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
    fontFamily:'Poppins_400Regular',
    backgroundColor:'white'
  },
  lottie:{
    height:300,
  },
  icon:{
    alignSelf:'center',
    color:'#00ddb3',
    opacity:.9,

  
  },
  text:{
    fontSize:20 , 
    textAlign:'center',
    fontFamily:'Poppins_400Regular',
    paddingHorizontal:23,
    paddingBottom:15,
    marginTop:-15,
    

    
  },
  

  
  
});


export default memo(SignUpInfo);
