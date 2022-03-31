import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text, BaseOpacity, useTheme } from 'utils/theme'
import CloseIcon from 'assets/icons/icon-close.svg'

export const PolicyHeader = ({ closeModal }: { closeModal: F0 }) => {
  const { t } = useTranslation('budget')
  const theme = useTheme()
  return (
    <Box flexDirection="row" alignItems="center" paddingHorizontal="s" paddingTop="m">
      <BaseOpacity onPress={closeModal} position="absolute">
        <CloseIcon width={50} height={50} color={theme.colors.black} />
      </BaseOpacity>
      <Box flex={1}>
        <Text variant="boldBlackCenter20">{t('policyHeader')}</Text>
      </Box>
    </Box>
  )
}
