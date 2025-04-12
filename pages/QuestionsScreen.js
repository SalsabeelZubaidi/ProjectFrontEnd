import React, { useState } from 'react';
import 
{ Text, TextInput, StyleSheet, View, Button, TouchableOpacity, Animated, useWindowDimensions, ScrollView,useAnimatedValue,ImageBackground, Dimensions} 
from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import { I18nManager } from 'react-native';
import LottieView from 'lottie-react-native';
import LogoImage from '../components/LogoImage';

const { width, height } = Dimensions.get('window');

const QuestionsScreen = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage } = useLanguage(); 

  const scrollX = useAnimatedValue(0);
  const {width: windowWidth} = useWindowDimensions();
    
  const [cigsCount, setCigsCount] = useState('');
  const [cigsCountPerPack, setCigsCountPerPack] = useState('');
  const [packCost, setPackCost] = useState('');
  const [quitTime, setQuitTime] = useState('');

  const [isLastPage, setIsLastPage]= useState(false);
  const [isFirstPage, setIsFirstPage]= useState(false);

  const forgetPassPage = () => {
      //navigation.navigate('ForgetPass');
  };

  const loadingScreen=()=>{
    navigation.navigate('LoadingScreen');
  }

  const handleScroll = ({ layoutMeasurement, contentOffset, contentSize })=> {
    if (layoutMeasurement && contentOffset && contentSize) {
      const paddingToRight = 20;
      if (layoutMeasurement.width + contentOffset.x >= contentSize.width - paddingToRight) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
      if (contentOffset.x < paddingToRight) {
        setIsFirstPage(true);
      } else {
        setIsFirstPage(false);
      }
    }
  };
  

  return (
    <SafeAreaProvider style={{backgroundColor:'white' }}>
      <SafeAreaView style={styles.container}>
      <>
      <View style={styles.bg}>
         <LottieView style={{flex: 1 , opacity:.35}} source={require('../assets/bg4.json')} autoPlay loop speed={.2} ></LottieView>
         
      </View>
      <LogoImage/>
      <SwitchLanguageBtn switchLanguage={() =>{ switchLanguage(language === 'ar' ? 'en' : 'ar') }} />

      {/* {
        isFirstPage &&(
          <Text style={styles.header}> {translation('Qscreen')}</Text>
        )
      }
       */}
        
        <View style={styles.scrollContainer}>
          <ScrollView 
            horizontal={true}
            pagingEnabled={true} 
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
                listener: (e) => handleScroll(e.nativeEvent),
              }
            )} 
            scrollEventThrottle={16}>
            {[
                { key: 'cigsCount', label: translation('cigsCount'), value: cigsCount, setValue: setCigsCount },
                { key: 'cigsCountPerPack', label: translation('cigsCountPerPack'), value: cigsCountPerPack, setValue: setCigsCountPerPack },
                { key: 'packCost', label: translation('packCost'), value: packCost, setValue: setPackCost },
                { key: 'quitTime', label: translation('quitTime'), value: quitTime, setValue: setQuitTime },
                ].map((question, index) => (
                    <View key={question.key} style={[styles.card, { width: 390 }]}>
                    <Text style={styles.QuestionText}>{question.label}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={question.setValue}
                        value={question.value}
                        keyboardType='number-pad'
                        placeholder="e.g., 10"
                        />
                        
                        
                    </View>
                ))}
            </ScrollView>
            
            <View style={styles.indicatorContainer}>
                {Array(4).fill(0).map((_, index) => {
                    const width = scrollX.interpolate({
                    inputRange: [
                        windowWidth * (index - 1),
                        windowWidth * index,
                        windowWidth * (index + 1),
                    ],
                    outputRange: [8, 16, 8],
                    extrapolate: 'clamp',
                    });

                    return <Animated.View key={index} style={[styles.normalDot, { width }]} />;
                })}
            </View>

            

          
        </View>

        {
          isLastPage && (
            <TouchableOpacity style={styles.btn} onPress={loadingScreen}>
              <Text style={styles.btnText}> {translation('getStartedBtn')} </Text>
            </TouchableOpacity>    
          
          )
        }
      </>
      </SafeAreaView>
    </SafeAreaProvider>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    height: 900,
    position: 'absolute',
    width:900  
  },
  // header:{
  //   // fontSize:17,
  //   // padding:23,
  //   // textAlign:'center',
  //   // borderRadius:30,
  //   // backgroundColor:'#F8FAFC',
  //   backgroundColor: 'white',
  //   margin:13,
  //   borderRadius: 16,
  //   borderColor:'white',
  //   padding: 20,
  //   shadowColor: '#000',
  //   shadowOpacity: .05,
  //   shadowRadius: 10,
  //   elevation: .5,
  //   fontSize: 18,
  //   color: '#333',
  //   textAlign: 'left',
  //   fontFamily:'Poppins_700Bold',
  //   color:'#3F4F44' 
  // },
  card: {
    display:'flex', 
    alignItems: 'center',
    justifyContent:'center',
    width:300,
    marginLeft:13
  },

  QuestionText: {
    fontSize: 22,
    color:'black',
    textAlign:'center',
    justifyContent:'center',
    marginLeft:10
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    marginHorizontal: 4,
    opacity:.5,
    marginBottom:30
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  input:{
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 18,
    width: '30%',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    marginTop:15,
    fontFamily:'Poppins_600SemiBold'
  },
  btn: {
    padding:10,
    borderRadius:12,
    backgroundColor:'#F8FAFC',
    marginLeft:15,
    marginTop:12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    
  },
  btnText:{
    fontFamily:'Poppins_700Bold',
    fontSize:20,
    }
});



export default QuestionsScreen;
