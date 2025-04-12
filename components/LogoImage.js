import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
import { useLanguage } from "../LanguageContext"; 

const LogoImage = () => {

    return (
       <Image
        style={styles.logo}
        source={require('../assets/final-logo.png')}
       />
    );

};

const styles = StyleSheet.create({
  logo:{
    position:'absolute', 
    top:60 , 
    left:10,
    padding:0,
    width:70,
    height:70,
    borderRadius:10,
    opacity:.9
}
  
});

export default LogoImage;
