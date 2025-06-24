import React, { useState, memo, useEffect } from 'react';
import 
{ Text, TextInput, StyleSheet, View, TouchableOpacity, Animated, useWindowDimensions, ScrollView,useAnimatedValue} 
from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLanguage } from '../LanguageContext';
import SwitchLanguageBtn from '../components/SwitchLanguageBtn';
import LottieView from 'lottie-react-native';
import LogoImage from '../components/LogoImage';
import { smokingHabits } from '../apis/dashboard';
import { useUserInfo } from '../UserContext';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const QuestionsScreen = ({ route, navigation }) => {
  const { translation } = route.params;
  const { language, switchLanguage, isRtl } = useLanguage(); 
  const { token, user,  setSmokingHabits} = useUserInfo()

  const scrollX = useAnimatedValue(0);
  const {width: windowWidth} = useWindowDimensions();
  
  const [isLastPage, setIsLastPage]= useState(false);
  

  const [cigsCount, setCigsCount] = useState('');
  const [cigsCountPerPack, setCigsCountPerPack] = useState('');
  const [packCost, setPackCost] = useState('');
  const [currency, setCurrency] = useState('');
  const [quitTime, setQuitTime] = useState('');
  const [smokingYears, setSmokingYears] = useState('');

  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [isSelected3, setSelection3] = useState(false);
  const [isSelected4, setSelection4] = useState(false);
  const [isSelected5, setSelection5] = useState(false);


  const [selectedCurrency, setSelectedCurrency] = useState('JOD');
  const [price, setPrice] = useState('');

  const currencies = [
    { label: '🇯🇴 Jordanian Dinar', value: 'JOD' },
    { label: '🇺🇸 US Dollar', value: 'USD' },
    { label: '🇪🇺 Euro', value: 'EUR' },
    { label: '🇸🇦 Saudi Riyal', value: 'SAR' },
    { label: '🇦🇪 UAE Dirham', value: 'AED' },
    { label: '🇪🇬 Egyptian Pound', value: 'EGP' }
  ];

  const toggleTrigger = (key) => {
    setSelectedTriggers((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  const loadingScreen = async () => {  
    try {
      const payload = {
        user: user,
        cigs_per_day: +cigsCount,
        cigs_per_pack: cigsCountPerPack,
        pack_cost: packCost,
        currency: selectedCurrency,
        triggers: [
          isSelected1 ? "Bored" : null,
          isSelected2 ? "Frustrated" : null,
          isSelected3 ? "Drinking coffee" : null,
          isSelected4 ? "stressed or under pressure" : null,
          isSelected5 ? "Seeing someone else smoking" : null,
        ].filter(Boolean),
        years_of_smoking: smokingYears,
      };

      console.log("🥲🥲🥲🥲 ", payload)
  
  
      const res = await smokingHabits(token, payload);
      console.log("❌❌❌ ", res)
      setSmokingHabits(res)
      navigation.navigate("LoadingScreen");
    } catch (err) {
      console.error("🔥 Error in loadingScreen:", err);
    }
  };
  

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

  useEffect(()=>{
    console.log("💵 ", selectedCurrency)
  }, [selectedCurrency])
  

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
                { key: 'smokingYears', label: translation('smokingYears'), value: smokingYears, setValue: setSmokingYears },
                { key: 'triggers', label: translation('triggers')},
                ].map((question, index) => (
                    <View key={question.key} style={[styles.card, { width: 390 }]}>
                    <Text style={[styles.QuestionText, {fontFamily:isRtl?'Tajawal_500Medium':'Poppins_500Medium'}]}>{question.label}</Text>
                  {question.key=='cigsCount' &&(
                    <TextInput
                      style={[styles.input, {direction: isRtl ? 'rtl' : 'ltr'}]}
                      onChangeText={question.setValue}
                      value={question.value}
                      keyboardType='number-pad'
                      placeholder={translation('example')}
                      />
                  )}
                  {question.key=='cigsCountPerPack' &&(
                    <TextInput
                      style={[styles.input, {direction: isRtl ? 'rtl' : 'ltr'}]}
                      onChangeText={question.setValue}
                      value={question.value}
                      keyboardType='number-pad'
                      placeholder={translation('example')}
                      />
                  )}
                  {question.key=='packCost' &&(
                    <View style={styles.inputRow}>
                      <TextInput
                          style={[styles.inputCost, {direction: isRtl ? 'rtl' : 'ltr'}]}
                          onChangeText={question.setValue}
                          value={question.value}
                          keyboardType='numeric'
                          placeholder={translation('example')}
                        />
                      <Picker
                        selectedValue={selectedCurrency}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
                      >
                      {currencies.map((currency) => (
                        <Picker.Item key={currency.value} label={currency.label} value={currency.value} />
                        ))}
                      </Picker>
                    </View>
                  )}
                  {question.key=='smokingYears' &&(
                    <TextInput
                      style={[styles.input, {direction: isRtl ? 'rtl' : 'ltr'}]}
                      onChangeText={question.setValue}
                      value={question.value}
                      keyboardType='number-pad'
                      placeholder={translation('example')}
                      />
                  )}             
                    {question.key === 'triggers' ? (
                      <View style={{direction: isRtl ? 'row-reverse' : 'column'}}>
                        <TouchableOpacity
                          style={[styles.checkboxContainer, {direction: isRtl ? 'rtl' : 'ltr'}]}
                          onPress={() => setSelection1(!isSelected1 )}
                        >
                          <View style={styles.checkbox}>
                          {isSelected1 && <Ionicons name="checkmark" size={16} color="black"/>}
                          </View>
                          <Text style={[styles.label, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('Bored')} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.checkboxContainer, {direction: isRtl ? 'rtl' : 'ltr'}]}
                          onPress={() => setSelection2(!isSelected2)}
                        >
                          <View style={styles.checkbox}>
                          {isSelected2 && <Ionicons name="checkmark" size={16} color="black"/>}
                          </View>
                          <Text style={[styles.label, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('frustrated')} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.checkboxContainer, {direction: isRtl ? 'rtl' : 'ltr'}]}
                          onPress={() => setSelection3(!isSelected3)}
                        >
                          <View style={styles.checkbox}>
                          {isSelected3 && <Ionicons name="checkmark" size={16} color="black"/>}
                          </View>
                          <Text style={[styles.label, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('Drinking coffee')} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.checkboxContainer, {direction: isRtl ? 'rtl' : 'ltr'}]}
                          onPress={() => setSelection4(!isSelected4)}
                        >
                          <View style={styles.checkbox}>
                          {isSelected4 && <Ionicons name="checkmark" size={16} color="black"/> }
                          </View>
                          <Text style={[styles.label, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('stressed or under pressure')} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.checkboxContainer, {direction: isRtl ? 'rtl' : 'ltr'}]}
                          onPress={() => setSelection5(!isSelected5)}
                        >
                          <View style={styles.checkbox}>
                          {isSelected5 &&   <Ionicons name="checkmark" size={16} color="black"/>}
                          </View>
                          <Text style={[styles.label, {fontFamily:isRtl?'Tajawal_400Regular':'Poppins_400Regular'}]}>{translation('Seeing someone else smoke')} </Text>
                        </TouchableOpacity>
                      </View> 
                    ):
                    (
                     <>
                      </>
                      )
                    }  
                    </View>
                ))}
            </ScrollView>
  
            <View style={styles.indicatorContainer}>
                {Array(5).fill(0).map((_, index) => {
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
            <Text style={[styles.btnText, {fontFamily:isRtl?'Tajawal_700Bold':'Poppins_600SemiBold'}]}> {translation('getStartedBtn')} </Text>
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
    height: 400,
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
    fontSize: 21,
    color:'black',
    textAlign:'center',
    justifyContent:'center',
    marginLeft:10,
    marginBottom:10,
    paddingHorizontal:40,
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    marginHorizontal: 4,
    opacity:.5,
    marginBottom:30,
    marginTop:30
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    

  },
  input:{
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal:15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 15,
    width: '23%',
    height:50,
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
      borderWidth: 1.5,
      borderColor: '#6b8a6b',
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical:10,
      marginLeft:9
    
    },
    label: {
      fontSize: 16,
      fontFamily:'Poppins_400Regular'
    },
   picker:{
    width:150,
    paddingHorizontal:70,
    
   },
   inputCost:{
    fontSize: 15,
    textAlign: 'center',
    fontFamily:'Poppins_400Regular',
    marginLeft:10,

   },
   inputRow:{
    display:'flex',
    flexDirection:'row',
    gap:70,
    //justifyContent:'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 15,
    width: '70%',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    marginTop:7,
    fontFamily:'Poppins_400Regular'

   }
  
});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
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
  },
});



export default memo(QuestionsScreen);
