import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { NativeModules, Platform } from 'react-native'

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier

const plTranslation = require('./translations/pl.json')
const enTranslation = require('./translations/en.json')

const resources = {
  pl: {
    ...plTranslation,
  },
  en: {
    ...enTranslation,
  },
}

i18next.use(initReactI18next).init({
  resources,
  lng: locale.slice(0, 2),
  fallbackLng: 'en',
  keySeparator: false,
  debug: __DEV__,
  interpolation: {
    escapeValue: false,
  },
})
