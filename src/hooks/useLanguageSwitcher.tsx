import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import enTranslations from "../translations/en.json";
import deTranslations from "../translations/de.json";
import frTranslations from "../translations/fr.json";
import esTranslations from "../translations/es.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      de: { translation: deTranslations },
      fr: { translation: frTranslations },
      es: { translation: esTranslations },
    },
    lng: "en",
    interpolation: { escapeValue: false },

  });

export const useLanguageSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getLanguageFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get("lang") || "en";
  };

  const [language, setLanguage] = useState(getLanguageFromURL());

  const changeLanguage = async ( lng: string ) => {
    i18n.changeLanguage(lng).then(() => {
      setLanguage(lng);
      const params = new URLSearchParams(location.search);
      params.set("lang", lng);
      navigate(`?${params.toString()}`);
    });
  };

  useEffect(() => {
    const handleLanguageChange = ( lng: string ) => {
      setLanguage(lng);
    };
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n.language]);

  useEffect(() => {
    const urlLang = getLanguageFromURL();
    if ( urlLang !== i18n.language ) {
      i18n.changeLanguage(urlLang);
    }
  }, [location.search, language, i18n.language]);

  return { language, changeLanguage };
};
