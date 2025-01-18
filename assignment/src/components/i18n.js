import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "Rick and Morty Characters",
      status: "Status",
      species: "Species",
      gender: "Gender",
      origin: "Origin",
      sort: "Sort by Name and Origin",
      previous: "Previous",
      next: "Next",
      page: "Page",
      language: "Language",
    },
  },
  de: {
    translation: {
      title: "Rick und Morty Charaktere",
      status: "Status",
      species: "Spezies",
      gender: "Geschlecht",
      origin: "Herkunft",
      sort: "Nach Name und Herkunft sortieren",
      previous: "Zurück",
      next: "Weiter",
      page: "Seite",
      language: "Sprache",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
