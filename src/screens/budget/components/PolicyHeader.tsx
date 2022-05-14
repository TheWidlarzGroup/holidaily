import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text, BaseOpacity, useTheme } from 'utils/theme'
import CloseIcon from 'assets/icons/icon-close.svg'
import { useNavigation } from '@react-navigation/native'

export const PolicyHeader = () => {
  const { t } = useTranslation('budget')
  const { goBack } = useNavigation()
  const theme = useTheme()
  return (
    <Box flexDirection="row" alignItems="center" paddingHorizontal="l" paddingTop="m">
      <BaseOpacity onPress={goBack}>
        <CloseIcon width={14} height={14} color={theme.colors.black} />
      </BaseOpacity>
      <Box flex={1}>
        <Text variant="boldBlackCenter20">{t('policyHeader')}</Text>
      </Box>
    </Box>
  )
}
