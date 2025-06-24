import React, { useState, useEffect, memo} from 'react';
import 
{ Text, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import LogoImage from '../components/LogoImage';





const LoadingScreen = ({ route, navigation }) => {
const { translation } = route.params;
const { language, switchLanguage , isRtl} = useLanguage(); 


  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Plan'); 
    }, 4000);

    return () => clearTimeout(timer); 
  }, [navigation]);  
   
  
  return (
    <SafeAreaProvider style={{backgroundColor:'white'}}>
      <View>
          <LogoImage/>
          <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
      </View>
      
        <View style={styles.container} >
          <LottieView style={styles.lottie}
          source={require('../assets/lungsLoading.json')}
          autoPlay
          loop
        />
        </View>
        <View>
          <Text style={[styles.text, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]}>{translation('loading')}</Text>
        </View>  

        
    </SafeAreaProvider>
      
  );
};

const styles = StyleSheet.create({
  container: {
    top:200,
    alignItems: 'center',
    padding:20,
   
    
  },
  lottie:{
    width:300,
    height:250,
    marginBottom:-85,
    position:'absolute',
    alignSelf:'center',
    opacity:.7
  },
  text:{
    fontFamily:'Poppins_400Regular' ,
    fontSize:24,
    textAlign:'center',
    padding:30,
    marginTop:430,
    color: '#6b8a6b',
    marginHorizontal:20,
    paddingVertical:15
  },
  container2: {
    
  },
 
});

export default memo(LoadingScreen);
