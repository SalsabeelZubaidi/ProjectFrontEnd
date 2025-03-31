import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';

const ForgetPass = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage } = useLanguage(); 

  const [email, setEmail] = useState('');
 
  const setPasswordPage = () => {
     navigation.navigate('SetPass');
  };

  return (
    <SafeAreaProvider style={{backgroundColor: 'white'}} >
      <SafeAreaView>

        <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />

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
            
          <View style={{ borderRadius: 10, overflow: 'hidden', marginTop: 15  }}>
            <Button
              onPress={setPasswordPage}
              title={translation('resetPassBtn')}
              color="#6b8a6b"
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  forgetPsswrdHeader: {
    marginTop:160,
  },
  passHeader: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  passSubtitle: {
    color: '#b4b4b4',
    fontSize: 12
  },
  email:{
    marginTop:30
  },
  input: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    padding: 10,
    width: 370,
    borderRadius: 5,
    marginBottom: 10,
    marginTop:9
  },
});


export default ForgetPass;
