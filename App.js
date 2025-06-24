import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Poppins_400Regular } from '@expo-google-fonts/poppins/400Regular';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins/600SemiBold';
import { Poppins_700Bold } from '@expo-google-fonts/poppins/700Bold';
import { Tajawal_400Regular, Tajawal_700Bold, Tajawal_500Medium } from '@expo-google-fonts/tajawal';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import SignUp from './pages/SignUp';
import SignUpInfo from './pages/SignUpInfo';
import ForgetPass from './pages/ForgetPass';
import SetPass from './pages/SetPass';
import QuestionsScreen from './pages/QuestionsScreen';
import SplashScreen from './pages/SplashScreen';
import LoadingScreen from './pages/LoadingScreen';
import Plan from './pages/Plan';
import GradualPlan from './pages/GradualPlan';
import ColdPlan from './pages/ColdPlan';
import HomeScreen from './pages/HomeScreen';
import Profile from './pages/Profile';
import ChatbotConvo from './pages/ChatbotConvo';
import EditProfile from './pages/EditProfile';
import DailyCheckin from './pages/DailyCheckin';
import ProfileInfo from './pages/ProfileInfo';
import FormerSmokingData from './pages/FormerSmokingData';
import Notifications from './pages/Notifications';





import { LanguageProvider, useLanguage } from './LanguageContext'; 
import { UserProvider } from './UserContext';

const Stack = createNativeStackNavigator();


export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold, 
    Poppins_700Bold,
    Tajawal_400Regular,
    Tajawal_500Medium,
    Tajawal_700Bold, 
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
    <UserProvider>
      <SafeAreaProvider>
      <StatusBar 
        translucent
        backgroundColor="#6b8a6b"  // Android only
        barStyle="dark-content"   // 'default', 'light-content', or 'dark-content'
        hidden={false} // true to hide the status bar
      />
        <AppNavigation />
      </SafeAreaProvider>
      </UserProvider>
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
          <Stack.Screen
            name="GradualPlan"
            component={GradualPlan}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="ColdPlan"
            component={ColdPlan}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="ChatbotConvo"
            component={ChatbotConvo}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="DailyCheckin"
            component={DailyCheckin}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="ProfileInfo"
            component={ProfileInfo}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="FormerSmokingData"
            component={FormerSmokingData}
            initialParams={{ translation: t }}
          />
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            initialParams={{ translation: t }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


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
