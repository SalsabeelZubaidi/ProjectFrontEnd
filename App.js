import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './pages/SignUp';
import i18next from './locales/i18next';
import {useTranslation } from 'react-i18next';
import { useState } from "react";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SwitchLanguageBtn from './components/SwitchLanguageBtn';

const Stack = createNativeStackNavigator();

export default function App() {
  const { t } = useTranslation();

  const [language, setLanguage]= useState('en');

  const switchLanguage=()=>{
      var newLang= language=='en'?'ar': 'en';
      i18next.changeLanguage(newLang);
      setLanguage(newLang);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SwitchLanguageBtn  switchLanguage={switchLanguage}  />
        <NavigationContainer>
          <Stack.Navigator 
              screenOptions={{
                headerShown: false
              }}
            >
            <Stack.Screen
              name="SignUp"
            >
            {(props) => <SignUp {...props} translation={t} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:20
  },
  

  
  
  
});
