import React from 'react'
import { Box } from 'utils/theme'
import { CustomButton } from 'components/CustomButton'
import { useTranslation } from 'react-i18next'
import { themeBase } from 'utils/theme/themeBase'
import { isIos } from 'utils/layout'

type SignupButtonsProps = {
  onPress: F0
}

export const SignupButtons = (p: SignupButtonsProps) => {
  const { t } = useTranslation('signup')

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      {isIos && (
        <CustomButton
          label={t('continueWApple')}
          variant="secondary"
          icon="apple"
          marginBottom={themeBase.spacing.m}
        />
      )}
      <CustomButton
        label={t('continueWGmail')}
        variant="secondary"
        icon="google"
        marginBottom={themeBase.spacing.m}
      />

      <CustomButton label={t('signupWEmail')} variant="primary" onPress={p.onPress} />
    </Box>
  )
}
