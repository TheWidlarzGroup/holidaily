import { enGB, pl } from 'date-fns/locale'
import i18next from 'i18next'

export type LanguageLocalesMap = {
  [key: string]: Locale
}

export const locales: LanguageLocalesMap = {
  pl,
  en: enGB,
}

export const getCurrentLocale = () => locales[i18next.language] ?? enGB
export const setCurrentLocale = async (language: string) => i18next.changeLanguage(language)
