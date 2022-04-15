import React, { useEffect } from 'react'
import { Alert } from 'components/Alert'
import CheckCircle from 'assets/icons/checkCircle.svg'
import { Text, useTheme } from 'utils/theme'
import { useTranslation } from 'react-i18next'

type LangChangeAlertProps = {
  isVisible: boolean
  dismiss: F0
}

export const LangChangeAlert = ({ isVisible, dismiss }: LangChangeAlertProps) => {
  const theme = useTheme()
  const { t } = useTranslation('settings')
  useEffect(() => {
    if (!isVisible) return
    const timeout = setTimeout(dismiss, 4000)

    return () => clearTimeout(timeout)
  }, [dismiss, isVisible])

  return (
    <Alert show={isVisible} onPress={dismiss}>
      <CheckCircle width={20} height={20} style={{ marginHorizontal: theme.spacing.m }} />
      <Text variant="regular15">
        <Text variant="bold15">{t('language')} </Text>
        {t('changed')}
      </Text>
    </Alert>
  )
}
