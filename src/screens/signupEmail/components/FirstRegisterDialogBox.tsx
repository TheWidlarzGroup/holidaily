import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme/index'
import { TextLink } from 'components/TextLink'
import { useRetriggerAccountConfirmationEmail } from 'hooks/useRetriggerAccountConfirmationEmail'
import { ActivityIndicator } from 'react-native'
import { colors } from 'utils/theme/colors'
import { createAlert } from 'utils/createAlert'

export const FirstRegisterDialogBox: FC = () => {
  const { handleRetriggerAccountConfirmationEmail, isLoading, confirmErrorMessage } =
    useRetriggerAccountConfirmationEmail()
  const { t } = useTranslation('modal')

  const handleResendConfirmationEmail = () => {
    handleRetriggerAccountConfirmationEmail()
  }

  useEffect(() => {
    if (confirmErrorMessage) createAlert('Resend Error', confirmErrorMessage)
  }, [confirmErrorMessage])

  if (isLoading) {
    return <ActivityIndicator color={colors.tertiary} />
  }
  return (
    <Box backgroundColor="primary" alignItems="center" padding="lplus" borderRadius="mplus">
      <Text variant="boldBlackCenter18">{t('dialogBox1Title')}</Text>
      <Box
        backgroundColor="tertiary"
        marginVertical="xl"
        width={59}
        height={59}
        borderRadius="xm"
      />
      <Text variant="body1">{t('dialogBox1SubTitle')}</Text>
      <Box alignSelf="flex-end" marginTop="xl">
        <TextLink
          text={t('resendCode')}
          variant="resendWhite"
          action={handleResendConfirmationEmail}
        />
      </Box>
    </Box>
  )
}
