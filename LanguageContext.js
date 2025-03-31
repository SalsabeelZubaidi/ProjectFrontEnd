import React, { createContext, useState, useContext, useEffect} from 'react';
import { I18nManager } from 'react-native';
import i18next from './locales/i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18next.language || 'en');

  const switchLanguage = (newLang) => {
    i18next.changeLanguage(newLang).then(() => {
        const isRtlLanguage = newLang === 'ar'; 
        I18nManager.allowRTL(isRtlLanguage);
        I18nManager.forceRTL(isRtlLanguage);
        setLanguage(newLang);
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    setLanguage(i18next.language);
    console.log(i18next.language)
  }, [i18next.language]);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
