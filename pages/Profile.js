import React, { useState, memo } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleUser, faSmile } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'



const Profile = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage } = useLanguage(); 

  const [email, setEmail] = useState('');
 
//   const setPasswordPage = () => {
//      navigation.navigate('SetPass');
//   };

  return (
    
    <SafeAreaProvider style={{backgroundColor:'white',}}>
      <SafeAreaView style={styles.container}>
      <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
                <View style={styles.subContainer}>
                    <View style={styles.profileWidget}>
                      <FontAwesomeIcon icon={faCircleUser} size={60} color='white'/>
                      <Text style={styles.profileText}>{translation('realUserName')}</Text>
                      <TouchableOpacity>
                        <FontAwesomeIcon icon={faPenToSquare} size={19} color='white' style={styles.fontAwsPen} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.iconsList}>
                      <View>
                        <FontAwesomeIcon icon={faUser} size={23} color='#758694' style={styles.fontAwsProfile}/>
                        <Text style={styles.iconsText}>{translation('basicInfo')}</Text>
                      </View>
                      <View>
                        <FontAwesomeIcon icon={faBell} size={23} color='#758694' style={styles.fontAwsProfile}/>
                        <Text style={styles.iconsText}>{translation('notification')}</Text>
                      </View>
                      <View>
                        <FontAwesomeIcon icon={faCircleRight} size={23} color='#758694' style={styles.fontAwsProfile}/>
                        <Text style={styles.iconsText}>{translation('formerSmokingData')}</Text>
                      </View>
                      <View style={{marginTop:80}}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} size={23} color='#758694' style={styles.fontAwsProfile}/>
                        <Text style={styles.iconsText}>{translation('logOut')}</Text>
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
    left:170,
    opacity:.9,
    top:-10
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