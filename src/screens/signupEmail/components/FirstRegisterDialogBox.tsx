import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme/index'
import { TextLink } from 'components/TextLink'
import { useRetriggerAccountConfirmationEmail } from 'hooks/useRetriggerAccountConfirmationEmail'

export const FirstRegisterDialogBox: FC = () => {
  const {
    handleRetriggerAccountConfirmationEmail,
    isLoading,
    isSuccess,
    confirmErrorMessage,
  } = useRetriggerAccountConfirmationEmail()
  const { t } = useTranslation('modal')

  useEffect(() => {
    if (isLoading) {
      console.log(isLoading)
    }
    if (isSuccess) {
      console.log('it works')
    }
    if (confirmErrorMessage) {
      console.log(confirmErrorMessage)
    }
  })
  return (
    <Box backgroundColor="primary" alignItems="center" padding="lplus" borderRadius="mplus">
      <Text variant="boldBlack18">{t('dialogBox1Title')}</Text>
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
          action={handleRetriggerAccountConfirmationEmail}
        />
      </Box>
    </Box>
  )
}
