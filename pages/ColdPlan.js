import React, { useState, useEffect, memo } from 'react';
import 
{ Text, StyleSheet, View, TouchableOpacity, ScrollView  } 
from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { useLanguage } from '../LanguageContext';
import LogoImage from '../components/LogoImage';
import { useUserInfo } from '../UserContext';


const ColdPlan = ({ route, navigation }) => {
    const { translation } = route.params;
    const { language, switchLanguage, isRtl } = useLanguage(); 
    const { selectedPlan, smokingHabits} = useUserInfo()
    

    const smokingTriggers = smokingHabits?.triggers?.reduce((str, trigger, index, array) => {
        if (index === 0) return trigger;
        if (index === array.length - 1) return `${str} and ${trigger}`;
        return `${str}, ${trigger}`;
      }, '') || 'No triggers specified';

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      };

      const findDifference = (start, quit) => {
        // Ensure inputs are Date objects
        const startDate = new Date(start);
        const quitDate = new Date(quit);
        
        // Calculate difference in milliseconds
        const diffInMs = quitDate - startDate;
        
        // Convert to days (rounding to handle daylight saving changes)
        const totalDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
        
        // Calculate full weeks
        const weeks = Math.floor(totalDays / 7);
        
        return weeks;
      };

    const toHomeScreen = () => {
        navigation.navigate('HomeScreen');
    }; 

    return (
        
        <SafeAreaProvider style={{backgroundColor:'white'}}>
            <SafeAreaView style={styles.container}>
                <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />   
                <View style={{position:'static', backgroundColor:'black'}}><LogoImage/></View>

                <ScrollView style={styles.ScrollView} overScrollMode="never">
                    <View style={[styles.planContainer, {direction: isRtl ? 'rtl' : 'ltr'}]}>
                        <View>
                            <View style={styles.headers}>
                                <Text style={[styles.headerText, {borderLeftWidth: isRtl?0 : 4 ,borderRightWidth: isRtl?5 : 0,paddingRight:isRtl?7:0, fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}]}>{translation('planType')}</Text>
                            </View>
                            <View style={styles.labelsBlock}>
                                <View style={styles.qaRow}>
                                    <Text style={[styles.labelText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('planName')}</Text>
                                    <Text style={[styles.labelValueText, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('planNameCold')}</Text>
                                </View>
                                <View>
                                    <Text style={[styles.labelText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('planReasone')}</Text>
                                    <Text style={[styles.labelValueText, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('coldPlanReson')}</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View>
                            <View style={styles.headers}>
                                <Text style={[styles.headerText, {borderLeftWidth: isRtl?0 : 4 ,borderRightWidth: isRtl?5 : 0,paddingRight:isRtl?7:0, fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}]}>{translation('smokingProfHeader')}</Text>
                            </View>
                            <View style={styles.labelsBlock}>
                                <View style={styles.qaRow}>
                                    <Text style={[styles.labelText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('CPD')} </Text>
                                    <Text style={styles.labelValueText}>{smokingHabits.cigs_per_day}</Text>
                                </View> 
                                <View style={styles.qaRow}>   
                                    <Text style={[styles.labelText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('years')}</Text>   
                                    <Text style={styles.labelValueText}>{smokingHabits.years_of_smoking}</Text>
                                </View>     
                                <View style={styles.qaRow}>    
                                    <Text style={[styles.labelText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('smokingTriggers')}</Text>
                                    <Text style={[styles.labelValueText, { flexWrap: 'wrap',   width: 260,}]}>{smokingTriggers}</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View>
                            <View style={styles.headers}>
                                <Text style={[styles.headerText, {borderLeftWidth: isRtl?0 : 4 ,borderRightWidth: isRtl?5 : 0,paddingRight:isRtl?7:0, fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}]}>{translation('timelineTitle')} </Text>
                            </View>
                            <View style={styles.labelsBlock}>
                                <View style={styles.qaRow}>
                                    <Text style={[styles.labelText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('startDate')}</Text>
                                    <Text style={styles.labelValueText}> {formatDate(selectedPlan.start_date)}</Text>
                                </View>
                                    <View style={styles.qaRow}>
                                        <Text style={[styles.labelText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('quitDate')}</Text>
                                        <Text style={styles.labelValueText}> {formatDate(selectedPlan.quit_date)}</Text>
                                     </View>
                                    <View style={styles.qaRow}>
                                        <Text style={[styles.labelText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('duration')} </Text>
                                        <Text style={styles.labelValueText}>{findDifference(selectedPlan.start_date, selectedPlan.quit_date)} {translation('Weeks')} </Text>
                                    </View>
                            </View>
                        </View>
                        
                        <View>
                            <View style={styles.headers}>
                                <Text style={[styles.headerText, {borderLeftWidth: isRtl?0 : 4 ,borderRightWidth: isRtl?5 : 0,paddingRight:isRtl?7:0, fontFamily:isRtl?'Tajawal_700Bold':'Poppins_700Bold'}]}>{translation('weeksTitlle')}</Text>
                            </View>
                            <View style={styles.labelsBlock}>
                                <Text style={[styles.labelText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('week1')}</Text>
                                <Text style={[styles.weekSubs,  {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}> {translation('coldWeek1Goal')}</Text>
                                <Text style={[styles.labelText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('week2')}</Text>
                                <Text style={[styles.weekSubs,  {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}> {translation('coldWeek2Goal')}</Text>
                                <Text style={[styles.labelText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('week3')}</Text>
                                <Text style={[styles.weekSubs,  {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}> {translation('coldWeek3Goal')}</Text>
                                <Text style={[styles.labelText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('week4')}</Text>
                                <Text style={[styles.weekSubs,  {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}> {translation('coldWeek4Goal')}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.btn} onPress={toHomeScreen}>
                            <Text style={[styles.btnText, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]}>{translation('homeScreenBtn')}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
             </SafeAreaView>
        </SafeAreaProvider>    
    );
    };

    const styles = StyleSheet.create({
        container: {
        backgroundColor:'white',
        justifyContent:'center'
    },
    planContainer:{
        padding:10,
        marginTop:-16,
       paddingHorizontal:10,
       
       
    },
    headerText:{
        fontSize:20,
        fontFamily:'Poppins_700Bold',
        color:'#6b8a6b',
        textShadowColor:'grey',
        textShadowRadius:2.5,
        shadowOpacity: .5,
        borderLeftWidth:4,
        borderLeftColor:'#6b8a6b',
        paddingLeft: 10,
    },
    labelText:{
        fontFamily:'Poppins_600SemiBold',
        fontSize:16,
        marginLeft:5,
        color:'black',
        opacity:.9
    },
    weekSubs:{
        marginLeft:10,
        fontFamily:'Poppins_400Regular',
        color:'#3C3D37',
        fontSize:14.5,
        marginBottom:9
    },
    
    headers:{
        marginTop:20,

        
    },
    ScrollView:{
        bounces:'false' ,
        paddingRight:10,
        marginVertical:3, 
        marginTop:75,
        backgroundColor:'white',

    },
    btn: {
        padding:10,
        borderRadius:30,
        backgroundColor:'#6b8a6b',
        marginLeft:15,
        marginTop:20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
        width: '57%',
        alignSelf:'center',

    },
    btnText:{
        fontFamily:'Poppins_700Bold',
        fontSize:15.5,
        textAlign:'center',
        color:'white'
    },
    labelsBlock:{
        marginLeft:10,
        marginVertical:10
        
    },
    labelValueText:{
        fontFamily:'Poppins_400Regular',
        marginLeft:7,
        color:"#3C3D37",
        paddingRight:10,
       fontSize:15
    
    },
    qaRow:{
        display:'flex' , 
        flexDirection:'row', 
        paddingRight:20,
        marginVertical:10
    }
    
    });



export default memo(ColdPlan);
