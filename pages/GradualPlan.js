import React, { useState, useEffect, memo } from 'react';
import 
{ Text, TextInput, StyleSheet, View, Button, TouchableOpacity, Animated, useWindowDimensions, ScrollView,useAnimatedValue,ImageBackground, Dimensions  } 
from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { useLanguage } from '../LanguageContext';
import LogoImage from '../components/LogoImage';



const GradualPlan = ({ route, navigation }) => {
    const { translation } = route.params;
    const { language, switchLanguage } = useLanguage(); 

    const toHomeScreen = () => {
        navigation.navigate('HomeScreen');
    }; 

    return (
        
        <SafeAreaProvider style={{backgroundColor:'white'}}>
            <SafeAreaView style={styles.container}>
                <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />   
                <View style={{position:'static', backgroundColor:'black'}}><LogoImage/></View>

                
                <ScrollView style={styles.ScrollView} overScrollMode="never">
                    <View style={styles.planContainer}>
                        <View style={styles.paragraphs}>
                            <View style={styles.headers}>
                                <Text style={styles.titles}>{translation('planType')} </Text>
                            </View>
                            <View style={styles.subPar}>
                                <Text style={styles.paragraphsFields}> {translation('planName')} </Text>
                                <Text style={styles.planNameSub}> {translation('planNameGrad')} </Text>
                                <Text style={styles.planReason}> {translation('planReasone')} </Text>
                                <Text style={styles.planReasonSub}> {translation('planReasoneSub')} </Text>
                            </View>
                        </View>

                        <View style={styles.paragraphs}>
                            <View style={styles.headers}>
                                <Text style={styles.titles}>{translation('smokingProfHeader')} </Text>
                            </View>

                            <View style={styles.subPar}>
                                <Text style={styles.paragraphsFields}>{translation('CPD')}</Text>
                                <Text style={styles.paragraphsFields}>{translation('years')}</Text>
                                <Text style={styles.paragraphsFields}>{translation('smokingTriggers')}</Text>
                            </View>
                        </View>

                        <View style={styles.paragraphs}>
                            <View style={styles.headers}>
                                <Text style={styles.titles}>{translation('timelineTitle')} </Text>
                            </View>
                            <View style={styles.subPar}>
                                <Text style={styles.paragraphsFields}>{translation('startDate')}</Text>
                                <Text style={styles.paragraphsFields}>{translation('quitDate')}</Text>
                                <Text style={styles.paragraphsFields}>{translation('duration')}</Text>
                            </View>
                        </View>

                        <View style={styles.paragraphs}>
                            <View style={styles.headers}>
                                <Text style={styles.titles}>{translation('weeksTitlle')} </Text>
                            </View>
                            <View style={styles.subPar}>
                                <Text style={styles.paragraphsFields}>{translation('week1')}</Text>
                                    <Text style={styles.weekSubs}> {translation('week1Goal')}</Text>
                                <Text style={styles.paragraphsFields}>{translation('week2')}</Text>
                                    <Text style={styles.weekSubs}> {translation('week2Goal')}</Text>
                                <Text style={styles.paragraphsFields}>{translation('week3')}</Text>
                                    <Text style={styles.weekSubs}> {translation('week3Goal')}</Text>
                                <Text style={styles.paragraphsFields}>{translation('week4')}</Text>
                                    <Text style={styles.weekSubs}> {translation('week4Goal')}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={toHomeScreen}>
                            <Text style={styles.btnText}> {translation('homeScreenBtn')} </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
             </SafeAreaView>
        </SafeAreaProvider>    
    );
    };

    const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        backgroundColor:'white',
        
    },
    planContainer:{
        padding:10,
        marginTop:-16
    },
    titles:{
        fontSize:18,
        fontFamily:'Poppins_700Bold',
        marginBottom:5,
        color:'#6b8a6b',
        borderBottomColor:'grey',
        textShadowColor:'grey',
        textShadowRadius:2.5,
        shadowOpacity: .5,
    },
    paragraphsFields:{
        fontFamily:'Poppins_600SemiBold',
        fontSize:14.5,
        marginVertical:13,
        marginLeft:5,
        color:'#3C3D37',
        opacity:.9
    },
    weekSubs:{
        marginLeft:10,
        fontFamily:'Poppins_400Regular',
        color:'#3C3D37',
        fontSize:13.5,
    },
    planNameSub:{
       left:59 ,
       top:-38,
      fontFamily:'Poppins_400Regular',
      color:'#3C3D37',
      fontSize:15,
    },
    planReason:{
        marginTop:2,
        top:-25,
        marginLeft:5,
        color:'#3C3D37',
        fontSize:15,
    },
    planReasonSub:{
        fontFamily:'Poppins_400Regular',
        top:-23,
        marginLeft:6,
        color:'#3C3D37',
        fontSize:13.5,
    },
    headers:{
        borderBottomWidth:.7,
         marginBottom:10,
         marginTop:20,
        borderBottomColor:'grey',
    },
    ScrollView:{
        bounces:'false' ,
        padding:1.5,
        marginVertical:3, 
        marginTop:75,
        backgroundColor:'white',
        paddingVertical:3
    },
    btn: {
        padding:10,
        borderRadius:12,
        backgroundColor:'#6b8a6b',
        marginLeft:15,
        marginTop:24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
        width: '55%',
        alignSelf:'center',
        opacity:.9

    },
    btnText:{
        fontFamily:'Poppins_700Bold',
        fontSize:15.5,
        textAlign:'center',
        color:'white'
    },
    subPar:{
        marginLeft:6,
        marginBottom:10
    }
    
    });



export default memo(GradualPlan);
