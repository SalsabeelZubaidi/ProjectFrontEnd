import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import LogoImage from '../components/LogoImage';

const ForgetPass = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage } = useLanguage(); 

  const [email, setEmail] = useState('');
 
  const setPasswordPage = () => {
     navigation.navigate('SetPass');
  };

  return (
    
    <SafeAreaProvider style={{backgroundColor: 'white', paddingHorizontal:10}} >
    <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
    <LogoImage/>

      <SafeAreaView style={styles.container}>
        <View style={styles.forgetPsswrdHeader}>
          <Text style={styles.passHeader}>{translation('forgetPassHeader')}</Text>
          <Text style={styles.passSubtitle}>{translation('forgetPassSubtitle')}</Text>
        </View>

        <View style={styles.email}>
            <View>
                <Text>{translation('email')}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                inputMode="email"
                />
            </View>
            
          <View style={styles.btnView}>
            <TouchableOpacity onPress={setPasswordPage} style={styles.btn}> 
              <Text style={styles.btnText}>{translation('resetPassBtn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  container:{
    marginTop:230,
    backgroundColor:'white',
    padding:15, 
    borderRadius:10,
    width:390,
    marginRight:10,
    marginLeft:0,
    
  },
  passHeader: {
    fontSize: 25,
    fontFamily:'Poppins_700Bold'
  },
  passSubtitle: {
    color: '#b4b4b4',
    fontSize: 15
  },
  email:{
    marginTop:30
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
  }
});


export default ForgetPass;
