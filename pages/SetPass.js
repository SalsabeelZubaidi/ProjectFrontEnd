import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity , ToastAndroid } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';

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
    <SafeAreaProvider style={{backgroundColor: 'white'}} >
      <SafeAreaView>

        <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />

        <View style={styles.setPsswrdHeader}>
          <Text style={styles.setPassHeader}>{translation('setPassHeader')}</Text>
          <Text style={styles.setPassSubtitle}>{translation('setPassSubtitle')}</Text>
        </View>

         <View>
            <Text style={{fontWeight:'bold'}}>{translation('password')}</Text>
            <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            inputMode="password"
            secureTextEntry={true}
            placeholder='Enter Your New Password'
            />
            <Text style={{fontWeight:'bold'}}>{translation('confirmPass')}</Text>
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
            <Button
              onPress={wrongPassToast}
              title={translation('updatePassBtn')}
              color="#6b8a6b"
            />
          </View>
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  setPsswrdHeader: {
    marginTop:160,
    backgroundColor: 'white',
    width: '100%',
    fontSize: 11,
    color: 'black',
  },
  
  setPassHeader:{
    fontWeight:'bold',
    fontSize: 25

  },
  setPassSubtitle:{
    color:'#989898',
    marginBottom:25,
    fontSize:13
  },
  input: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    padding: 10,
    width: 370,
    borderRadius: 10,
    marginBottom: 22,
    marginTop:9
  }
});


export default SetPass;
