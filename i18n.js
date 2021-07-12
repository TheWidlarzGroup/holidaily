import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { NativeModules } from 'react-native'
import { isAndroid, isIos } from './src/utils/layout'
import { locales } from './src/utils/locale'
import { formatDate } from './src/utils/formatDate'

let locale = ''

if (isAndroid) locale = NativeModules.I18nManager.localeIdentifier
else if (isIos) locale = NativeModules?.SettingsManager?.settings?.AppleLanguages[0] || 'en'

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
    format: (value, format, language) => {
      if (value instanceof Date) return formatDate(value, format, locales[language])
      return value
    },
    escapeValue: false,
  },
})
