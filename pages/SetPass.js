import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity , ToastAndroid } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import LogoImage from '../components/LogoImage';

const SetPass = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage } = useLanguage(); 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  
const wrongPassToast = () => {
  if((password == '' || confirmPassword == '') ){
  ToastAndroid.show('Password Cannot Be Null', ToastAndroid.LONG);
  } else if((password != confirmPassword) ){
    ToastAndroid.show('Passwords Do Not Match!', ToastAndroid.LONG);
  }else {
    LoginScreen();
  }
}

  const LoginScreen = () => {
     navigation.navigate('SignUp');
  };

  return (
    <SafeAreaProvider style={{backgroundColor: 'white', paddingHorizontal:10}} >
     <SwitchLanguageBtn style={{marginTop:50}} switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
      <LogoImage/>
      <SafeAreaView style={styles.container}> 
        <View style={styles.setPsswrdcontainer}>
          <Text style={styles.setPassHeader}>{translation('setPassHeader')}</Text>
          <Text style={styles.setPassSubtitle}>{translation('setPassSubtitle')}</Text>
        </View>

         <View>
            <Text style={{fontFamily:'Poppins_600SemiBold'}}>{translation('password')}</Text>
            <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            inputMode="password"
            secureTextEntry={true}
            placeholder='Enter Your New Password'
            />
            <Text style={{fontFamily:'Poppins_600SemiBold'}}>{translation('confirmPass')}</Text>
            <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            inputMode="password"
            secureTextEntry={true}
            placeholder='Re-enter Password'
            />
        </View>  
                            
            
          <View style={{ borderRadius: 10, overflow: 'hidden', marginTop: 16}}>
            <TouchableOpacity onPress={wrongPassToast} style={styles.btn}> 
              <Text style={styles.btnText}>{translation('updatePassBtn')}</Text>
            </TouchableOpacity>
          </View>
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({

  container:{
    marginTop:200,
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


export default SetPass;
