import React from 'react'
import { Box } from 'utils/theme'
import { CustomButton } from 'components/CustomButton'
import { useTranslation } from 'react-i18next'
import { themeBase } from 'utils/theme/themeBase'

type SignupButtonsProps = {
  onPress: F0
}

export const SignupButtons = (p: SignupButtonsProps) => {
  const { t } = useTranslation(['signup'])

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <CustomButton
        label={t('continueWGmail')}
        variant="secondary"
        icon="google"
        marginBottom={themeBase.spacing.m}
      />
      <CustomButton
        label={t('continueWSlack')}
        variant="secondary"
        icon="slack"
        marginBottom={themeBase.spacing.m}
      />
      <CustomButton label={t('signupWEmail')} variant="primary" onPress={p.onPress} />
    </Box>
  )
}
