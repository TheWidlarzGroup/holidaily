import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { NativeModules, Platform } from 'react-native'

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SetttingManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier

const sliderTranslation = require('./translations/slider.json')

const resources = {
  pl: {
    slider: sliderTranslation,
  },
}

i18next.use(initReactI18next).init({
  resources,
  lng: locale.slice(0, 2) || 'en',
  fallbackLng: ['en', 'pl'],
  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
})
