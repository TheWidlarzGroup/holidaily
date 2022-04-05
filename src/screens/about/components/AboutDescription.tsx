import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'

export const AboutDescription = () => {
  const { t } = useTranslation('welcome')
  // TODO: replace with Trans component
  return (
    <Box paddingHorizontal="m" paddingBottom="xxxl">
      <Text textAlign="left">
        <Text variant="body1Bold" color="primary">
          {t('aboutDesc1Part1')}
        </Text>
        <Text variant="body1">{t('aboutDesc1Part2')}</Text>
        <Text variant="body1Bold">{t('aboutDesc1Part3')}</Text>
        <Text variant="body1">{t('aboutDesc1Part4')}</Text>
        <Text variant="body1Bold">{t('aboutDesc1Part5')}</Text>
      </Text>
      <Text textAlign="left" marginTop="l">
        <Text variant="body1Bold">{t('aboutDesc2Part1')}</Text>
        <Text variant="body1">{t('aboutDesc2Part2')}</Text>
        <Text variant="body1Bold">{t('aboutDesc2Part3')}</Text>
      </Text>
    </Box>
  )
}
