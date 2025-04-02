import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';

const SignUpInfo = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage } = useLanguage(); 

  const [email, setEmail] = useState('');
 
  const QuestionsScreen = () => { ///go to FillInfo screen
     navigation.navigate('QuestionsScreen');
  };

  return (
    <SafeAreaProvider style={{backgroundColor: 'white'}} >
      <SafeAreaView>

        <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />

        <View style={styles.text}>
        <Text style= {{fontSize:20 , textAlign:'center'}}> {translation('welcomeMsg')}</Text>
        </View>


        <View style={{ borderRadius: 10, overflow: 'hidden', marginTop: 16 , width:100 , alignSelf:'center'}}>
          <Button style={styles.btn}
          onPress={QuestionsScreen}
          title={translation('getStartedBtn')}
          color="#6b8a6b"
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  text:{
    marginTop:180
  } , 
  
});


export default SignUpInfo;
