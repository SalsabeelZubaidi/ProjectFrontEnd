import React, { useState, useEffect, memo } from 'react';
import { Text,  StyleSheet, View,  TouchableOpacity, Dimensions  } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { useLanguage } from '../LanguageContext';
import LogoImage from '../components/LogoImage';
import { quittingPlan, quittingPlanSchedule } from '../apis/dashboard';
import { useUserInfo } from '../UserContext';


const { width, height } = Dimensions.get('window');
 
const Plan = ({ route, navigation }) => {
    const { translation } = route.params;
    const { language, switchLanguage, isRtl } = useLanguage();
    const { token, selectedPlan, setSelectedPlan } = useUserInfo()  

    console.log("token", token)
    // Function to fetch the plan
    const planPicker = async () => {
        try {
            const response = await quittingPlanSchedule(token);
            // const response = await quittingPlan(token);
            return response; 
        } catch (error) {
            console.error('Error fetching plan: ', error);
            throw error; 
        }
    };

    // unCommit 🎯🎯🎯🎯 
    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const res = await planPicker();
                setSelectedPlan(res);  // Set the plan response in state
            } catch (error) {
                console.error("Error fetching plan:", error);
            }
        };
        fetchPlan();
    }, []);

    // Log the plan type when selectedPlan changes
    useEffect(() => {
        if (selectedPlan) {
            console.log("Selected Plan Type:", selectedPlan); 
        }
    }, [selectedPlan]);


    const plansScreen = () => {
        navigation.navigate('GradualPlan');
    };
    const toPlansScreen2 = () => {
        navigation.navigate('ColdPlan');
    }; 

    console.log(selectedPlan?.plan_type, "🤣🤣🤣 ")

    return (
        <SafeAreaView style={[styles.container, {direction: isRtl ? 'rtl' : 'ltr'}]}>
            <LogoImage/>
            <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
            <View style={styles.mainView}>
                <Text style={[styles.header, {borderLeftWidth: isRtl?0 : 4 ,borderRightWidth: isRtl?4 : 0 , marginBottom:5, fontSize:isRtl?24:20, fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold' }]}>{translation('planTitle')}</Text>
                <View style={styles.plans}>
                    {selectedPlan?.plan_type === "Gradual Reduction"&& 
                    (
                    <View style={styles.gradual}>
                        <View>
                            <Text style={{fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold',fontSize:isRtl?24:23,color:'#4CAF50',marginLeft:isRtl?0:-27}}>- {translation('gradualTitle')}</Text>
                        </View>
                            <Text style={{marginRight:isRtl?20:0, fontFamily:isRtl?'Tajawal_500Medium':'Poppins_400Regular', direction: isRtl ? 'rtl' : 'ltr',  fontSize:isRtl?17:15.5, paddingHorizontal:10}}>{translation('gradualSubTitle')}</Text>
                        
                        <View style={{opacity:.4}}>
                            <View>
                                <Text style={[styles.fadedPlan , {fontSize:isRtl?23:20 , marginLeft:isRtl?0:-27, fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>-{translation('coldPlanTitle')}</Text>
                                <Text style={[styles.fadedPlanSub, {marginRight:isRtl?20:0, fontFamily:isRtl?'Tajawal_500Medium':'Poppins_400Regular', fontSize:isRtl?17:15.5}]}>{translation('coldPlanSubTitle')} </Text>
                            </View>
                        </View>
                    </View>
                    
                    )}
                    {selectedPlan?.plan_type === "Cold Turkey" && (
                    <View style={styles.cold}>
                        <View>
                            <Text style={{fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold',fontSize:20,color:'#4CAF50', fontSize:isRtl?24:20, marginLeft:isRtl?0:-27}}>- {translation('coldPlanTitle')}</Text>
                            <Text style={{marginRight:isRtl?20:0, fontSize:isRtl?18:15, paddingHorizontal:10,  fontFamily:isRtl?'Tajawal_500Medium':'Poppins_400Regular', paddingHorizontal:10}}>{translation('coldPlanSubTitle')} </Text>
                        </View>
                        {/* gradual faded */}
                        <View style={{opacity:.3}}>
                            <Text style={[styles.fadedPlan, {fontSize:isRtl?23:20,  marginLeft:isRtl?0:-27, fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>-{translation('gradualTitle')}</Text>
                            <Text style={[styles.fadedPlanSub, {marginRight:isRtl?20:0 , fontSize:isRtl?18:15, fontFamily:isRtl?'Tajawal_500Medium':'Poppins_400Regular'}]}>{translation('gradualSubTitle')}</Text>
                        </View>
                    </View>
                    )}
                </View>

                {/* buton navigation*/}
                {selectedPlan?.plan_type === "Gradual Reduction" && 
                (
                    <TouchableOpacity style={styles.btn} onPress={plansScreen}>
                        <Text style={[styles.btnText,{fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]}> {translation('planBtn')}</Text>
                    </TouchableOpacity>
                )}
                {selectedPlan?.plan_type === "Cold Turkey" &&
                 (
                    <TouchableOpacity style={styles.btn} onPress={toPlansScreen2}>
                        <Text style={[styles.btnText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_600SemiBold'}]}>{translation('planBtn')}</Text>
                    </TouchableOpacity>
                 )}
            </View>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white' 

    },
    mainView:{
        marginTop:-110,
        padding:.5,
       marginVertical:30,
       paddingVertical:20
        

        
    },
    header:{
        fontFamily:'Poppins_700Bold',
        fontSize:19.5,
        padding:12,
        color:'black',
        borderLeftColor: '#4CAF50',
        paddingLeft: 12,

      
    },
    plans:{
        marginLeft:38,
    },
    icon:{
        marginLeft:15,
        top:28,
        right:45,
        
        
    },
    fadedPlan:{
        fontFamily:'Poppins_600SemiBold',
        fontSize:20,
        color:'#3C3D37',
        marginTop:18
    },
    fadedPlanSub: {
        fontFamily:'Poppins_400Regular',
        fontSize:14,
        color:'grey',
        paddingHorizontal:10
    },
    btn:{
        alignContent:'center',
        marginTop:40,
        backgroundColor: '#DDDDDD',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 25,
        alignSelf: 'center',
        opacity:.7
        
        
    },
    btnText:{
        fontSize:17,
        textAlign:'center',
        color:'black',
     
    },
    gradual:{
        marginVertical:15,
         marginBottom:15,
         
    },
    cold:{
        marginVertical:15,
        marginRight:0
       
    },
   
    });



export default memo(Plan);
