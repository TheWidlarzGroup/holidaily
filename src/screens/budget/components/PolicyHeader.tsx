import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text, useTheme } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { DrawerBackArrow } from 'components/DrawerBackArrow'

export const PolicyHeader = () => {
  const { t } = useTranslation('budget')
  const { goBack } = useNavigation()
  const theme = useTheme()
  return (
    <Box>
      <DrawerBackArrow goBack={goBack} />
      <Box position="absolute" alignItems="center" width="100%" top={theme.spacing.m}>
        <Text variant="displayBoldSM">{t('policyHeader')}</Text>
      </Box>
    </Box>
  )
}
