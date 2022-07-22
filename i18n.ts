import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { NativeModules } from 'react-native'
import { getItem } from 'utils/localStorage'
import { isAndroid, isIos } from './src/utils/layout'
import { locales } from './src/utils/locale'
import { DateFormat, formatDate } from './src/utils/formatDate'
import en from './translations/en.json'
import pl from './translations/pl.json'

const supportedLngs = ['pl', 'en']
let locale = 'en'
export type Languages = typeof resources

if (isAndroid) locale = NativeModules.I18nManager.localeIdentifier || 'en'
else if (isIos) locale = NativeModules?.SettingsManager?.settings?.AppleLanguages[0] || 'en'

if (/en_*/.test(locale)) locale = 'en'
if (/pl_*/.test(locale)) locale = 'pl'
if (!supportedLngs.includes(locale)) locale = 'en'
const resources = {
  pl,
  en,
}

const initI18 = async () => {
  const lang = await getItem('language')
  i18next.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v3',
    lng: lang || locale,
    fallbackLng: ['en', 'pl'],
    keySeparator: false,
    // debug: __DEV__,
    interpolation: {
      // TODO: get rid of type assertions
      format: (value: Date, format, language) => {
        if (value instanceof Date)
          return formatDate(value, format as DateFormat, locales[language as keyof Languages])
        return value
      },
    },
  })
}
initI18()
