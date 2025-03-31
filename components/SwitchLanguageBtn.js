import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
import { useLanguage } from "../LanguageContext"; 

const SwitchLanguageBtn = ({switchLanguage}) => {

    return (
        <View  style={{ position:'absolute', zIndex: 100, top:10 , right:10 , padding:0}}>
         <TouchableOpacity onPress={ switchLanguage}>
            <FontAwesomeIcon icon={faGlobe} />
         </TouchableOpacity> 
        </View>
    );

};

export default SwitchLanguageBtn;
