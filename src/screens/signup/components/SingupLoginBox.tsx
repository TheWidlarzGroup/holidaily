import React from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { TextLink } from 'components/TextLink'

type SignupLoginBoxProps = {
  onPress: F0
}

export const SignupLoginBox = (p: SignupLoginBoxProps) => {
  const { t } = useTranslation(['signup'])

  return (
    <Box flexDirection="row" padding="m" justifyContent="center" alignItems="center">
      <Text variant="body1" paddingRight="xm">
        {t('alreadyHaveAccount')}
      </Text>
      <TextLink text={t('login:loginButton')} action={p.onPress} variant="alreadyRegistered" />
    </Box>
  )
}
