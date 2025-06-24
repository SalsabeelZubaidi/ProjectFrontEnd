import React, { useState, memo } from 'react';
import { Text, TextInput, StyleSheet, View, TouchableOpacity , ToastAndroid } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import LogoImage from '../components/LogoImage';
import { forgotPassword } from '../apis/user';


const SetPass = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage, email , isRtl} = useLanguage(); 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');





  
  const wrongPassToast = async() => {
    if((password == '' || confirmPassword == '') ){
    ToastAndroid.show('Password Cannot Be Null', ToastAndroid.LONG);
    } else if((password != confirmPassword) ){
      ToastAndroid.show('Passwords Do Not Match!', ToastAndroid.LONG);
    }else {
      const res = await forgotPassword({email: email, new_password: password});
      if(res.message === 'Password updated successfully!'){
        ToastAndroid.show(res.message, ToastAndroid.LONG);
        LoginScreen();
      } else {
        ToastAndroid.show(res.message, ToastAndroid.LONG);
      }
    }
  }

  const LoginScreen = () => {
     navigation.navigate('SignUp');
  };

  return (
    <SafeAreaProvider style={{backgroundColor: 'white', paddingHorizontal:10}} >
     <SwitchLanguageBtn style={{marginTop:50}} switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
      <LogoImage/>
      <SafeAreaView style={[styles.container,{ direction: isRtl ? 'rtl' : 'ltr'}]}> 
        <View style={styles.setPsswrdcontainer}>
          <Text style={[styles.setPassHeader, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}]}>{translation('setPassHeader')}</Text>
          <Text style={[styles.setPassSubtitle, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_500Medium'}]}>{translation('setPassSubtitle')}</Text>
        </View>

         <View>
            <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}}>{translation('password')}</Text>
            <TextInput
            style={[styles.input,  {direction: isRtl ? 'rtl' : 'ltr'}]}
            onChangeText={setPassword}
            value={password}
            inputMode="password"
            secureTextEntry={true}
            placeholder={translation('enterPassword')}
            />
            <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}}>{translation('confirmPass')}</Text>
            <TextInput
            style={[styles.input,  {direction: isRtl ? 'right' : 'left'}]}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            inputMode="password"
            secureTextEntry={true}
            placeholder={translation('reEnterPassword')}
            />
        </View>  
                            
            
          <View style={{ borderRadius: 10, overflow: 'hidden', marginTop: 16}}>
            <TouchableOpacity onPress={wrongPassToast} style={styles.btn}> 
              <Text style={[styles.btnText, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]}>{translation('updatePassBtn')}</Text>
            </TouchableOpacity>
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

  setPsswrdcontainer: {  
    width: '100%',
    fontSize: 11,
    color: 'black',
  },
  setPassHeader:{
    fontFamily:'Poppins_700Bold',
    fontSize: 25
  },
  setPassSubtitle:{
    color:'#989898',
    marginBottom:25,
    fontSize:14,
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    padding: 10,
    width: 370,
    borderRadius: 10,
    marginBottom: 22,
    marginTop:9,
    paddingVertical:15,
  },
  btnView:{
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15, 
    width:360
  },
  btn:{
    borderRadius:10,
    backgroundColor:'#6b8a6b',
    padding:10,
    paddingVertical:15
    
  },
  btnText:{
    color:'white',
    textAlign:'center',
    fontFamily:'Poppins_700Bold'
  },
  languegeBtn:{
    marginTop:100
  }
});


export default memo(SetPass);
