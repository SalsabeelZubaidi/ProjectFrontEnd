import React, { useState, memo, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { updateProfile } from '../apis/dashboard';
import { getUser } from '../apis/user';
import { useUserInfo } from '../UserContext';


const FormerSmokingData = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage, isRtl } = useLanguage(); 
  const { user, token, setUser,selectedPlan, smokingHabits} = useUserInfo()

  const [type, setType] = useState('login');
  const [email, setEmail] = useState(user.email);
  const [userName, setUserName] = useState(user.username);

  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [dob, setDob] = useState(new Date(user.birth_date));
  const [gender, setGender] = useState(user.gender);
  const currentSmokingPlan = selectedPlan?.[0]?.plan_type || selectedPlan?.plan_type || "";
  const [triggers, setTriggers] = useState([]);
  const [numberOfCigs, setNumberOfCigs] = useState("");
  const [yearsSmoking, setYearsSmoking] = useState("");

  useEffect(()=>{
    setTriggers(smokingHabits?.triggers);
    setNumberOfCigs(smokingHabits?.cigs_per_day);
    setYearsSmoking(smokingHabits?.years_of_smoking);
  }, [smokingHabits])



 
  const forgetPassPage = () => {
      navigation.navigate('ForgetPass');
  };


  
  const updateUser =async()=>{
    try {
      
      const result = await updateProfile({
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        email: email,
        username: userName
      }, token);
      navigation.navigate("Profile");
      const u = await getUser(userName);
      setUser(u);
    } catch (err) {
      console.log("🔥 Caught error in updateUser:", err);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SwitchLanguageBtn switchLanguage={() =>{switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
          <View style={[styles.innerContainer, {direction: isRtl ? 'rtl' : 'ltr'}]}>
            <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', fontSize:22,  marginBottom:5 , paddingLeft:10, borderColor:"grey"}}>🎯 {translation('formerSmokingData')}</Text>
            <View style={styles.infoForm}>
                <View style={styles.infoCard}>
                    <Text style={[styles.txt , {color:"#d32f2f",fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('cigsSmokedPerDay')}</Text>
                    <Text style={styles.subText}>{numberOfCigs}</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={[styles.txt , {color: "#f9a825", fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('smokingTriggers')}</Text>
                    {triggers?.map((t, index)=>(
                      <Text style={styles.subText} key={index}>{t}</Text>
                    ))}
                </View>
                <View style={styles.infoCard}>
                    <Text style={[styles.txt , {color: "#1976d2", fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('yearsOfSmoking')}</Text>
                    <Text style={styles.subText}>{yearsSmoking}</Text>
                </View>
            </View>
        </View>    

      </SafeAreaView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
    
  },
  innerContainer:{
   marginHorizontal:3, 
   //width:300,
    marginTop:-200

  
  },

  
  profileIcon:{
    marginBottom:15
  },
  subHeader:{
    marginLeft:15,
    marginBottom:7
  },
  txt:{   
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginLeft: 10,
    color: '#333',
    marginBottom:5
  },
  subText:{
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    marginLeft: 30,
    color: '#000',
   

  },
  infoForm:{
    padding:20,
    width:390,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width:370
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

export default memo(FormerSmokingData);
