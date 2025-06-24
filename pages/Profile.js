import React, { useState, memo, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleUser, faSmile } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { logout } from '../apis/user';
import { useUserInfo } from '../UserContext';



const Profile = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage, isRtl} = useLanguage(); 
  const { user, setUser, token, setSmokingHabits, setSelectedPlan, setToken} = useUserInfo()

  const [email, setEmail] = useState('');
 
  const toEditProfile = () => {
     navigation.navigate('EditProfile');
  };
  const toProfileInfo = () => {
    navigation.navigate('ProfileInfo');
  };
  const toSmokingData = () => {
    navigation.navigate('FormerSmokingData');
  };
  const toNotifications = () => {
    navigation.navigate('Notifications');
  };

  const testLogout=()=>{
    logout(token);
    navigation.navigate('SignUp');
    setUser({});
    setToken("");
    setSelectedPlan({})
    setSmokingHabits({})
  }

  return (
    
    <SafeAreaProvider style={{backgroundColor:'white',}}>
      <SafeAreaView style={styles.container}>
      <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
                <View style={styles.subContainer}>
                    <View style={styles.profileWidget}>
                      <FontAwesomeIcon icon={faCircleUser} size={60} color='white'/>
                      <Text style={styles.profileText}>{user.first_name}</Text>
                      <TouchableOpacity onPress={toEditProfile}>
                        <FontAwesomeIcon icon={faPenToSquare} size={19} color='white' style={styles.fontAwsPen} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.iconsList}>
                      <View>
                        <FontAwesomeIcon icon={faUser} size={23} color='#758694' style={styles.fontAwsProfile}/>
                        <TouchableOpacity onPress={toProfileInfo}>
                          <Text style={[styles.iconsText, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]}>{translation('basicInfo')}</Text>
                        </TouchableOpacity> 
                      </View>
                      <View>
                        <FontAwesomeIcon icon={faCircleRight} size={23} color='#758694' style={styles.fontAwsProfile}/>
                        <TouchableOpacity onPress={toSmokingData}>
                          <Text style={[styles.iconsText, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]}>{translation('formerSmokingData')}</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{marginTop:80}}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} size={23} color='#758694' style={styles.fontAwsProfile}/>
                        <TouchableOpacity onPress={testLogout}>
                          <Text style={[styles.iconsText, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]}>{translation('logOut')}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                </View>
      </SafeAreaView> 
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  container:{
    alignItems: 'flex-start',
    padding:10
  },
  fontAwsProfile:{
    borderWidth:3,
    borderColor:'black'
  },
  profileWidget:{
    display:'flex',
    flexDirection:'row',
    backgroundColor:"#6b8a6b",
    borderRadius:15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    width:390,
    height:100,
    marginTop:60,
    padding:20,
    opacity:.95
  },
  subContainer:{
    display:'flex',
    marginTop:15
  },
  fontAwsPen:{
    marginLeft:200
  },
  profileText:{
    marginLeft:10,
    marginTop:17,
    color:'white'
  },
  iconsList:{
    marginTop:30,
    padding:20
  },
  iconsText:{
    left:40,
    top:-20,
    fontSize:16
  }
});


export default memo(Profile);