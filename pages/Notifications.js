import React, { useState, memo, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { getUser } from '../apis/user';
import { useUserInfo } from '../UserContext';
import { getTotalCigarettes } from '../apis/dashboard';

const Notification = ({ route, navigation }) => {

  const { translation } = route.params;
  const { language, switchLanguage, isRtl } = useLanguage(); 
  const { user, token, setUser, weeklySmokingMood, userProgress, totalCigs} = useUserInfo();
  const [showTimeNotification, setShowTimeNotification] = useState(false);

  const [streakChecked, setStreakChecked] = useState(false)

  
  const getTotalCigs = async()=>{
    const res = await getTotalCigarettes(token);
    setStreakChecked(res.checked)
  }
  useEffect(() => {
    checkCurrentTime();
    // Check every minute (60000ms) to update the notification status
    const interval = setInterval(checkCurrentTime, 60000);
    return () => clearInterval(interval);
  }, []);
  getTotalCigs();



  const checkCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Between 21:00 (9PM) and 23:59 (11:59PM)
    const isWithinTimeRange = (hours >= 7 && hours < 24);
    setShowTimeNotification(isWithinTimeRange);
  };

  const toDailyCheckin = () => {
    ! showTimeNotification 
    ? ToastAndroid.show(translation('notchekinTime') , ToastAndroid.LONG)
    : streakChecked ? ToastAndroid.show(translation('alreadyCheckedin') , ToastAndroid.LONG)
    :navigation.navigate('DailyCheckin');
  };
    
      

  return (
    <SafeAreaProvider style={{backgroundColor:'white'}}>
        <SafeAreaView style={[styles.container,  {direction: isRtl ? 'rtl' : 'ltr'} ]}>
        <SwitchLanguageBtn switchLanguage={() =>{switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
          <View style={styles.innerContainer}>
          <Text style={[styles.screenHeaderText,{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}]}>{translation('notification')}</Text>
            {/* {showTimeNotification ? ( */}
            <TouchableOpacity style={styles.notificationLayout} onPress={toDailyCheckin}>
              <Text style={[styles.mainText,{fontFamily:isRtl?"Tajawal_700Bold":'Poppins_700Bold'} ]}>{translation('dailyCheckIn')}</Text>
              <Text style={[styles.subText, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('checkinHeader')}</Text>
            </TouchableOpacity>
            {/* ): */}
            {/* (
            <TouchableOpacity style={styles.notificationLayout} onPress={toDailyCheckin}>
              <Text style={[styles.mainText,{fontFamily:isRtl?"Tajawal_700Bold":'Poppins_700Bold'} ]}>{translation('caughtUp')}</Text>
            </TouchableOpacity>           
            ) */}
            {/* } */}
            
          </View>     
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    justifyContent:'center',
    paddingTop:80,
    
    
  },
  innerContainer:{
   marginHorizontal:20 , 
   marginTop:10
  },
  notificationLayout:{
    padding: 10,
    alignSelf: "center",
    marginTop: 30,
    alignContent: "flex-start",
    width: 390,
    paddingVertical: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    backgroundColor: "white",
    paddingHorizontal:14,
    backgroundColor:'#27a18b',

  },
  screenHeaderText:{
    fontFamily:'Poppins_700Bold',
    fontSize:29,
    marginBottom:-19

    
  
  },
   mainText:{
    fontFamily:'Poppins_700Bold',
    fontSize:23,
    color:'white',
      
  },
  subText:{
    fontFamily:'Poppins_400Regular',
    fontSize:16,
    color:'#F2F2F2',
    marginHorizontal:5
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

export default memo(Notification);
