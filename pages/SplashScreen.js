import React, { useState, useEffect } from 'react';
import 
{ Text, TextInput, StyleSheet, View, Button, TouchableOpacity, Animated, useWindowDimensions, ScrollView,useAnimatedValue,ImageBackground, Dimensions  } 
from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';


const { width, height } = Dimensions.get('window');

const SplashScreen = ({ route, navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignUp'); 
    }, 3000);

    return () => clearTimeout(timer); // cleanup if component unmounts early
  }, [navigation]);  
   
  
  return (
      <View style={styles.container}>
         <LottieView
        source={require('../assets/splash2.json')}
        autoPlay
        loop={false}
        style={{ width, height }}
      />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6b8a6b',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:0,
    paddingRight:0
  },


});



export default SplashScreen;
