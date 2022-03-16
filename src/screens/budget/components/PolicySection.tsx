import React from 'react'
import { Box, Text } from 'utils/theme'
import { Trans, useTranslation } from 'react-i18next'
import { LANGUAGES } from '../../../../i18n'

export const PolicySection = ({
  textKey,
  subtitleKey,
}: {
  textKey: keyof LANGUAGES['en']['budget']
  subtitleKey?: keyof LANGUAGES['en']['budget']
}) => {
  const { t } = useTranslation('budget')
  return (
    <Box marginVertical="m">
      <Text lineHeight={20}>
        {/* @ts-ignore */}
        <Trans
          ns="budget"
          i18nKey={textKey}
          components={{ b: <Text variant="bold16" lineHeight={20} /> }}
        />
      </Text>
      {!!subtitleKey && (
        <Text color="grey" fontSize={12} lineHeight={20}>
          {t(subtitleKey)}
        </Text>
      )}
    </Box>
  )
}
