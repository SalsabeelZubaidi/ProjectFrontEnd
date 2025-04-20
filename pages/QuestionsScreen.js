import React, { useState, memo } from 'react';
import 
{ Text, TextInput, StyleSheet, View, TouchableOpacity, Animated, useWindowDimensions, ScrollView,useAnimatedValue} 
from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import LottieView from 'lottie-react-native';
import LogoImage from '../components/LogoImage';


const QuestionsScreen = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage } = useLanguage(); 

  const scrollX = useAnimatedValue(0);
  const {width: windowWidth} = useWindowDimensions();
  
  const [isLastPage, setIsLastPage]= useState(false);
  

  const [cigsCount, setCigsCount] = useState('');
  const [cigsCountPerPack, setCigsCountPerPack] = useState('');
  const [packCost, setPackCost] = useState('');
  const [quitTime, setQuitTime] = useState('');
  const [smokingYears, setSmokingYears] = useState('');

  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [isSelected3, setSelection3] = useState(false);
  const [isSelected4, setSelection4] = useState(false);
  const [isSelected5, setSelection5] = useState(false);


  const toggleTrigger = (key) => {
    setSelectedTriggers((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
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
                { key: 'smokingYears', label: translation('smokingYears'), value: smokingYears, setValue: setSmokingYears },
                { key: 'triggers', label: translation('triggers')},
                ].map((question, index) => (
                    <View key={question.key} style={[styles.card, { width: 390 }]}>
                    <Text style={styles.QuestionText}>{question.label}</Text>
                    {question.key === 'triggers' ? (
                      <View>
                        <TouchableOpacity
                          style={styles.checkboxContainer}
                          onPress={() => setSelection1(!isSelected1 )}
                        >
                          <View style={styles.checkbox}>
                          {isSelected1 && <View style={styles.checked}/>}
                          </View>
                          <Text style={styles.label}>{translation('Bored')} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.checkboxContainer}
                          onPress={() => setSelection2(!isSelected2)}
                        >
                          <View style={styles.checkbox}>
                          {isSelected2 && <View style={styles.checked} />}
                          </View>
                          <Text style={styles.label}>{translation('frustrated')} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.checkboxContainer}
                          onPress={() => setSelection3(!isSelected3)}
                        >
                          <View style={styles.checkbox}>
                          {isSelected3 && <View style={styles.checked} />}
                          </View>
                          <Text style={styles.label}>{translation('Drinking coffee')} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.checkboxContainer}
                          onPress={() => setSelection4(!isSelected4)}
                        >
                          <View style={styles.checkbox}>
                          {isSelected4 && <View style={styles.checked} />}
                          </View>
                          <Text style={styles.label}>{translation('stressed or under pressure')} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.checkboxContainer}
                          onPress={() => setSelection5(!isSelected5)}
                        >
                          <View style={styles.checkbox}>
                          {isSelected5 && <View style={styles.checked} />}
                          </View>
                          <Text style={styles.label}>{translation('Seeing someone else smoke')} </Text>
                        </TouchableOpacity>
                      </View>
                    ):(  
                    <TextInput
                      style={styles.input}
                      onChangeText={question.setValue}
                      value={question.value}
                      keyboardType='number-pad'
                      placeholder="e.g.,10"
                      />)
                    }  
                    </View>
                ))}
            </ScrollView>
  
            <View style={styles.indicatorContainer}>
                {Array(6).fill(0).map((_, index) => {
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
            <View>
            <TouchableOpacity style={styles.btn} onPress={loadingScreen}>
            <Text style={styles.btnText}> {translation('getStartedBtn')} </Text>
            </TouchableOpacity>    
            </View>
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
 
  card: {
    display:'flex', 
    alignItems: 'center',
    justifyContent:'center',
    width:300,
    marginLeft:10,
    marginRight:10
  },

  QuestionText: {
    fontSize: 19.5,
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
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 18,
    width: '25%',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    marginTop:15,
    fontFamily:'Poppins_400Regular'
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
    color:'black',
    opacity:.56
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: '#6b8a6b',
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical:10,
      borderRadius:15
    },
    checked: {
      width: 15,
      height: 16,
      backgroundColor: '#6b8a6b',
      borderBlockColor:30,
      borderRadius: 10, overflow: 'hidden', 
      width: 17,
      height: 17,
    },
    label: {
      fontSize: 16,
      fontFamily:'Poppins_400Regular'
    },
    
});



export default memo(QuestionsScreen);
