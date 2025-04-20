import React,{memo} from "react";
import {StyleSheet, Image } from "react-native";

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
    top:30 , 
    left:10,
    padding:0,
    width:53,
    height:45,
    borderRadius:10,
    opacity:.9,
    
}
  
});

export default memo(LogoImage);
