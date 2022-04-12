import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'

export const AboutDescription = () => {
  const { t } = useTranslation('welcome')
  // TODO: replace with Trans component
  return (
    <Box paddingHorizontal="m" paddingBottom="xxxl">
      <Text textAlign="left" variant="body1">
        <Text variant="body1Bold" color="primary">
          {t('aboutDesc1Part1')}
        </Text>
        {t('aboutDesc1Part2')}
        <Text variant="body1Bold">{t('aboutDesc1Part3')}</Text>
        {t('aboutDesc1Part4')}
        <Text variant="body1Bold">{t('aboutDesc1Part5')}</Text>
      </Text>
      <Text textAlign="left" marginTop="l" variant="body1">
        <Text variant="body1Bold">{t('aboutDesc2Part1')}</Text>
        {t('aboutDesc2Part2')}
        <Text variant="body1Bold">{t('aboutDesc2Part3')}</Text>
      </Text>
    </Box>
  )
}
