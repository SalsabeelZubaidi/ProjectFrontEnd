import React, { useState, useEffect, memo } from 'react';
import 
{ Text, TextInput, StyleSheet, View, Button, TouchableOpacity, Animated, useWindowDimensions, ScrollView,useAnimatedValue,ImageBackground, Dimensions  } 
from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { useLanguage } from '../LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import LogoImage from '../components/LogoImage';



const { width, height } = Dimensions.get('window');



  
const PLan = ({ route, navigation }) => {
    const { translation } = route.params;
    const { language, switchLanguage } = useLanguage(); 
    const plansScreen = () => {
        navigation.navigate('GradualPlan');
    };
    const toPlansScreen2 = () => {
        navigation.navigate('ColdPlan');
    };  

    return (
        <SafeAreaView style={styles.container}>
            <LogoImage/>
            <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />
            <View style={styles.mainView}>
                    <Text style={styles.header}> {translation('planTitle')} </Text>
                <View style={styles.plans}>
                    <View>
                        <FontAwesomeIcon icon={faCaretRight} size={25} color='grey'style={styles.icon}/>
                        <Text style={styles.planOne}>{translation('gradualTitle')}</Text>
                    </View>
                    <View>
                        <Text style={styles.planOneSub}>{translation('gradualSubTitle')}</Text>
                    </View>
                    <View>
                        <FontAwesomeIcon icon={faCaretRight} size={25} color='grey'style={styles.icon}/>
                        <Text style={styles.planTwo}>{translation('coldPlanTitle')}</Text>
                    </View>
                    <View >
                        <Text style={styles.planTwoSub}>{translation('coldPlanSubTitle')} </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn} onPress={plansScreen}>
                <Text style={styles.btnText}> {translation('planBtn')}gradual</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={toPlansScreen2}>
                <Text style={styles.btnText}>{translation('planBtn')}cold trukey</Text>
                </TouchableOpacity>
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
        marginTop:-110
    },
    header:{
        fontFamily:'Poppins_700Bold',
        fontSize:19.5,
        padding:12,
        color:'black'
    },
    plans:{
        marginLeft:38
    },
    icon:{
        marginLeft:15,
        top:28,
        right:45
        
    },
    planOne:{
        fontFamily:'Poppins_600SemiBold',
        fontSize:20,
        color:'#3C3D37'

    },
    planOneSub:{
        fontFamily:'Poppins_400Regular',
        fontSize:13,
        color:'grey'
    },
    planTwo:{
        fontFamily:'Poppins_600SemiBold',
        fontSize:20,
        color:'#3C3D37'
    },
    planTwoSub: {
        fontFamily:'Poppins_400Regular',
        fontSize:13,
        color:'grey'
    },
    btn:{
        alignContent:'center',
        marginTop:60,
    },
    btnText:{
        fontFamily:'Poppins_600SemiBold',
        fontSize:16.5,
        textAlign:'center',
        color:'#6b8a6b',
        fontStyle:'underline',
        
        borderBottomColor:'#6b8a6b'
    }
    });



export default memo(PLan);
