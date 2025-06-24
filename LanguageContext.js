import React, { createContext, useState, useContext, useEffect} from 'react';
import { I18nManager } from 'react-native';
import i18next from './locales/i18next';
import { getUser } from './apis/user';
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18next.language || 'en');
  const [isRtl, setIsRtl] = useState("");
  const [email, setEmail] = useState('');


  const switchLanguage = (newLang) => {
    i18next.changeLanguage(newLang).then(() => {
        const isRtlLanguage = newLang === 'ar'; 
        I18nManager.allowRTL(isRtlLanguage);
        I18nManager.forceRTL(isRtlLanguage);
        setLanguage(newLang);
        setIsRtl(isRtlLanguage);
        
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    setLanguage(i18next.language);
  }, [i18next.language])

  return (
    <LanguageContext.Provider value={{ isRtl, language, switchLanguage, email, setEmail,}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
