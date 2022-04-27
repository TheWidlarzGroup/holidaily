import React, { useEffect, useState } from 'react'
import { locales } from 'utils/locale'
import { keys } from 'utils/manipulation'
import { setItem } from 'utils/localStorage'
import { useTranslation } from 'react-i18next'
import { useBooleanState } from 'hooks/useBooleanState'
import { DropdownWithRadio } from 'components/DropdownWithRadio'
import { LangChangeAlert } from './LangChangeAlert'

type Props = {
  setLoadingTrue: F0
  setLoadingFalse: F0
}

export const Language = (props: Props) => {
  const { i18n, t } = useTranslation('settings')
  const [selectedLng, setSelectedLng] = useState(i18n.language)

  const [isChangeAlertVisible, { setTrue: showChangeAlert, setFalse: hideChangeAlert }] =
    useBooleanState(false)

  const changeLanguage = (lng: string) => {
    if (lng === selectedLng) return
    hideChangeAlert()
    setSelectedLng(lng)
    props.setLoadingTrue()
    setItem('language', lng)
  }

  useEffect(() => {
    if (selectedLng === i18n.language) return
    i18n.changeLanguage(selectedLng).then(() => {
      props.setLoadingFalse()
      showChangeAlert()
    })
  }, [selectedLng, i18n, props, showChangeAlert])

  const convertedLanguages = keys(locales).map((language) => t(language))

  return (
    <>
      <DropdownWithRadio
        label={t('language')}
        options={keys(locales)}
        selectedOption={selectedLng}
        optionsLabels={convertedLanguages}
        setSelectedOption={changeLanguage}
      />
      <LangChangeAlert isVisible={isChangeAlertVisible} dismiss={hideChangeAlert} />
    </>
  )
}
