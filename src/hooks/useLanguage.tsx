import { useEffect, useState } from 'react'
import i18next from 'i18next'

export const useLanguage = () => {
  const [language, setLanguage] = useState(i18next.language)

  useEffect(() => {
    i18next.on('languageChanged', setLanguage)
    return () => {
      i18next.off('languageChanged', setLanguage)
    }
  }, [])

  return [language]
}
