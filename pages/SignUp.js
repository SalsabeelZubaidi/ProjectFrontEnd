import React, { Component } from 'react';
import {Text, TextInput, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';

class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        type: "login",
        email: "", 
        password: "",
        firstName: "",
        lastName: "",
        gender: "",
        genderList: [{"title": "Female"}, {"title":"Male"}]
      }; 
    }

    switchType=(type)=>{
      this.setState({type: type})
    }

    enterApp=()=>{
        console.log('clicked');
    }

    render() {
      
      return (
        <SafeAreaProvider>
          <SafeAreaView style={styles.signup}>

          
            <View className="header">
                <Text>{this.props.translation('getStarted')}</Text>
            </View>

            <View style={styles.signupTabs}>
              <TouchableOpacity onPress={()=>this.switchType("login")}>
                <View className="tabItem"><Text>{this.props.translation('login')}</Text></View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.switchType("signup")}>
                <View className="tabItem"><Text>{this.props.translation('signup')}</Text></View>
              </TouchableOpacity>             
            </View>
        

            <View className="form" style={styles.form}>

              {this.state.type=="signup" &&(
                <View>
                  <View>
                    <Text>{this.props.translation('firstName')}</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={e=>{this.setState({firstName:e})}}
                      value={this.state.firstName}
                      inputMode="text"
                    />
                     </View>
                     <View>
                     <Text>{this.props.translation('lastName')}</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={e=>{this.setState({lastName:e})}}
                      value={this.state.lastName}
                      inputMode="text"
                    />
                  </View>
                </View>
              )}

              <View>
                <Text>{this.props.translation('email')}</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={e=>{this.setState({email:e})}}
                    value={this.state.email}
                    inputMode="email"
                  />
              </View>

              <View>
                <Text>{this.props.translation('password')}</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={e=>{this.setState({password:e})}}
                    value={this.state.passowrd}
                    inputMode="password"
                    secureTextEntry={true}
                  />
              </View>


                {this.state.type=="signup" && (
                    <>
                    <View>DOB</View>
                    <View>
                      <SelectDropdown
                        items={this.state.genderList}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                        }}
                        renderButton={(selectedItem, isOpened) => {
                          return (
                            <View style={styles.dropdownButtonStyle}>
                              <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.title) || 'Select Gender'}
                              </Text>
                            </View>
                          );
                        }}
                        renderItem={(item, index, isSelected) => {
                          return (
                            <Text> tst</Text>
                           /* <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                            </View>*/
                          );
                        }}
                        showsVerticalScrollIndicator={true}
                        dropdownStyle={styles.dropdownMenuStyle}
                      
                      />
                    </View>
                    </>
                )}

                <View>
                  <Button
                    onPress={()=>{enterApp()}}
                    title={this.props.translation(this.state.type+'Btn')}
                    color="#841584"
                  />
                </View>

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

  signupTabs: {
    flex: 3,  
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }, 

  input:{
    borderWidth: 1,
    borderColor: '#80808024',
    padding: 10,
    width: 250,
    borderRadius: 5,
    marginBottom: 10
  },


  dropdownButtonStyle: {
      width: 200,
      height: 50,
      backgroundColor: '#E9ECEF',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    form:{
  


    },
   
});

export default SignUp;