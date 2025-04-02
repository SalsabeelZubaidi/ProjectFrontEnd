import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import SignUp from './pages/SignUp';
import SignUpInfo from './pages/SignUpInfo';
import ForgetPass from './pages/ForgetPass';
import SetPass from './pages/SetPass';
import QuestionsScreen from './pages/QuestionsScreen';

import { LanguageProvider, useLanguage } from './LanguageContext'; 

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <LanguageProvider>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </LanguageProvider>
  );
}


function AppNavigation() {
  const { t, i18n } = useTranslation();
  
  return (
    <SafeAreaView style={styles.container}>
      
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignUp"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="SignUpInfo"
            component={SignUpInfo}
            initialParams={{ translation: t }}
          />
           <Stack.Screen
            name="ForgetPass"
            component={ForgetPass}
            initialParams={{ translation: t }}
          />
           <Stack.Screen
            name="SetPass"
            component={SetPass}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="QuestionsScreen"
            component={QuestionsScreen}
            initialParams={{ translation: t }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
/*export default function App() {
  const {t, i18n} = useTranslation();

  const [key, setKey] = useState(0);
  const [language, setLanguage]= useState('en');

  const switchLanguage = () => {
    var newLang= language=="ar"?"en": "ar";
    i18n.changeLanguage(newLang).then(() =>{
      I18nManager.allowRTL(language == 'ar');
      I18nManager.forceRTL(language == 'ar');
      setLanguage(newLang);
      setKey(prevKey => prevKey + 1);
    }).catch(err => console.log(err));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SwitchLanguageBtn  switchLanguage={switchLanguage}  />
        <NavigationContainer>
          <Stack.Navigator 
            key={key}
            detachInactiveScreens={false}
            initialRouteName="SignUp"
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="SignUp" component={SignUp} initialParams={{ translation: t, i18n: i18n}}/>
            <Stack.Screen name="SignUpInfo" component={SignUpInfo} initialParams={{ translation: t }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}*/

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
