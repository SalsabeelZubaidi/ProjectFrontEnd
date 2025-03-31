import React, { Component } from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';

class SignUpInfo extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }; 
    }


    getStarted=()=>{
        console.log('getStarted');
    }
 

    render() {

      const { translation } = this.props.route.params;

      return (
        <SafeAreaProvider>
          <SafeAreaView style={styles.signup}>

          
            <View className="header">
                <Text>{translation('getStarted')}</Text>
            </View>
            <View>
              <Button
                onPress={()=>this.getStarted()}
                title={translation('getStarted')}
                color="#841584"
              />
            </View>

          </SafeAreaView>
        </SafeAreaProvider>
       
      );
    }
}


const styles = StyleSheet.create({
  signup: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
   
});

export default SignUpInfo;