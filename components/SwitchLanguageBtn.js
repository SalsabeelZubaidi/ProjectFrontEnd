import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
import { useLanguage } from "../LanguageContext"; 

const SwitchLanguageBtn = ({switchLanguage}) => {

    return (
        <View style={styles.logo}>
         <TouchableOpacity onPress={ switchLanguage}>
            <FontAwesomeIcon icon={faGlobe} size={25} color='#6b8a6b'/>
         </TouchableOpacity> 
        </View>
    );

};


const styles = StyleSheet.create({   
    logo:{
        position:'absolute',
        top: 75,
        right:10,
        color:'#6b8a6b'
        
        
    }
});
  
export default SwitchLanguageBtn;
