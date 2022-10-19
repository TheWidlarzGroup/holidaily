import React from 'react'
import { SwipeableModalRegular } from 'components/SwipeableModalRegular'
import { useTranslation } from 'react-i18next'
import { AboutDescription } from 'screens/about/components/AboutDescription'

type AboutModalProps = {
  isOpen: boolean
  onHide: F0
}

export const AboutModal = (p: AboutModalProps) => {
  const { t } = useTranslation('welcome')
  return (
    <SwipeableModalRegular
      addTopOffset
      hasIndicator
      title={t('about')}
      buttonLabel={t('aboutButton')}
      buttonAction={p.onHide}
      {...p}>
      <AboutDescription isFromWelcomeScreen />
    </SwipeableModalRegular>
  )
}
