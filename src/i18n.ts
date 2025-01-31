// filepath: src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en/translation.json';
import trTranslation from '../locales/tr/translation.json';
import arTranslation from '../locales/ar/translation.json';
import frTranslation from '../locales/fr/translation.json';
import deTranslation from '../locales/de/translation.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      return storedLanguage;
    } else {
      return 'tr';
    }
  } catch (error) {
    console.error('Failed to load language:', error);
    return 'tr';
  }
};

loadLanguage().then((lng) => {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslation
        },
        tr: {
          translation: trTranslation
        },
        ar: {
          translation: arTranslation
        },
        fr: {
          translation: frTranslation
        },
        de: {
          translation: deTranslation
        }
      },
      lng: lng, // varsayılan dil
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
});

export default i18n;