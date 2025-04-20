import React, { useState, useEffect, memo, useRef } from 'react';
import 
{ Text, TextInput, StyleSheet, View, Button, TouchableOpacity, Animated, useWindowDimensions, ScrollView,useAnimatedValue,ImageBackground, Dimensions, TouchableHighlight, Pressable  } 
from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { useLanguage } from '../LanguageContext';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleUser, faSmile } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { faFaceAngry } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmileBeam } from '@fortawesome/free-solid-svg-icons'
import { faFaceTired } from '@fortawesome/free-solid-svg-icons'
import { faFaceMeh } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'


const HomeScreen = ({ route, navigation }) => {
    const { translation } = route.params;
    const { language, switchLanguage } = useLanguage(); 


    const toProfileScreen = () => {
        navigation.navigate('Profile');
    };

    const toChatbot = () => {
        navigation.navigate('ChatbotConvo');
    };
        
    const [selectedMood, setSelectedMood] = useState();
    const [showFeelings, setShowFeelings] = useState(true);

    
    var [ isPress, setIsPress ] = React.useState(false);
    
    const toggleMood = (mood) => {
        setSelectedMood(mood);
    
        // Start fade-out animation
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300, // fade duration in ms
            
        }).start();
    
        // Hide the view after delay
        setTimeout(() => {
            setShowFeelings(false);
        }, 1500); // delay matches what you want
    };

    
    const fadeAnim = useRef(new Animated.Value(1)).current; 

   

    return (
        
        <SafeAreaProvider style={{backgroundColor:'white'}}>
            <SafeAreaView style={styles.container}>
            

                
                <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
                    <TouchableOpacity style={{ width:'15%', top:30,   right:175}} onPress={toProfileScreen}> 
                        <FontAwesomeIcon icon={faCircleUser} size={45} color='#6b8a6b' style={styles.fontAwsProfile}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width:'7%', right:120 }} >
                        <FontAwesomeIcon icon={faBell} size={25} color='#6b8a6b' style={styles.fontAwsBell}/>
                    </TouchableOpacity>
                    <ScrollView style={styles.scrollView} overScrollMode="never">
                    {showFeelings && (
                    <Animated.View style={ { opacity: fadeAnim }}>
                        
                    <View style={styles.feelingsContainer}>
                        <View style={styles.feelingsText}>
                        <Text style={styles.subText1}>{translation('welcome')}</Text>
                        <Text style={styles.subText2}>{translation('howAreYouFeeling')}</Text>
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
                    </View>
                    </Animated.View>
                    )}
                    <View style={styles.dailyCheckIn}>
                            <Text>{translation('dailyCheckIn')}</Text>
                            <FontAwesomeIcon icon={faFire} size={20} color='#FFA500' style={styles.fontAwsFire}/>
                            <View style={styles.days}>
                                <Text style={{fontFamily:'Poppins_400Regular'}}>{translation('sun')}</Text>
                                <Text style={{fontFamily:'Poppins_400Regular'}}>{translation('mon')}</Text>
                                <Text style={{fontFamily:'Poppins_400Regular'}}>{translation('tues')}</Text>
                                <Text style={{fontFamily:'Poppins_400Regular'}}>{translation('wed')}</Text>
                                <Text style={{fontFamily:'Poppins_400Regular'}}>{translation('thu')}</Text>
                                <Text style={{fontFamily:'Poppins_400Regular'}}>{translation('fri')}</Text>
                                <Text style={{fontFamily:'Poppins_400Regular'}}>{translation('sat')}</Text>
                            </View>
                    </View>
                      
                    <View style={styles.progressContainer}>
                            <View style={styles.progressTextContainer}>
                                <Text style={styles.progressText}>{translation('overallProgress')}</Text>
                            </View>
                            <View style={styles.animationContainer}>
                                <View style={styles.lottieNsubText}>
                                    <LottieView style={styles.lottie1}
                                        source={require('../assets/calenderAnimation.json')}
                                        autoPlay
                                        loop
                                        speed={.8}
                                    />
                                    <Text style={styles.text}>{translation('days quit')}</Text>
                                </View>
                                <View style={styles.lottieNsubText}>
                                    <LottieView style={styles.lottie2}
                                        source={require('../assets/cigAnimation.json')}
                                        autoPlay
                                        loop
                                        speed={.8}
                                    />
                                    <Text style={styles.text}>{translation('cigsAvoided')}</Text>
                                </View>
                                <View style={styles.lottieNsubText}>
                                    <LottieView style={styles.lottie1}
                                        source={require('../assets/moneyFinal.json')}
                                        autoPlay
                                        loop
                                        speed={.7}
                                        
                                    />
                                    <Text style={styles.text}>{translation('moneySaved')}</Text>
                                </View>
                            </View>
                        </View>
                   </ScrollView>

                    <TouchableOpacity style={styles.botWidget} onPress={toChatbot}>
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

    const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor:'white',
    },
    scrollView:{
        padding:10,
        marginVertical:2, 
        paddingTop:-10,
        
    },
    fontAwsProfile:{
        left:15,
        opacity:.9,
       
    },
    fontAwsBell:{
        top:-5,
        
        opacity:.9,
    
    },
    feelingsContainer:{
        padding:10,
        alignSelf:'center',
        marginTop:27,
        alignContent:'flex-start',
        width:390,
        paddingVertical:20,
        borderRadius:15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        backgroundColor:'white',
        
    },
    subText1:{
        fontFamily:'Poppins_700Bold',
        fontSize:20
    },
    subText2:{
        fontFamily:'Poppins_400Regular',
        fontSize:15
    },
    emojiContainer:{
        display:'flex',
        flexDirection:'row',
        alignSelf:'center',
        marginTop:15  ,
        gap:20
    },
    progressContainer:{
        padding:10,
        alignSelf:'center',
        marginTop:30,
        alignContent:'flex-start',
        width:390,
        paddingVertical:20,
        borderRadius:15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        backgroundColor:'white',
    },
    animationContainer:{
        display:'flex',
        flexDirection:'row',
        alignSelf:'center',
        gap:50
    },
    lottie1:{
        display:'flex',
        height:95,
        width:95
    },
    lottie2:{
        height:74,
        width:74,
        marginTop:10
    },
   
    progressTextContainer:{

    },
    progressText:{
        fontFamily:'Poppins_700Bold',
        fontSize:20,
        marginBottom:15
    },
    lottieNsubText:{
        
    },
    text:{
        width:70,
        fontFamily:'Poppins_400Regular',
        fontSize:14,
        textAlign:'center',
        marginTop:20
    },
    chatbotLottie:{
        width:120,
        height:120,
    },
    botWidget:{
        top:730,
        left:305,
        position:'absolute'
    },
    dailyCheckIn:{
        padding:10,
        alignSelf:'center',
        marginTop:30,
        alignContent:'flex-start',
        width:390,
        paddingVertical:20,
        borderRadius:15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        backgroundColor:'white',
    },
    fontAwsFire:{
        top:-30,
        left:350
    },
    days:{
        display:'flex',
        flexDirection:'row',
        alignSelf:'center',
        gap:28,
        marginTop:30,
        
    }
   
    });



export default memo(HomeScreen);
