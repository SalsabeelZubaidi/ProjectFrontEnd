import React, {useEffect, memo } from 'react';
import 
{StyleSheet, View, Dimensions  } 
from 'react-native';

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



export default memo(SplashScreen);
