import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Poppins_400Regular } from '@expo-google-fonts/poppins/400Regular';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins/600SemiBold';
import { Poppins_700Bold } from '@expo-google-fonts/poppins/700Bold';
import SignUp from './pages/SignUp';
import SignUpInfo from './pages/SignUpInfo';
import ForgetPass from './pages/ForgetPass';
import SetPass from './pages/SetPass';
import QuestionsScreen from './pages/QuestionsScreen';
import SplashScreen from './pages/SplashScreen';
import LoadingScreen from './pages/LoadingScreen';
import Plan from './pages/Plan';




import { LanguageProvider, useLanguage } from './LanguageContext'; 

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold, 
    Poppins_700Bold 
  });


  useEffect(() => {
    if (fontsLoaded) {
      const oldRender = Text.render;
      Text.render = function (...args) {
        const origin = oldRender.call(this, ...args);
        return React.cloneElement(origin, {
          style: [{ fontFamily: 'Poppins_600SemiBold' }, origin.props.style],
        });
      };
    }
  }, [fontsLoaded]);

  //Show loading while font is loading
  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading fonts...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

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
      <NavigationContainer style={{backgroundColor:'white'}}>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
            contentStyle: { paddingLeft: 0, paddingRight: 0 }
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
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="Plan"
            component={Plan}
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
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:0,
    paddingRight:0,
    fontFamily:'Poppins_500Medium'
  },
  regular: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
  },
  medium: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
  },
  bold: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
  },
});
