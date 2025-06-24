import React, { useState, memo, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import SelectDropdown from 'react-native-select-dropdown';
import LogoImage from '../components/LogoImage';
import { register, login, getUser } from "../apis/user";
import { useUserInfo } from '../UserContext';
import { achievementAndBadges, dashboard, getSmokingHabits, getSmokingLogs, getSmokingStreak, getTotalCigarettes, getUserProgress, getUserProgressv2, getWeeklySmokingLogs, quittingPlan, smokingHabits, smokingLogs } from '../apis/dashboard';

const SignUp = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, isRtl, switchLanguage } = useLanguage();
  const { 
    setUser, 
    setToken, 
    setSmokingHabits, 
    setSelectedPlan, 
    mood, 
    setMood, 
    userProgress, 
    setUserProgress, 
    streak, 
    setStreak,
    weeklySmokingMood,
    setWeeklySmokingMood,
    totalCigs,
    setTotalCigs,
    setLevelScore
  } = useUserInfo();

  const [type, setType] = useState('login');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [dobToSend, setDobToSend] = useState(new Date());
  const [gender, setGender] = useState(' ');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [error, setError] = useState();
  const genderOptions = [
    { label: translation('male'), value: 'male' },
    { label: translation('female'), value: 'female' }
  ];
  

  const switchType = (newType) => {
    setType(newType);
  };
  const isPasswordValid = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(pwd);
  }
  
  const accessApp = async () => {
    if (type == "signup") {
      if (!isPasswordValid(password)) {
        ToastAndroid.show("Password must be at least 8 characters long, include an uppercase letter and a number.", ToastAndroid.LONG);
      return;
      }
      const res = await register({
        username: userName,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        birth_date: dobToSend,
      });
      if (res.message === "User registered successfully!") {
        const u = await getUser(userName);
        setUser(u);
        navigation.navigate("SignUpInfo");
        setToken(res.token)
      } else {
        ToastAndroid.show(res.error , ToastAndroid.LONG);
      }
    } else if (type == "login") {
      const res = await login({
        email_or_username: userName,
        password: password,
      });
      if (res.message === "Logged in successfully!") {
        const resDashboard = await dashboard(res.token)
        setLevelScore({
          level: resDashboard.profile.level,
          score: resDashboard.profile.xp,
        })
        const u = await getUser(userName);
        navigation.navigate("HomeScreen");
        setUser(u);
        setUserProgress(resDashboard?.progress)
        setStreak(resDashboard?.streak_days);
        setSelectedPlan(resDashboard?.quitting_plan)
        setSmokingHabits(resDashboard?.smoking_habits)
        setToken(res.token)
        console.log("res.token", res.token)
        const resWeeklyLog = await getWeeklySmokingLogs(res.token);
        const resTotalCigs  = await getTotalCigarettes(res.token);
        setTotalCigs(resTotalCigs)
        setWeeklySmokingMood(resWeeklyLog);
      } else {
        setError(res.error)
        //fix the toast 
        ToastAndroid.show(res.error, ToastAndroid.LONG);
      }
    }
  };

  const forgetPassPage = () => {
      navigation.navigate('ForgetPass');
  };

  useEffect(()=>{
    handleDateChange();
  },[])


  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    
    // Extract just the date portion (YYYY-MM-DD)
    const dateOnly = currentDate.toISOString().split('T')[0];
    
    // Format as DD/MM/YYYY
    const formatted_date = `${dateOnly.split('-')[0]}-${dateOnly.split('-')[1]}-${dateOnly.split('-')[2]}`;    
    setDob(currentDate);
    setDobToSend(formatted_date);
    setIsDatePickerVisible(false);
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SwitchLanguageBtn switchLanguage={() =>{switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
        <LogoImage/>

        <View style={styles.screenContainer}>
          <View style={styles.signupHeader}>
            <Text style={[styles.signupTitle, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}]}>{translation('signupTitle')}</Text>
            <Text style={[styles.signupSubTitle, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_500Medium'}]}>{translation('signupSubTitle')}</Text>
          </View>

          <View style={[styles.signupTabs, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity onPress={() => switchType('login')}>
              <View style={styles.inactiveTabText}><Text style={[type =="login"?styles.activeTabText :styles.inactiveTabText ,{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]}>{translation('login')}</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switchType('signup')}>
              <View style={styles.inactiveTabText}><Text style={ [type =="signup"?styles.activeTabText :styles.inactiveTabText , {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', }]}>{translation('signup')}</Text></View>
            </TouchableOpacity>
          </View>


          <View style={{ flex: 1}}>
          <ScrollView style={{marginBottom:5 , height:180, minHeight:280 }}>
              <View style={styles.signupForm}>
            {type === 'signup' && (
                  <View>
                    <View style={[styles.names, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
                      <View>
                        <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', direction: isRtl ? 'rtl' : 'ltr'}}>{translation('firstName')}</Text>
                        <TextInput
                          style={styles.namesInput}
                          onChangeText={setFirstName}
                          value={firstName}
                          inputMode="text"
                        />
                      </View>
                      <View>
                        <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', direction: isRtl ? 'rtl' : 'ltr', direction: isRtl ? 'rtl' : 'ltr'}}>{translation('lastName')}</Text>
                        <TextInput
                          style={styles.namesInput}
                          onChangeText={setLastName}
                          value={lastName}
                          inputMode="text"
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', direction: isRtl ? 'rtl' : 'ltr', direction: isRtl ? 'rtl' : 'ltr'}}>{translation('userName')}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={setUserName}
                        value={userName}
                        inputMode="text"
                      />
                    </View>
                    <View>
                      <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', direction: isRtl ? 'rtl' : 'ltr', direction: isRtl ? 'rtl' : 'ltr'}}>{translation('email')}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        inputMode="email"
                      />
                    </View>
                    <View>
                      <View style={styles.inputContainer}>
                    <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', direction: isRtl ? 'rtl' : 'ltr', direction: isRtl ? 'rtl' : 'ltr'}}>{translation('dob')}</Text>
                        <TouchableOpacity onPress={showDatePicker}>
                          <View style={styles.input}>
                            <Text style={{direction: isRtl ? 'rtl' : 'ltr'}}>{dob.toLocaleDateString()}</Text>
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
                      <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', direction: isRtl ? 'rtl' : 'ltr', direction: isRtl ? 'rtl' : 'ltr' }}>{translation('password')}</Text>
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
                  <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', direction: isRtl ? 'rtl' : 'ltr', direction: isRtl ? 'rtl' : 'ltr' }}>{translation('userNameOrEmail')}</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setUserName}
                    value={userName}
                    inputMode="text"
                  />
                </View>
                <View>
                  <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', direction: isRtl ? 'rtl' : 'ltr', direction: isRtl ? 'rtl' : 'ltr' }}>{translation('password')}</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    inputMode="password"
                    secureTextEntry={true}
                  />
                </View>

              
              <TouchableOpacity onPress={forgetPassPage} style={{  marginBottom: 10, marginTop:10 }}>
                <Text style={{ alignSelf: isRtl?'flex-start':'flex-end', fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', direction: isRtl ? 'rtl' : 'ltr', color: '#4d81e7'}}>
                  {translation('forgetPassword')}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

            <View style={{ borderRadius: 10, overflow: 'hidden'}}>
            <TouchableOpacity onPress={accessApp} style={styles.btn}>
                <Text style={[styles.btnText, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', direction: isRtl ? 'rtl' : 'ltr'}]}>{translation(type + 'Btn')}</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


const isRtl= false;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  
  },
  screenContainer:{
    marginTop:210,
    
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
    margin:3,
    marginVertical:5
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
    width:300,
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
