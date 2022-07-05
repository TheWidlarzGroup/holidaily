import React, { useEffect, useState } from 'react'
import { locales } from 'utils/locale'
import { keys } from 'utils/manipulation'
import { setItem } from 'utils/localStorage'
import { useTranslation } from 'react-i18next'
import { DropdownWithRadio } from 'components/DropdownWithRadio'
import { Analytics } from 'services/analytics'
import { useGetNotificationsConfig } from 'utils/notifications/notificationsConfig'

type LanguageProps = {
  setLoadingTrue: F0
  setLoadingFalse: F0
}

export const Language = (props: LanguageProps) => {
  const { i18n, t } = useTranslation('settings')
  const [selectedLng, setSelectedLng] = useState(i18n.language)
  const { notify } = useGetNotificationsConfig()

  const changeLanguage = (lng: string) => {
    if (lng === selectedLng) return
    setSelectedLng(lng)
    props.setLoadingTrue()
    setItem('language', lng)
    Analytics().track('LANGUAGE_CHANGED', { language: lng })
    notify('successCustom', { params: { title: t('languageChanged') } })
  }

  useEffect(() => {
    if (selectedLng === i18n.language) return
    i18n.changeLanguage(selectedLng).then(() => {
      props.setLoadingFalse()
    })
  }, [selectedLng, i18n, props])

  const languages: Option<string>[] = keys(locales).map((language) => ({
    label: t(language),
    value: language,
  }))

  return (
    <DropdownWithRadio
      label={t('language')}
      options={languages}
      selectedOption={selectedLng}
      setSelectedOption={changeLanguage}
    />
  )
}
