import React, { useState, useEffect, memo } from 'react';
import 
{ Text, StyleSheet, View,  } from 'react-native';
import LottieView from 'lottie-react-native';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import LogoImage from '../components/LogoImage';





const LoadingScreen = ({ route, navigation }) => {
const { translation } = route.params;
const { language, switchLanguage } = useLanguage(); 

  
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Plan'); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigation]);  
   
  
  return (
    <SafeAreaProvider style={{backgroundColor:'white'}}>
    <View >
    <View>
        <LogoImage/>
        <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
      </View>

    <View style={styles.container} > 
      <View>
         <LottieView style={styles.lottie}
        source={require('../assets/loading.json')}
        autoPlay
        loop
      />
      </View>
      <View>
        <Text style={styles.text}>{translation('loading')}</Text>
      </View>  
    </View>  
    </View>
    </SafeAreaProvider>
      
  );
};

const styles = StyleSheet.create({
  container: {
    top:170,
    alignItems: 'center',
    padding:20,
  },
  lottie:{
    width:230,
    height:230,
    marginBottom:-85
  },
  text:{
    fontFamily:'Poppins_600SemiBold' ,
    fontSize:20,
    width:400 ,
    textAlign:'center',
    padding:30,
    marginBottom:100
  },

});

export default memo(LoadingScreen);
