import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { I18nManager } from 'react-native';

const QuestionsScreen = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage } = useLanguage(); 

 
  const [cigsCount, setCigsCount] = useState('');
  const [cigsCountPerPack, setCigsCountPerPack] = useState('');
  const [packCost, setPackCost] = useState('');
  const [quitTime, setQuitTime] = useState('');
  
  const forgetPassPage = () => {
      //navigation.navigate('ForgetPass');
  };


 
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.signup}>

        <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
      

        <View style={styles.signupForm}>
        
              <View>
                <Text style={{fontWeight:'500'}}>{translation('cigsCount')}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setCigsCount}
                  value={cigsCount}
                  inputMode="decimal"
                />
              </View>
              <View>
                <Text style={{fontWeight:'500'}}>{translation('cigsCountPerPack')}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setCigsCountPerPack}
                  value={cigsCountPerPack}
                  inputMode="decimal"
                />
              </View>
              <View>
                <Text style={{fontWeight:'500'}}>{translation('packCost')}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setPackCost}
                  value={packCost}
                  inputMode="decimal"
                />
                </View>
              <View>
                <Text style={{fontWeight:'500'}}>{translation('quitTime')}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setQuitTime}
                  value={quitTime}
                  inputMode="decimal"
                />
              </View>
            </View>

          <View style={{ borderRadius: 10, overflow: 'hidden', marginTop: 10 }}>
            <Button
              //onPress={accessApp}
              title={'Btn'}
              color="#6b8a6b"
            />
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const isRtl = I18nManager.isRTL;

const styles = StyleSheet.create({
  activeTabText:{
    fontWeight:'900'
  },
  signupTabItem: {
    borderRadius: 5,
    opacity: 0.45
  },

  signup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    fontSize: 11,
    color: 'black',
  },
  signupHeader: {
    textAlign: 'center',
  },
  signupTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupSubTitle: {
    color: '#b4b4b4',
    fontSize: 14,
    textAlign: 'center',
  },
  signupTabs: {
    display: 'flex',
    flexDirection: isRtl ? 'row-reverse' : 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#f5f6f9',
    fontWeight: 'bold',
    marginTop: 3,
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 15,
    gap: 80,
    paddingLeft: 70,
    paddingRight: 70,
    height: 'fit-content',
  },
 
  signupForm: {
    marginTop: 4
  },

  input: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    padding: 10,
    width: 300,
    borderRadius: 10,
    marginBottom: 10,
    marginTop:9,
    textAlign: isRtl ? 'right' : 'left',
  },
  inputContainer: {
    marginBottom: 10,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownButtonStyle: {
    width: 250,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  dropdownButtonTxtStyle: {
    color: '#333',
  },
  dropdownMenuStyle: {
    backgroundColor: '#fff',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
});

export default QuestionsScreen;
