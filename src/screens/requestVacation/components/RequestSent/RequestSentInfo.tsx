import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'utils/theme'

export const RequestSentInfo = () => {
  const { t } = useTranslation('requestVacation')
  return (
    <>
      <Text variant="heading4" marginBottom="xxl">
        {t('sent')}
      </Text>
      <Text variant="body1" marginBottom="l">
        {t('waitForApproval')}
      </Text>
      <Text variant="body1">{t('findRequests')}</Text>
    </>
  )
}
