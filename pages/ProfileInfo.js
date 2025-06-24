import React, { useState, memo } from 'react';
import { Text, StyleSheet, View} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { useUserInfo } from '../UserContext';

const ProfileInfo = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage, isRtl } = useLanguage(); 
  const { user, token, setUser,selectedPlan} = useUserInfo()

  const [email, setEmail] = useState(user.email);
  const [userName, setUserName] = useState(user.username);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [dob, setDob] = useState(new Date(user.birth_date));
  const formattedDob = dob.toLocaleDateString();
  const [gender, setGender] = useState(user.gender);
  const currentSmokingPlan = selectedPlan?.[0]?.plan_type || selectedPlan?.plan_type || ""
  

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SwitchLanguageBtn switchLanguage={() =>{switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
          <View style={[styles.innerContainer, {direction: isRtl ? 'rtl' : 'ltr', }]} >
            <View style={styles.profileHeader}>
              <FontAwesomeIcon icon={faCircleUser} size={60} color='#6b8a6b' style={styles.profileIcon}/>
              <View style={[styles.subHeader, {marginRight:isRtl?10:0}]}>
                <Text style={{fontFamily:'Poppins_600SemiBold'}}>{user?.userName}</Text>
                <Text style={{fontFamily:'Poppins_400Regular' , opacity:.5}}>{user?.email}</Text>
              </View>
            </View>
            <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold', fontSize:22, marginBottom:5 , paddingLeft:10}}>{translation('yourInformation')}</Text>

            <View style={styles.infoForm}>
                <View style={styles.infoCard}>
                    <Text style={[styles.txt , {color:"#4CAF50", fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]} >{translation('firstName')}</Text>
                    <Text style={styles.subText}>{firstName}</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={[styles.txt , {color:"#2196F3",  fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('lastName')}</Text>
                    <Text style={styles.subText}>{lastName}</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={[styles.txt , {color:"#FFC107",  fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('dob')}</Text>
                    <Text style={styles.subText}>{formattedDob}</Text>
                </View>

                <View style={styles.infoCard}> 
                    <Text style={[styles.txt , {color:"#9C27B0",  fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('gender')}</Text>
                    <Text style={styles.subText}>{gender}</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={[styles.txt , {color:"#FF5722" ,  fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('CurrentSmokingPlan')}</Text>
                    <Text style={styles.subText}>{currentSmokingPlan}</Text>
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
   marginHorizontal:10, 
   marginTop:130
  },

  
  profileIcon:{
    marginBottom:15
  },
  profileHeader:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:-130,
    marginBottom:20,
  
    
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
  },
  subText:{
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    marginLeft: 30,
    marginTop:5,
    color: '#000',
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
    width:370,
  
  },
  infoForm:{
    padding:15,
    width:390,
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

export default memo(ProfileInfo);
