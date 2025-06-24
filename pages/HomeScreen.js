import React, { useState, useEffect, memo, useRef } from 'react';
import 
{ Text, TextInput, StyleSheet, View, Button, TouchableOpacity, Animated, useWindowDimensions, ScrollView,useAnimatedValue,ImageBackground, Dimensions, TouchableHighlight, Pressable, Image, ToastAndroid  } 
from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { useLanguage } from '../LanguageContext';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell, faCircleUser, faSmile } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { faFaceAngry } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmileBeam } from '@fortawesome/free-solid-svg-icons'
import { faFaceTired } from '@fortawesome/free-solid-svg-icons'
import { faFaceMeh } from '@fortawesome/free-solid-svg-icons'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { useUserInfo } from '../UserContext';
import { getSmokingStreak, getTotalCigarettes, getUserProgress, getWeeklySmokingLogs, smokingLogs, userProgress, dashboard } from '../apis/dashboard';
import MoodIconComponent from '../components/MoodIconComponent';


const HomeScreen = ({ route, navigation }) => {
    const { translation } = route.params;
    const { language, switchLanguage, isRtl } = useLanguage(); 
    const { user, selectedPlan, setSelectedPlan, smokingHabits, setSmokingHabits, token, setMood, userProgress, setUserProgress, streak, setStreak, weeklySmokingMood,
        setWeeklySmokingMood,
        totalCigs,
        setTotalCigs, mood, levelScore, setLevelScore } = useUserInfo();
   

    const getData =async()=>{
      const u = await getUser(userName);
      setUser(u);
      const resDashboard = await dashboard(token)
      setUserProgress(resDashboard?.progress)
      setStreak(resDashboard?.streak_days);
      setSelectedPlan(resDashboard?.quitting_plan)
      setSmokingHabits(resDashboard?.smoking_habits)
      const resWeeklyLog = await getWeeklySmokingLogs(token);
      const resTotalCigs  = await getTotalCigarettes(token);
      setTotalCigs(resTotalCigs)
      setWeeklySmokingMood(resWeeklyLog);
    }

    useEffect(()=>{
      getData();
    }, [])

    
    const planType = selectedPlan?.[0]?.plan_type || selectedPlan?.plan_type || '';
    const daysQuit = userProgress?.days_without_smoking || 0
   // const week =  Math.ceil(daysQuit/7)
    const week = Math.max(1, Math.ceil(daysQuit / 7));

   

    const cigsPerDay = selectedPlan?.cigs_per_day ?
    week === 1 ? selectedPlan.cigs_per_day - (selectedPlan.cigs_per_day * 0.2) 
    : week === 2 
      ? selectedPlan.cigs_per_day - (selectedPlan.cigs_per_day * 0.4)
      : week === 3
        ? selectedPlan.cigs_per_day - (selectedPlan.cigs_per_day * 0.6)
        : week === 4
          ? selectedPlan.cigs_per_day - (selectedPlan.cigs_per_day * 0.8)
          : 0
    :   week === 1 ? selectedPlan.reduction_schedule?.[0]?.target_per_day - (selectedPlan.reduction_schedule?.[0]?.target_per_day * 0.2) 
        : week === 2 
          ? selectedPlan.reduction_schedule?.[0]?.target_per_day - (selectedPlan.reduction_schedule?.[0]?.target_per_day * 0.4)
          : week === 3
            ? selectedPlan.reduction_schedule?.[0]?.target_per_day - (selectedPlan.reduction_schedule?.[0]?.target_per_day * 0.6)
            : week === 4
              ? selectedPlan.reduction_schedule?.[0]?.target_per_day - (selectedPlan.reduction_schedule?.[0]?.target_per_day * 0.8)
              : 0;

          console.log(selectedPlan, "🥰🥰")
  
      const remainingCigs = selectedPlan?.[0]?.remaining_cigarettes || 0;

    
    let cigsAvoidedtemp = userProgress?.cigarettes_avoided;//( smokingHabits?.cigs_per_day * daysQuit ) - totalCigs 
    let moneySaved = cigsAvoidedtemp / smokingHabits?.cigs_per_pack * smokingHabits?.pack_cost || 0
      if (moneySaved < 0) {
        moneySaved = 0;
      } else {
        moneySaved = parseFloat(moneySaved.toFixed(2));
      }
    const currency = smokingHabits?.currency
    

    const toProfileScreen = () => {
        navigation.navigate('Profile');
    };

    const toChatbot = () => {
        navigation.navigate('ChatbotConvo');
    };
  
    const toNotificationScreen = () => {
      setHasNotification(false); 
      navigation.navigate('Notifications');
    };
    const date = new Date();
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayName = days[date.getDay()];
    const todayMood =  weeklySmokingMood?.find(item => item.day === dayName);

    // console.log("weekly: ", weeklySmokingMood)
    // console.log("mood: ", todayMood)





    const [hasNotification, setHasNotification] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setHasNotification(true), 2000);
      return () => clearTimeout(timer);
    }, []);

  
    const toggleMood = (mood) => {
            setSelectedMood(mood);
          };
    const [selectedMood, setSelectedMood] = useState("");
    const [showFeelings, setShowFeelings] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [showTimeNotification, setShowTimeNotification] = useState(false);

    useEffect(()=>{
      setShowFeelings(todayMood?.mood ? false: true)
      setMoodSubmitted(todayMood?.mood ? true: false)
    }, [todayMood])

    console.log("todayMood?.mood", todayMood?.mood)

    console.log(moodSubmitted)

    useEffect(() => {
        checkCurrentTime();
        // Check every minute (60000ms) to update the notification status
        const interval = setInterval(checkCurrentTime, 60000);
        return () => clearInterval(interval);
      }, []);
    
    
    
      const checkCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        // Between 21:00 (9PM) and 23:59 (11:59PM)
        //changeTime
        const isWithinTimeRange = (hours >= 9 && hours < 11);
        setShowTimeNotification(isWithinTimeRange);
      };
    
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const messageOpacity = useRef(new Animated.Value(0)).current;


    const[showAnimation, setShowAnimation]=useState(false);

    const[noText, setNoText]= useState(false);
    const [navigateToHome, setNavigateToHome] = useState(false);

  const [moodSubmitted, setMoodSubmitted] = useState(false);
   
  const onSubmit = async () => {
    if(showTimeNotification){
      try {
      const resSmoking =  await getTotalCigarettes(token);
      console.log(resSmoking.total_cigarettes)
      const res = await smokingLogs(token, resSmoking.total_cigarettes, selectedMood);
      const resWeeklyLog = await getWeeklySmokingLogs(token);
      console.log(resWeeklyLog)
      setWeeklySmokingMood(resWeeklyLog);
      setMood(res.mood?.toLowerCase());
      const resProgress = await getSmokingStreak(token);
      setStreak(resProgress.streak_days);
      setMoodSubmitted(true); 
      setShowFeelings(false);
    } catch (error) {
      console.error('Error in onSubmit:', error);
    }
    } else {
      ToastAndroid.show("Its not the time for your check In" , ToastAndroid.LONG)
    }
  };
  
  const moodShape = (day) =>{
    const temp = weeklySmokingMood?.find((w)=>{return (w.day === day)});
    return temp?.mood
  
  }

  console.log("showFeelings", showFeelings)

    return (  
      <SafeAreaProvider style={{backgroundColor:'white'}}>
        <SafeAreaView style={[styles.container,  {direction: isRtl ? 'rtl' : 'ltr'} ]}>
          <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
            <View style={{display:'flex' , flexDirection:'row', marginTop:30, marginLeft:-300, direction: isRtl ? 'ltr' : 'ltr'}}>
              <TouchableOpacity onPress={toProfileScreen} style={{marginRight:370}}> 
                <FontAwesomeIcon icon={faCircleUser} size={42} color='#6b8a6b' style={styles.fontAwsProfile}/>
              </TouchableOpacity>  
              <TouchableOpacity onPress={toNotificationScreen} style={{ marginLeft: -350, marginTop: 5 }}>
                {hasNotification ? (
                  <LottieView
                    source={require('../assets/bell.json')}
                    autoPlay
                    loop
                    style={{ width: 85, height: 95, marginBottom:-30, marginTop:-25, marginLeft:-25}}
                  />
                ) : (
                  <FontAwesomeIcon icon={faBell} size={34} color="#6b8a6b" style={styles.fontAwsBell} />
                )}
              </TouchableOpacity>
              
            </View>    
            <ScrollView style={styles.scrollView} overScrollMode="never" contentContainerStyle={{ paddingBottom: 150 }}>
                {showFeelings && (
                <Animated.View style={ { opacity: fadeAnim }}>
                <View style={styles.feelingsContainer}>
                    <View style={styles.feelingsText}>
                        <Text style={[styles.helloText, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}]}>{translation('hello')} {user?.first_name}{translation('!')}</Text>
                        <Text style={[styles.helloText2, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('howAreYouFeeling')}</Text>
                    </View>
                    <View style={styles.emojiContainer}>
                        <Pressable
                            onPress={() => toggleMood('smily')}
                            style={({ pressed }) => [
                                styles.emojiBtnBase,
                                {
                                backgroundColor: pressed ? '#d3d3d3' : 'white',
                                borderColor: selectedMood=='smily' ? '#6b8a6b' : 'transparent',
                                borderWidth:4,
                                borderRadius:30
                                },
                            ]}
                        >
                            <FontAwesomeIcon icon={faFaceSmile} size={45} color="#B1D467" style ={styles.fontAwsEmojis}/>
                        </Pressable>

                        <Pressable
                            onPress={() => toggleMood('angry')}
                            style={({ pressed }) => [
                                styles.emojiBtnBase,
                                {
                                backgroundColor: pressed ? '#d3d3d3' : 'white',
                                borderColor: selectedMood=='angry'? '#6b8a6b' : 'transparent',
                                borderWidth:4,
                                borderRadius:30
                                },
                            ]}
                        >
                            <FontAwesomeIcon icon={faFaceAngry} size={45} color="#7ECD78" style ={styles.fontAwsEmojis}/>
                        </Pressable>
                        
                        <Pressable
                            onPress={() => toggleMood('meh')}
                            style={({ pressed }) => [
                                styles.emojiBtnBase,
                                {
                                backgroundColor: pressed ? '#d3d3d3' : 'white',
                                borderColor: selectedMood=='meh'? '#6b8a6b' : 'transparent',
                                borderWidth:4,
                                borderRadius:30
                                },
                            ]}
                            >
                            <FontAwesomeIcon icon={faFaceMeh} size={45} color="#57C785" style ={styles.fontAwsEmojis}/>
                        </Pressable>

                        <Pressable
                            onPress={() => toggleMood('smileBeam')}
                            style={({ pressed }) => [
                                styles.emojiBtnBase,
                                {
                                backgroundColor: pressed ? '#d3d3d3' : 'white',
                                borderColor: selectedMood=='smileBeam' ? '#6b8a6b' : 'transparent',
                                borderWidth:4,
                                borderRadius:30
                                },
                            ]}
                        >
                            <FontAwesomeIcon  icon={faFaceSmileBeam} size={45} color="#41A290" style ={styles.fontAwsEmojis}/>
                        </Pressable>    
                        
                        <Pressable
                            onPress={() => toggleMood('tired')}
                            style={({ pressed }) => [
                                styles.emojiBtnBase,
                                {
                                backgroundColor: pressed ? '#d3d3d3' : 'white',
                                borderColor: selectedMood=='tired'? '#6b8a6b' : 'transparent',
                                borderWidth:4,
                                borderRadius:40
                                },
                            ]}
                            >
                            <FontAwesomeIcon  icon={faFaceTired} size={45} color="#2A7B9B" style ={styles.fontAwsEmojis}/>
                        </Pressable>
                        </View>

                        {selectedMood && (
                          <TouchableOpacity onPress={onSubmit} style={styles.submitBtn}>
                            <Text style={[styles.submitText, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]}>{translation('submitMood')}</Text>
                          </TouchableOpacity>
                        )}
                  </View>
                </Animated.View>
              )}
              {moodSubmitted && (    
                <View style={styles.daysConatiner}>
                  <View style={styles.daysMood}>
                    <MoodIconComponent mood={moodShape('sun')?.toLowerCase()} />
                    <MoodIconComponent mood={moodShape('mon')?.toLowerCase()} />
                    <MoodIconComponent mood={moodShape('tue')?.toLowerCase()} />
                    <MoodIconComponent mood={moodShape('wed')?.toLowerCase()} />
                    <MoodIconComponent mood={moodShape('thu')?.toLowerCase()} />
                    <MoodIconComponent mood={moodShape('fri')?.toLowerCase()} />
                    <MoodIconComponent mood={moodShape('sat')?.toLowerCase()} />
                  </View>
                  <View style={[styles.daysNames, {gap: isRtl? 14: 27 , marginRight:isRtl? 5:0, marginLeft:isRtl? 0:5} ]}>
                    <Text style={{fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular', direction: isRtl ? 'rtl' : 'ltr', fontSize: isRtl ? 14 : 14}}>{translation('sun')} </Text>
                    <Text style={{fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular',fontSize:14, direction: isRtl ? 'rtl' : 'ltr'}}>{translation('mon')} </Text>
                    <Text style={{fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular', fontSize:14, direction: isRtl ? 'rtl' : 'ltr'}}>{translation('tues')}</Text>
                    <Text style={{fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular', fontSize:14, direction: isRtl ? 'rtl' : 'ltr'}}>{translation('wed')} </Text>
                    <Text style={{fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular', fontSize:14, direction: isRtl ? 'rtl' : 'ltr'}}>{translation('thu')} </Text>
                    <Text style={{fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular', fontSize:14, direction: isRtl ? 'rtl' : 'ltr'}}>{translation('fri')} </Text>
                    <Text style={{fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular', fontSize:14, direction: isRtl ? 'rtl' : 'ltr'}}>{translation('sat')} </Text>
                  </View>
                </View>
                )}
              <View style={[styles.goaslHeader]}>
                <Text style={{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold', fontSize:20,}}>{translation('todaysGoal')} :</Text>
                  {planType === "Gradual Reduction"&& (
                    <Text style={[styles.goalsText,{fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'} ]}>{translation('max')} {cigsPerDay} {translation('cigs')}</Text>
                  )}
                  {planType === "Cold Turkey" &&
                  <Text style={[styles.goalsText, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('staySmokeFree')}</Text>
                  }  
              </View>

              <View style={styles.score}>
                  <FontAwesomeIcon icon={faTrophy} size={60} color="#F3C623" style={styles.fontAwsTrophy} />
                  <View style={{}}>
                  <View style={{display:'flex', flexDirection:'row'}}>
                    <Text style={{fontSize:20, color:'grey', fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}}>{translation('level')}  </Text>
                    <Text style={{fontFamily:'Poppins_500Medium', fontSize:20, color:'grey',}}>{levelScore.level}</Text>
                  </View>
                  <View style={{display:'flex', flexDirection:'row'}}>
                    <Text style={{fontSize:20, color:'grey',  fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}}>{translation('score')}  </Text>
                    <Text style={{fontFamily:'Poppins_500Medium', fontSize:20, color:'grey',}}>{levelScore.score}</Text>
                  </View>
                  </View>
              </View>

              {/* progress container */}
              <View style={styles.progressContainer}>
                <Text style={[styles.progressText,{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}]}>{translation('overallProgress')}</Text>
                <View style={styles.animationContainer}>
                  <View style={styles.lottieANDsubText}>
                    <LottieView style={styles.lottie1}
                        source={require('../assets/calenderAnimation.json')}
                        autoPlay
                        loop
                        speed={.8}
                    />
                    <View>
                      <Text style={[styles.progressSubtext, ]}>{daysQuit}</Text>
                      <Text style={[styles.animationText, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('days quit')}</Text>
                    </View>
                  </View>
                  <View style={styles.lottieANDsubText}>
                    <LottieView style={styles.lottie2}
                      source={require('../assets/cigAnimation.json')}
                      autoPlay
                      loop
                      speed={.8}
                    />
                    <View>
                      <Text style={styles.progressSubtext}>{cigsAvoidedtemp || 0}</Text>
                      <Text style={[styles.animationText, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('cigsAvoided')}</Text>
                    </View>
                  </View>
                  <View style={styles.lottieANDsubText}>
                    <LottieView style={styles.lottie3}
                      source={require('../assets/moneyFinal.json')}
                      autoPlay
                      loop
                      speed={.7}
                     />
                    <View>
                      <Text style={styles.progressSubtext}>{moneySaved} {currency}</Text>
                      <Text style={[styles.animationText, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('moneySaved')}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.achievementWidget}>
                  <Text style={[styles.achievementText, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}]}>{translation('achievement')}</Text>
                    <View style={styles.imagesRow}>
                      <View style={styles.imageAndText}>
                        <Image style={[styles.image, {opacity: cigsAvoidedtemp >= 20 ? 1: .3}]} source={require('../assets/level-1.jpeg')} />
                        <Text style={[styles.imageSubtext, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular', opacity: cigsAvoidedtemp >= 20 ? 1: .3}]}>{translation('20CigsAvoided')}</Text>
                      </View>
                     <View style={styles.imageAndText}>
                        <Image style={[styles.image, {opacity: cigsAvoidedtemp >= 50 ? 1: .3}]} source={require('../assets/level-2.jpeg')} />
                        <Text style={[styles.imageSubtext, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular', opacity: cigsAvoidedtemp >= 50 ? 1: .3}]}>{translation('50CigsAvoided')}</Text>
                      </View>
                      <View style={styles.imageAndText}>
                        <Image style={[styles.image, {opacity: cigsAvoidedtemp >= 100 ? 1:.3}]} source={require('../assets/level-3.jpeg')} />
                        <Text style={[styles.imageSubtext, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular', opacity: cigsAvoidedtemp >= 100 ? 1:.3}]}>{translation('100CigsAvoided')}</Text>
                      </View>
                    </View>
                    <View style={styles.imagesRow}>
                      <View style={styles.imageAndText}>
                        <Image style={[styles.image, {opacity: cigsAvoidedtemp >= 150 ? 1:.3}]} source={require('../assets/level-4.jpeg')} />
                        <Text style={[styles.imageSubtext, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular', opacity: cigsAvoidedtemp >= 150 ? 1:.3}]}>{translation('150CigsAvoided')}</Text>
                      </View>
                      <View style={styles.imageAndText}>
                        <Image style={[styles.image, {opacity: cigsAvoidedtemp >= 200 ? 1:.3}]} source={require('../assets/level-5.jpeg')} />
                        <Text style={[styles.imageSubtext, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular', opacity: cigsAvoidedtemp >= 200 ? 1:.3}]}>{translation('200CigsAvoided')}</Text>
                      </View>
                  </View>
            
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.botIcon} onPress={toChatbot}>
              <LottieView style={styles.chatbotLottie}
                source={require('../assets/chatbotIcon.json')}
                autoPlay
                loop={false}
                speed={.8}         
              />
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaProvider>    
    );
    };

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  
  },
  scrollView: {
    padding: 10,
    marginVertical:3, 
    backgroundColor:'white',
    paddingVertical:3,
    flexGrow: 1,
    paddingHorizontal:10,
    
  },
  fontAwsProfile: {
    opacity: 0.9,
    marginLeft:315,
  },
  fontAwsBell: {
    opacity: 0.9,
     
  },
  progressContainer: {
    padding: 10,
    alignSelf: "center",
    marginTop: 30,
    alignContent: "flex-start",
    width: 390,
    paddingVertical: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: "white",
  },
  animationContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    gap: 35,
  },
  lottie1: {
    height: 110,
    width:80,
    marginTop: -27,
  },
  lottie2: {
    height: 49,
    width:100,
    marginBottom: 30,
    marginTop: 3,
  },
  lottie3: {
    height: 120,
    width:85,
    marginTop: -34,
  },
  lottieANDsubText:{
    marginTop:20
  },
  progressText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    marginBottom: 15,
  },
  animationText: {
    width: 90,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    textAlign: "center",
  },
  chatbotLottie: {
    width: 120,
    height: 120,
  },
  botIcon: {
    top: 730,
    left: 305,
    position: 'absolute',
  },
  dailyCheckIn: {
    marginTop: 10,
    alignSelf:'center',
    width: 370,
    paddingVertical: 14,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    backgroundColor:'#27a18b',
  },
  checkinText:{
    fontSize:22,
    fontFamily:'Poppins_600SemiBold',
    textAlign:'center',
    color:'white'
  },
  daysMood: {
    display: "flex",
    flexDirection: "row",
    gap:14,
    backgroundColor:'white',
    opacity:.5,
    marginTop:-13
  },
  daysNames:{
    display:'flex',
    flexDirection:'row',
    marginTop:7,
   
  },
  goaslHeader: {
    alignSelf: 'flex-start',
    marginTop:15,
    display:'flex',
    flexDirection:'row',
    gap:7,
    paddingVertical:12,
    alignSelf:'center',
    
  },
  goalsText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 17,
    marginTop:2,
   
  },
  progressSubtext:{
    fontFamily:'Poppins_700Bold' , 
    textAlign:'center' , 
    fontSize:20,
    marginTop:10,
    marginBottom:5
  },
  feelingsContainer:{
    padding:10,
    alignSelf:'center',
    width:390,
    paddingTop:17,
      
  },
  helloText:{
    fontFamily:'Poppins_700Bold',
    fontSize:24,
    color:'#6b8a6b',
    letterSpacing: 2
  },
  helloText2:{
    fontFamily:'Poppins_400Regular',
    fontSize:16,
  },
  emojiContainer:{
    display:'flex',
    flexDirection:'row',
    alignSelf:'center',
    marginTop:12,
    gap:30
  },
  submitBtn:{
    width:160,
    alignSelf:'center',
    marginTop:20,
    backgroundColor:'#e1f9e1',
    borderRadius:20,
    paddingVertical:5
  },
  submitText:{
    textAlign:'center',
    fontSize:15,
    fontFamily:'Poppins_700Bold',
    color:'#6b8a6b'
  },
  daysConatiner:{
    opacity:.7,
    marginTop:35,
    marginBottom:10
  },
  achievementWidget:{
    paddingVertical: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: "white",
    marginTop:30,
    padding:10
  },
  achievementText:{
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    marginBottom: 15,
  },
  imagesRow:{
    display:'flex',
    flexDirection:'row',
    gap:40,
    marginBottom:20
  },
  image:{
    height:100,
    width:100,
    opacity:.3
  },
  imageAndText:{
    display:'flex',
  },
  imageSubtext:{
    fontFamily:'Poppins_400Regular',
    flexWrap: 'wrap',    
    textAlign: 'center', 
    width: 80,             
    fontSize: 14,
    marginHorizontal:7,
    opacity:.3,
    marginTop:7
  },
  score:{
    display:'flex',
    flexDirection:'row',
    gap:15,
    padding:20,
    borderRadius:20,
    backgroundColor:'#F2F2F2'
  }
    });



export default memo(HomeScreen);