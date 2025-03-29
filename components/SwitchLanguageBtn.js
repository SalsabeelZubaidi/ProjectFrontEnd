import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'

const SwitchLanguageBtn = ({switchLanguage}) => {
    return (
        <View style={{ zIndex: 100, bottom:400 , padding:0}} >
         <TouchableOpacity onPress={switchLanguage}>
            <FontAwesomeIcon icon={faGlobe} />
         </TouchableOpacity> 
        </View>
    );
};

export default SwitchLanguageBtn;
