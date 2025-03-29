import { StyleSheet, I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import i18next from './locales/i18next';
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import SwitchLanguageBtn from './components/SwitchLanguageBtn';
import SignUp from './pages/SignUp';
import SignUpInfo from './pages/SignUpInfo';
import RNLocalize from 'react-native-localize';

const Stack = createNativeStackNavigator();

export default function App() {
  const { t } = useTranslation();

  const [language, setLanguage]= useState('en');

  /*const switchLanguage=()=>{
      var newLang= language=='en'?'ar': 'en';
      i18next.changeLanguage(newLang);
      setLanguage(newLang);
      if(newLang=="ar"){
        I18nManager.forceRTL(true);  // Force RTL layout
        setIsRTL(true);
      }else{
        I18nManager.forceRTL(false); // Force LTR layout
      setIsRTL(false);
      }

      I18nManager.allowRTL(true);
      RNLocalize.addEventListener('change', () => {
        I18nManager.forceRTL(isRTL);  // Update the layout direction
      });
  }

  useEffect(() => {
    const locale = RNLocalize.getLocales()[0].languageCode;
    switchLanguage(locale);
  }, []);
*/
  

const [isRTL, setIsRTL] = useState(false);

// Switch language and handle RTL layout change
const switchLanguage = () => {
  const newLang = language === 'en' ? 'ar' : 'en';
  i18next.changeLanguage(newLang); // Change the language using i18next
  setLanguage(newLang);

  if (newLang === 'ar') {
    I18nManager.forceRTL(true);  // Force RTL layout
    setIsRTL(true);
  } else {
    I18nManager.forceRTL(false); // Force LTR layout
    setIsRTL(false);
  }

  // Reload the app to apply RTL changes immediately
  I18nManager.allowRTL(true);
};

useEffect(() => {
  const locale = RNLocalize.getLocales()[0].languageCode;
  switchLanguage(locale); // Set language based on system locale
}, []);

return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SwitchLanguageBtn  switchLanguage={switchLanguage}  />
        <NavigationContainer>
          <Stack.Navigator 
              initialRouteName="SignUp"
              screenOptions={{
                headerShown: false
              }}
            >
            <Stack.Screen name="SignUp" component={SignUp} initialParams={{ translation: t }}/>
            <Stack.Screen name="SignUpInfo" component={SignUpInfo} initialParams={{ translation: t }}/>
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
