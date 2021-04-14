import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme/index'

export const FirstRegisterDialogBox: FC = () => {
  const { t } = useTranslation('modal')

  return (
    <Box backgroundColor="primary" alignItems="center" padding="lplus" borderRadius="mplus">
      <Text variant="dialog1">{t('dialogBox1Title')}</Text>
      <Box backgroundColor="tertiary" marginVertical="xl" width={59} height={59} />
      <Text variant="body1">{t('dialogBox1SubTitle')}</Text>
    </Box>
  )
}
