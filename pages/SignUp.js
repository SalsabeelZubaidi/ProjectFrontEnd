import React, { useState, memo } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import SelectDropdown from 'react-native-select-dropdown';
import { I18nManager } from 'react-native';
import LogoImage from '../components/LogoImage';

const SignUp = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage } = useLanguage(); 

  const [type, setType] = useState('login');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState(' ');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const genderOptions = [
    { label: translation('male'), value: 'male' },
    { label: translation('female'), value: 'female' }
  ];

  const switchType = (newType) => {
    setType(newType);
  };

  const accessApp = () => {
    if (type === 'signup') {
      navigation.navigate('SignUpInfo');
    }
    else if (type === 'login') {
      navigation.navigate('HomeScreen');
    }
  };

  const forgetPassPage = () => {
      navigation.navigate('ForgetPass');
  };


  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setDob(currentDate);
    setIsDatePickerVisible(false);
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
        <LogoImage/>

        <View style={styles.screenContainer}>
          <View style={styles.signupHeader}>
            <Text style={styles.signupTitle}>{translation('signupTitle')}</Text>
            <Text style={styles.signupSubTitle}>{translation('signupSubTitle')}</Text>
          </View>

          <View style={styles.signupTabs}>
            <TouchableOpacity onPress={() => switchType('login')}>
              <View style={styles.inactiveTabText}><Text style={ type =="login"?styles.activeTabText :styles.inactiveTabText }>{translation('login')}</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switchType('signup')}>
              <View style={styles.inactiveTabText}><Text style={ type =="signup"?styles.activeTabText :styles.inactiveTabText }>{translation('signup')}</Text></View>
            </TouchableOpacity>
          </View>


          <View style={{ flex: 1}}>
          <ScrollView style={{marginBottom:5 , height:180, minHeight:250 }}>
          <View style={styles.signupForm}>
            {type === 'signup' && (
              <View>
                <View style={styles.names}>
                <View>
                  <Text style={{fontWeight:'500'}}>{translation('firstName')}</Text>
                  <TextInput
                    style={styles.namesInput}
                    onChangeText={setFirstName}
                    value={firstName}
                    inputMode="text"
                  />
                </View>
                <View>
                  <Text style={{fontWeight:'500'}}>{translation('lastName')}</Text>
                  <TextInput
                    style={styles.namesInput}
                    onChangeText={setLastName}
                    value={lastName}
                    inputMode="text"
                  />
                </View>
                </View>
                <View>
              <Text style={{fontWeight:'500'}}>{translation('userName')}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setUserName}
                value={userName}
                inputMode="text"
              />
              </View>
                <View>
              <Text style={{fontWeight:'500'}}>{translation('email')}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                inputMode="email"
              />
            </View>
                <View>
                  <View style={styles.inputContainer}>
                    <Text style={{fontWeight:'500'}}>{translation('dob')}</Text>
                    <TouchableOpacity onPress={showDatePicker}>
                      <View style={styles.input}>
                        <Text>{dob.toLocaleDateString()}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  {isDatePickerVisible && (
                    <DateTimePicker
                      value={dob}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                      minimumDate={new Date(1900, 0, 1)}
                      maximumDate={new Date()}
                      placeholder="d/M/y"
                    />
                  )}
                </View>

                <View>
                  <RNPickerSelect
                    placeholder={{
                      label: translation('genderPlaceholder'),
                      value: null,
                    }}
                    items={genderOptions}
                    onValueChange={setGender}
                    value={gender}
                    style={pickerSelectStyles}
                  />
                </View>

                <View style={styles.dropdownContainer}>
                  <SelectDropdown
                    data={genderOptions}
                    onSelect={setGender}
                    buttonTextAfterSelection={(selectedItem) => selectedItem.title}
                    rowTextForSelection={(item) => item.title}
                    buttonStyle={styles.dropdownButtonStyle}
                    buttonTextStyle={styles.dropdownButtonTxtStyle}
                    dropdownStyle={styles.dropdownMenuStyle}
                    renderDropdownIcon={() => <Text>▼</Text>}
                    renderButtonText={(selectedItem) => {
                      return selectedItem ? selectedItem.title : translation('genderPlaceholder');
                    }}
                  />
                </View>

                <View>
              <Text style={{fontWeight:'500'}}>{translation('password')}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                inputMode="password"
                secureTextEntry={true}
              />
            </View>
            
              </View>
            )}
          </View> 
          </ScrollView>
          </View>
            
          <View style={styles.loginForm}>  
            {type === 'login' && (
              <>
              <View>
              <Text style={{fontWeight:'500'}}>{translation('userName')}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setUserName}
                value={userName}
                inputMode="text"
              />
              </View>
              <View>
              <Text style={{fontWeight:'500'}}>{translation('password')}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                inputMode="password"
                secureTextEntry={true}
              />
            </View>
              
              
              <TouchableOpacity onPress={forgetPassPage} style={{ left: 185, marginBottom: 10, marginTop:10 }}>
                <Text style={{ fontFamily:'Poppins_600SemiBold', color: '#4d81e7', marginLeft:-10 }}>
                  {translation('forgetPassword')}
                </Text>
              </TouchableOpacity>
              </>
            )}
            </View>

            <View style={{ borderRadius: 10, overflow: 'hidden'}}>
              <TouchableOpacity onPress={accessApp} style={styles.btn}> 
                <Text style={styles.btnText}>{translation(type + 'Btn')}</Text>
              </TouchableOpacity>
            </View>
          
       </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const isRtl = I18nManager.isRTL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  screenContainer:{
    marginTop:210
  },
  signupHeader: {
    textAlign: 'center',
    fontFamily:'Poppins_700Bold'
  },
  signupTitle: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily:'Poppins_700Bold'
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
    backgroundColor: '#EEEEEE',
    marginTop: 3,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    gap: 80,
    paddingLeft: 50,
    paddingRight: 50,
    height: 'fit-content',
    width:315,
    marginLeft:13
  },
  activeTabText:{
    borderRadius: 5,
    color:'black',
    fontFamily:'Poppins_600SemiBold'
  },
  inactiveTabText: {
    borderRadius: 5,
    opacity: 0.4,
    fontFamily:'Poppins_600SemiBold'
  },
  signupForm: {
    margin:20,
    marginTop:35
  },
  names:{
    flex:1,
    flexDirection:'row'
  },
  loginForm:{
    margin:20,
    marginTop:35,
    marginBottom:5 , height:180, minHeight:250
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbdddf',
    padding: 10,
    width: 300,
    borderRadius: 10,
    marginBottom: 7,
    marginTop:5,
    textAlign: isRtl ? 'right' : 'left',
    paddingVertical:15,
  },
  namesInput:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dbdddf',
    marginBottom: 7,
    marginTop:5,
    textAlign: isRtl ? 'right' : 'left',
    paddingVertical:15,
    width:146,
    justifyContent:'space-evenly',
    margin:3
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
  btn:{
    borderRadius:10,
    backgroundColor:'#6b8a6b',
    paddingVertical:15,
    marginBottom:230,
    width:315,
    marginLeft:20,
    marginTop:20
  },
  btnText:{
    color:'white',
    textAlign:'center',
    fontFamily:'Poppins_700Bold'
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

export default memo(SignUp);
