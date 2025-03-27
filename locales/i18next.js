import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import english from './en.json';
import arabic from './ar.json';
  
export const languageRecources= {
  en: {
    translation: english
  },
  ar: {
    translation: arabic
  }
};

i18n.use(initReactI18next).init({
    resources: languageRecources,
    lng: 'en',
    fallbackLng: 'en'
  });

export default i18n;