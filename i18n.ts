import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { NativeModules } from 'react-native'
import { isAndroid, isIos } from './src/utils/layout'
import { locales } from './src/utils/locale'
import { DateFormat, formatDate } from './src/utils/formatDate'
import en from './translations/en.json'
import pl from './translations/pl.json'

let locale: 'en' | 'pl' = 'en'

export type Languages = typeof resources

if (isAndroid) locale = NativeModules.I18nManager.localeIdentifier as keyof Languages
else if (isIos)
  locale = (NativeModules?.SettingsManager?.settings?.AppleLanguages[0] || 'en') as keyof Languages

const resources = {
  pl,
  en,
}

i18next.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v3',
  lng: locale,
  keySeparator: false,
  debug: __DEV__,
  interpolation: {
    format: (value: Date, format, language) => {
      if (value instanceof Date)
        return formatDate(value, format as DateFormat, locales[language as keyof Languages])
      return value
    },
    escapeValue: false,
  },
})
