import React, { Component } from 'react';
import {Text, TextInput, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import RNPickerSelect from 'react-native-picker-select';

import DateTimePicker from '@react-native-community/datetimepicker';
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
        dob: new Date(),
        gender: "",
        genderOptions: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }],
        showDatePicker: false,
      }; 
    }

    switchType=(type)=>{
      this.setState({type: type})
    }

    accessApp=()=>{
        console.log('clicked');
        if(this.state.type=="signup"){
          this.props.navigation.navigate('SignUpInfo');
        }
    }

    handleDateChange = (date) => {
      this.setState({ dob: date }); // Set the selected date of birth
    };

    handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || this.state.dob;
      this.setState({ dob: currentDate, showDatePicker: false }); 
    };
  
    showDatePicker = () => {
      this.setState({ showDatePicker: true });
    };

    handleGenderChange = (selectedItem) => {
      this.setState({ gender: selectedItem.title }); 
    };

    render() {
      const { translation } = this.props.route.params;
      return (
        <SafeAreaProvider>
          <SafeAreaView style={styles.signup}>

            <View style={styles.signupHeader}>
                <Text style={styles.signupTitle}>{translation('signupTitle')}</Text>
                <Text style={styles.signupSubTitle}>{translation('signupSubTitle')}</Text>
            </View>

            <View style={styles.signupTabs}>
              <TouchableOpacity onPress={()=>this.switchType("login")}>
                <View style={styles.signupTabItem}><Text>{translation('login')}</Text></View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.switchType("signup")}>
                <View style={styles.signupTabItem}><Text>{translation('signup')}</Text></View>
              </TouchableOpacity>             
            </View>
        

            <View style={styles.signupForm}>

              {this.state.type=="signup" &&(
                <View>
                  <View>
                    <Text>{translation('firstName')}</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={e=>{this.setState({firstName:e})}}
                      value={this.state.firstName}
                      inputMode="text"
                    />
                     </View>
                     <View>
                     <Text>{translation('lastName')}</Text>
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
                <Text>{translation('email')}</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={e=>{this.setState({email:e})}}
                    value={this.state.email}
                    inputMode="email"
                  />
              </View>

              <View>
                <Text>{translation('password')}</Text>
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
                   
                    <View>
                      <View style={styles.inputContainer}>
                        <Text>{translation('dob')}</Text>
                        <TouchableOpacity onPress={this.showDatePicker}>
                          <View style={styles.input}>
                            <Text>{this.state.dob.toLocaleDateString()}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                      {this.state.showDatePicker && (
                        <DateTimePicker
                          value={this.state.dob}
                          mode="date"
                          display="default"
                          onChange={this.handleDateChange}
                          minimumDate={new Date(1900, 0, 1)} 
                          maximumDate={new Date()}
                          placeholder="M/d/y"
                        />
                      )}
                    </View>

                    <View>
                    <RNPickerSelect
                        placeholder={{
                          label: 'Select gender...',
                          value: null,
                        }}
                        items={this.state.genderOptions}
                        onValueChange={(value) => this.setState({gender: value})}
                        value={this.state.gender}
                        style={pickerSelectStyles}
                      />
                    </View>
                    <View style={styles.dropdownContainer}>
                      <Text>{translation('gender')}</Text>
                      <SelectDropdown
                        data={this.state.genderList} 
                        onSelect={this.handleGenderChange} 
                        buttonTextAfterSelection={(selectedItem) => selectedItem.title} 
                        rowTextForSelection={(item) => item.title}
                        buttonStyle={styles.dropdownButtonStyle}
                        buttonTextStyle={styles.dropdownButtonTxtStyle}
                        dropdownStyle={styles.dropdownMenuStyle}
                        renderDropdownIcon={() => <Text>▼</Text>}
                        renderButtonText={(selectedItem) => {
                          console.log("selectedItem", selectedItem);
                          return selectedItem ? selectedItem.title : 'Select Gender';
                        }}
                      />
                    </View>
                    </>
                )}

                <View style={{borderRadius: 10 , overflow: 'hidden', marginTop:10}}>
                  <Button 
                    onPress={()=>this.accessApp()}
                    title={translation(this.state.type+'Btn')}
                    color="#6b8a6b"
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
    fontSize:11, 
    color: 'black'
  },
  signupHeader: {
    textAlign: 'center'
  },
  signupTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  signupSubTitle: {
    color: '#b4b4b4', 
    fontSize: 12,
    textAlign: 'center'
  },
  signupTabs: {
    display: 'flex',  
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#f5f6f9',
    fontWeight:'bold',
    marginTop: 3,
    padding: 7,
    borderRadius: 10,
    marginBottom:30,
    marginTop:15,
    gap: 50,
    paddingLeft:50,
    paddingRight:50,
    height: 'fit-content'
  }, 
  signupTabItem:{
    borderRadius: 5
  },
  signupForm:{
    marginTop: 4                                                                                                  
  },



  input:{
    borderWidth: 1,
    borderColor: '#80808024',
    padding: 10,
    width: 250,
    borderRadius: 5,
    marginBottom: 10
  },


  
    
    
   
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // To ensure the placeholder text is not cut off
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // To ensure the placeholder text is not cut off
  },
});

export default SignUp;
