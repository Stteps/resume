import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from "i18next-http-backend";
import LngDetector from 'i18next-browser-languagedetector';

i18n.use(HttpApi).use(LngDetector).use(initReactI18next).init({
    // lng: document.querySelector("html").lang,
    debug: true,
    fallbackLng: 'en',
    ns: [
        "common",
        "glossary",
        "Index/IndexApp",
        "Index/MainPanel",
        "Index/WorkPanel",
        "Index/EducationPanel",
        "Index/SkillsPanel",
        "Index/PortfolioPanel",
    ],
    defaultNS: "common",
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
        loadPath: `${__webpack_public_path__}locales/{{lng}}/{{ns}}.${__webpack_hash__}.json`,
    },
    react: { useSuspense: false },
});


export const getLanguage = () => {
  return i18n.language ||
    (typeof window !== 'undefined' && window.localStorage.i18nextLng) ||
    'en';
};

export default i18n;