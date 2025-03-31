import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import SelectDropdown from 'react-native-select-dropdown';
import { I18nManager } from 'react-native';

const SignUp = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage } = useLanguage(); 

  const [type, setType] = useState('login');
  const [email, setEmail] = useState('');
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
      <SafeAreaView style={styles.signup}>

        <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />

        <View style={styles.signupHeader}>
          <Text style={styles.signupTitle}>{translation('signupTitle')}</Text>
          <Text style={styles.signupSubTitle}>{translation('signupSubTitle')}</Text>
        </View>

        <View style={styles.signupTabs}>
          <TouchableOpacity onPress={() => switchType('login')}>
            <View style={styles.signupTabItem}><Text style={ type =="login"?styles.activeTabText :styles.signupTabItem }>{translation('login')}</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => switchType('signup')}>
            <View style={styles.signupTabItem}><Text style={ type =="signup"?styles.activeTabText :styles.signupTabItem }>{translation('signup')}</Text></View>
          </TouchableOpacity>
        </View>

        <View style={styles.signupForm}>
          {type === 'signup' && (
            <View>
              <View>
                <Text style={{fontWeight:'500'}}>{translation('firstName')}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setFirstName}
                  value={firstName}
                  inputMode="text"
                />
              </View>
              <View>
                <Text style={{fontWeight:'500'}}>{translation('lastName')}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setLastName}
                  value={lastName}
                  inputMode="text"
                />
              </View>
            </View>
          )}

          <View>
            <Text style={{fontWeight:'500'}}>{translation('email')}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              inputMode="email"
            />
          </View>

          

          {type === 'login' && (
            <>
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
            
            
            <TouchableOpacity onPress={forgetPassPage} style={{ left: 185, marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold', color: '#4d81e7' }}>
                {translation('forgetPassword')}
              </Text>
            </TouchableOpacity>
            </>
          )}
          

          {type === 'signup' && (
            <>
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

            </>
          )}

          <View style={{ borderRadius: 10, overflow: 'hidden', marginTop: 10 }}>
            <Button
              onPress={accessApp}
              title={translation(type + 'Btn')}
              color="#6b8a6b"
            />
          </View>
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

export default SignUp;
