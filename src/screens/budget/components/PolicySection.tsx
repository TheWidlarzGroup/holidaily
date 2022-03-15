import React from 'react'
import { Box, Text } from 'utils/theme'
import { Trans, useTranslation } from 'react-i18next'

export default function PolicySection({
  textKey,
  subtitleKey,
}: {
  textKey: string
  subtitleKey?: string
}) {
  const { t } = useTranslation('budget')
  return (
    <Box marginVertical="m">
      <Text lineHeight={20}>
        <Trans
          ns="budget"
          i18nKey={textKey}
          components={{ b: <Text variant={'bold16'} lineHeight={20} /> }}
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
