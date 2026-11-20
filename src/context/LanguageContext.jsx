import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('sanjeevan_lang') || 'en';
  });

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'mr' : 'en';
    setLang(nextLang);
    localStorage.setItem('sanjeevan_lang', nextLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'mr' ? 'mr' : 'en';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, isMarathi: lang === 'mr' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
