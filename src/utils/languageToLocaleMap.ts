import { enGB, pl } from 'date-fns/locale'
import i18next from 'i18next'

export type LanguagueToLocaleMap = {
  [key: string]: Locale
}

export const languagueToLocaleMap: LanguagueToLocaleMap = {
  pl,
  en: enGB,
}

export const mapLanguageToLocale = () => languagueToLocaleMap[i18next.language] ?? enGB
