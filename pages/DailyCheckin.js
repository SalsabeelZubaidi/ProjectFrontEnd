import React, { useState, useEffect, memo, useRef } from 'react';
import 
{ Text,  StyleSheet, View,  TouchableOpacity, Animated,  Dimensions, ToastAndroid ,Alert  } 
from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { useLanguage } from '../LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useUserInfo } from '../UserContext';
import { dashboard, getSmokingStreak, getUserProgress, getWeeklySmokingLogs, smokingLogs, userProgress } from '../apis/dashboard';




  
const DailyCheckin = ({ route, navigation}) => {
    const { translation } = route.params;
    const { language, switchLanguage, isRtl } = useLanguage(); 
    const { user, token, mood, setMood, streak, setStreak, setWeeklySmokingMood, selectedPlan, setLevelScore} = useUserInfo();  
    console.log("!! SELECTED PLAN", selectedPlan)
    const planType = selectedPlan.plan_type;
    const daysQuit = userProgress?.days_without_smoking || 0
    const week = Math.max(1, Math.ceil(daysQuit / 7));





    const cigsPerDayAllowed = selectedPlan?.cigs_per_day ?
    week === 1 ? selectedPlan?.cigs_per_day - (selectedPlan.cigs_per_day * 0.2) 
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

    console.log(" !!!! WEEK NUMBER:", week ,"// CIGS PER DAY:", cigsPerDayAllowed)

    const { width, height } = Dimensions.get('window');

    const [showFeelings, setShowFeelings] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const messageOpacity = useRef(new Animated.Value(0)).current;

    const[showText, setShowText]=useState(false);
    const[selectedAnswer, setSelectedAnswer]=useState(null);

    const[showAnimation, setShowAnimation]=useState(false);

    const[noText, setNoText]= useState(false);
    const [navigateToHome, setNavigateToHome] = useState(false);

    const updateLevel =async()=>{
        const resDashboard = await dashboard(token)
        setLevelScore({
            level: resDashboard.profile.level,
            score: resDashboard.profile.xp,
        })

    }


    const handlePress = async (answer) => {
        setSelectedAnswer(answer)
        if(answer =='yes'){
            setShowText(true);
            setNoText(false)
            setShowAnimation(false)
            await userProgress(token, false);

        }
        else if(answer=='no'){
            const res = await smokingLogs(token, 0);
            console.log(res)
            Alert.alert( translation('20 Points Unlocked!'), translation('You stayed smoke-free today—nice work!'), [
            { 
                text: 'OK', 
                onPress: () => {
                navigation.navigate('HomeScreen');
                
                } 
            }
            ]);
            if(res.error){
                ToastAndroid.show(res.error , ToastAndroid.LONG);
            } else {
                updateLevel();
                const resWeeklyLog = await getWeeklySmokingLogs(token);
                setWeeklySmokingMood(resWeeklyLog)
                setShowText(false);
                setShowAnimation(true)
                setNoText(true)
                await userProgress(token, true);
            }
        }
        
    }
    
   
    
   
    const [quantity, setQuantity] = useState(0);
    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

    
    

      const onSubmit=async()=>{
        try{
            console.log("quantity", quantity)
            const res = await smokingLogs(token, quantity);
            if(res.error){
                ToastAndroid.show(res.error , ToastAndroid.LONG);
            } else {
                if(cigsPerDayAllowed<quantity){
                    Alert.alert(
                        translation('–5 Points'),
                        translation('You exceeded your smoking limit today. Try again tomorrow!'),
                        [
                            {
                            text: 'OK',
                            onPress: () => {
                            navigation.navigate('HomeScreen');
                            } 
                            },
                        ]
                        );
                }
                else if(cigsPerDayAllowed>quantity){
                    Alert.alert(
                        translation('+15 Points!'),
                        translation('You smoked less than your limit today. Keep it up!'),
                        [
                            {
                            text: 'OK',
                            onPress: () => {
                            navigation.navigate('HomeScreen');
                            } ,
                            },
                        ]
                        );
                }
                else if(cigsPerDayAllowed === quantity){
                    Alert.alert(
                        translation('+10 Points!'),
                        translation('You committed to your daily goal. Great job!'),
                        [
                            {
                            text: 'OK',
                            onPress: () => {
                            navigation.navigate('HomeScreen');
                            } 
                            },
                        ]
                        );
                }else if(planType==='Cold Turkey' && quantity>0){
                    Alert.alert(
                        translation('-10 Points'),
                        translation('You slipped from your Cold Turkey plan today. Don’t give up — every day is a new chance.'),
                        [
                            {
                            text: 'OK',
                            onPress: () => {
                            navigation.navigate('HomeScreen');
                            } 
                            },
                        ]
                        );
                }
                updateLevel();
                const resWeeklyLog = await getWeeklySmokingLogs(token);
                setWeeklySmokingMood(resWeeklyLog)
                setMood(res.mood?.toLowerCase());
                const resProgress = await getSmokingStreak(token);
                setStreak(resProgress.streak_days);
            }
        }catch(e){
            console.log("! ERROR ", e)
        }
      }

    return (
        <SafeAreaView style={styles.container}>
            <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
            <View style={styles.contentContainer}>
            {showAnimation&&(
                <View> 
                    <View style={styles.lottieView}>
                        <LottieView style={{ width: width , height: height, opacity:.7,}} source={require('../assets/party.json')} autoPlay loop={false}></LottieView>
                    </View>
                </View>        
            )}
            {noText &&(
                    <View style={styles.msgView}>
                        <Text style={[styles.noMsgText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('proud')}</Text>
                    </View> 
            )}
                <View style={styles.questionsWidget}>
                    <Text style={{fontFamily:'Poppins_600SemiBold', fontSize: isRtl? 29:25, textAlign:'center',color:'#393E46', fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold', marginBottom:10}}>{translation('didYouSmokeToday')}</Text>
                    <Text style={[styles.subText, {fontSize: isRtl? 15:12.7 , fontFamily:isRtl?'Tajawal_400Regular':'Poppins_600SemiBold'}]}>{translation('beHonest')}</Text>
                    <View style={styles.yesAndNoContainer}>
                        <TouchableOpacity onPress={() =>handlePress('yes')}>
                        <Text style={[ styles.yesAndNoTxt,{color: selectedAnswer === 'yes' ? 'red' : 'black', fontSize: selectedAnswer=='yes'? 26 :23, opacity: selectedAnswer=='no'? .5 : 1, fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>
                            {translation('yes')}
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>handlePress('no')}>
                        <Text style={[ styles.yesAndNoTxt,{color: selectedAnswer === 'no' ? 'green' : 'black' , fontSize: selectedAnswer=='no'? 26 :23 , opacity: selectedAnswer=='yes'? .5 : 1, fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>
                            {translation('no')}
                        </Text>
                        </TouchableOpacity>
                    </View>
                    { showText &&(
                        <View>
                            <View style={{display:'flex', flexDirection:'column', marginTop:40}}>
                                <Text style={[styles.qtext, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]}>{translation('howManyCigsDidYouSmoke')}</Text>
                                <View style={styles.numberSlider}>
                                    <TouchableOpacity onPress={decrement}>
                                        <Text style={styles.button}>-</Text>
                                    </TouchableOpacity>
                                        <Text style={styles.number}>{quantity}</Text>
                                    <TouchableOpacity onPress={increment}>
                                        <Text style={styles.button}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.btnView}>
                            <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
                                <Text style={[styles.btnText,{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}]}>{translation('submit')}</Text>
                                <FontAwesomeIcon icon={faChevronRight} size={13} color='white' style={{textAlign:'center', top:9}}/>
                            </TouchableOpacity>
                            </View>
                        </View>  
                    ) }
                </View>
                
            </View>
        </SafeAreaView>
    );
 } ;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
    },
    contentContainer:{
        marginTop:30,
        paddingVertical:20,
        paddingLeft:10,
        paddingRight:10
    },
    emojiContainer:{
        display:'flex',
        flexDirection:'row',
        alignSelf:'center',
        marginTop:12,
        gap:30
    },
    feelingsContainer:{
        padding:5,
        alignSelf:'center',
        alignContent:'flex-start',
        width:390,
        paddingTop:17,
        backfaceVisibility:'visible',
        borderRadius:20
        
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
    numberSlider: {
        flexDirection: 'row',
        justifyContent:'center',
        paddingVertical: 5,
    },
    questionsWidget:{
        padding:20,
        marginTop:35,
        paddingVertical:30
        
    },
    yesAndNoContainer:{
        gap:50,
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:13
    
    },
    yesAndNoTxt:{
        fontFamily:'Poppins_400Regular',
        borderColor:'grey',
        padding:7,
        paddingHorizontal:17,
        borderRadius:10,
        },
    qtext:{
        fontSize:22.5,
        fontFamily:'Poppins_600SemiBold',
        color:'grey',
        textAlign:'center',
        borderRadius:7,
        paddingHorizontal:30,
        marginBottom:10
    },
    button: {
        fontSize: 18,
        fontWeight:'bold',
        borderWidth:1,
        borderRadius:20,
        paddingTop:5,
        textAlign:'center',
        height:40,
        width:40,
        backgroundColor: '#ddd',
        borderColor:'#ddd',
        marginHorizontal:5
        },
    number: {
        fontSize: 25,
        marginHorizontal: 10,
        fontFamily:'Poppins_400Regular'
        },
    subText:{
        fontFamily:'Poppins_400Regular' , 
        textAlign:'center', 
        opacity:.8,
        color:'grey',
        marginBottom:10,
        marginTop:-5
    },
    lottieView:{
        position:'absolute',
        marginBottom:100,
    },
    submitBtn:{
        borderWidth:1,
        borderRadius:13,
        flexDirection:'row',
        padding:5,
        gap:20,
        justifyContent:'center',
        backgroundColor:'#7ecd78',
        borderColor:'#ddd',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
        marginTop:20,
        justifyContent:'center'
    },
    btnText:{
        fontSize:20,
        textAlign:'center',
        color:'white'
    },
    btnView:{
        marginTop:30,
        paddingHorizontal:110
    },
    msgView:{
        padding:20,
        position:'absolute',
        marginTop:280,
        marginHorizontal:60,
        width:300
    },
    noMsgText:{
        fontSize:25,
        fontFamily:'Poppins_600SemiBold',
        textAlign:'center',
        color:'green',
        paddingHorizontal:8
    }
  
    });



export default memo(DailyCheckin);
