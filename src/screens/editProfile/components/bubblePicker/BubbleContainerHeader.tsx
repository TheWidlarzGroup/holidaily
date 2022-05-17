import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'

export const BubbleContainerHeader = () => {
  const { t } = useTranslation('userProfile')
  return (
    <Box marginTop="xxxl" alignItems="center" style={{ width: '100%' }}>
      <Text variant="displayBoldSM" marginTop="l" marginBottom="m" color="alwaysWhite">
        {t('colorPicker')}
      </Text>
      <Text variant="textSM" color="alwaysWhite">
        {t('colorPickerSubtitle')}
      </Text>
    </Box>
  )
}
