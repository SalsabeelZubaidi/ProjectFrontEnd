import React, { useState, memo, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, TouchableOpacity, ToastAndroid  } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { updateProfile } from '../apis/dashboard';
import { getUser } from '../apis/user';
import { useUserInfo } from '../UserContext';

const EditProfile = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage, isRtl } = useLanguage(); 
  const { user, token, setUser} = useUserInfo()

  const [email, setEmail] = useState(user.email);
  const [userName, setUserName] = useState(user.username);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [dob, setDob] = useState(new Date(user.birth_date));
  const [gender, setGender] = useState(user.gender);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const genderOptions = [
    { label: translation('male'), value: 'male' },
    { label: translation('female'), value: 'female' }
  ];




  const [dobToSend, setDobToSend] = useState(new Date());
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

  useEffect(()=>{
  }, [dobToSend])

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const updateUser =async()=>{
    try {
      const result = await updateProfile({
        first_name: firstName,
        last_name: lastName,
        birth_date: dobToSend,
        gender: gender,
        email: email,
        username: userName
      }, token);
      navigation.navigate("Profile");
      const u = await getUser(userName);
      ToastAndroid.show("Profile updated successfully!", ToastAndroid.SHORT);
      setUser(u);
    } catch (err) {
      console.log("!! Caught error in updateUser:", err);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SwitchLanguageBtn switchLanguage={() =>{switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
          <View style={styles.innerContainer}>
            <View style={styles.profileHeader}>
              <FontAwesomeIcon icon={faCircleUser} size={80} color='#6b8a6b' style={styles.profileIcon}/>
              <Text style={{fontFamily:'Poppins_600SemiBold'}}>{user?.username}</Text>
              <Text style={{fontFamily:'Poppins_400Regular' , opacity:.5}}>{user?.email}</Text>
            </View>
            <View>
                <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                value={firstName}
                inputMode="text"
                placeholder={translation('firstName')}
                />
            </View>
            <View>
              <TextInput
              style={styles.input}
              onChangeText={setLastName}
              value={lastName}
              inputMode="text"
              placeholder={translation('lastName')}
              />
            </View>

            <View>
              <View style={styles.inputContainer}>
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
                label:translation('genderPlaceholder'),
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

            <TouchableOpacity style={styles.btn}> 
                <Text style={[styles.btnText, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]} onPress={updateUser}>{translation('updateProfile')}</Text>
              </TouchableOpacity>
            </View>     
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

//const isRtl = I18nManager.isRTL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
    
  },
  innerContainer:{
   marginHorizontal:50 , 
   width:300,
  },

  input: {
    borderBottomWidth:.5,
    padding: 10,
    width: 300,
    borderRadius: 10,
    marginBottom: 25,
    marginTop:5,
    paddingVertical:15,
    fontFamily:'Poppins_400Regular'
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
    fontFamily:'Poppins_400Regular'
  },
  dropdownButtonTxtStyle: {
    color: '#333',
    fontFamily:'Poppins_400Regular'
  },
  dropdownMenuStyle: {
    backgroundColor: '#fff',
    fontFamily:'Poppins_400Regular'
  },
  btn:{
    borderRadius:10,
    backgroundColor:'#6b8a6b',
    paddingVertical:15,
    width:200,
    marginTop:20,
    alignSelf:'center'
  },
  btnText:{
    color:'white',
    textAlign:'center',
  },
  profileIcon:{
    marginBottom:15
  },
  profileHeader:{
    alignItems:'center',
    marginBottom:30,
  }
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
    fontFamily:'Poppins_400Regular'
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
    fontFamily:'Poppins_400Regular'
  },
});

export default memo(EditProfile);
