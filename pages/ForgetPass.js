import React, { useState, memo } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity, ToastAndroid } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import LogoImage from '../components/LogoImage';
import { register, login, getUser, checkEmailExists } from "../apis/user";
import { useUserInfo } from '../UserContext';

const ForgetPass = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage, email, setEmail, isRtl } = useLanguage(); 


  const toSetPassword = async () => {
    if (!email) {
      ToastAndroid.show('Please enter your email.', ToastAndroid.LONG);
      return;
    }

    try {
      const exists = await checkEmailExists(email);

      if (exists) {
        navigation.navigate('SetPass');
      } else {
        ToastAndroid.show('This email is not registered.', ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong.', ToastAndroid.LONG);
      console.log('Error in toSetPassword:', error.response || error.message);
    }
};



  return (
    
    <SafeAreaProvider style={{backgroundColor: 'white', paddingHorizontal:10}} >
    <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
    <LogoImage/>

      <SafeAreaView style={[styles.container ,{ direction: isRtl ? 'rtl' : 'ltr'}]}>
        <View style={styles.forgetPsswrdHeader}>
          <Text style={[styles.passHeader, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}]}>{translation('forgetPassHeader')}</Text>
          <Text style={[styles.passSubtitle, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_500Medium'}] }>{translation('forgetPassSubtitle')}</Text>
        </View>

        <View style={styles.email}>
            <View>
                <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}}>{translation('email')}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                inputMode="email"
                />
            </View>
            
          <View>
            <TouchableOpacity onPress={toSetPassword} style={styles.btn}> 
              <Text style={[styles.btnText, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]}>{translation('resetPassBtn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  container:{
    marginTop:160,
    backgroundColor:'white',
    padding:15, 
    borderRadius:10,
    width:390,
    marginRight:10,
    marginLeft:0,
    
  },
  passHeader: {
    fontSize: 25,
    fontFamily:'Poppins_700Bold',
    marginBottom:5
  },
  passSubtitle: {
    color: '#b4b4b4',
    fontSize: 15
  },
  email:{
    marginTop:30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    padding: 10,
    width: 355,
    borderRadius: 5,
    marginBottom: 10,
    marginTop:9,
    paddingVertical:15,
    fontFamily:'Poppins_600SemiBold'
  },
  
  btn:{
    borderRadius:10,
    backgroundColor:'#6b8a6b',
    padding:10,
    paddingVertical:15,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15, 
    width:360
    
  },
  btnText:{
    color:'white',
    textAlign:'center',
    fontFamily:'Poppins_700Bold'
  }
});


export default memo(ForgetPass);
