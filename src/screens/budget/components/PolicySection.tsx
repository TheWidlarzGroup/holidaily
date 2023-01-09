import React from 'react'
import { Box, Text } from 'utils/theme'
import { Trans, useTranslation } from 'react-i18next'
import { Languages } from '../../../../i18n'

export const PolicySection = ({
  textKey,
  subtitleKey,
}: {
  textKey: keyof Languages['en']['budget']
  subtitleKey?: keyof Languages['en']['budget']
}) => {
  const { t } = useTranslation('budget')
  return (
    <Box marginVertical="m">
      <Text lineHeight={21} color="black">
        <Trans
          ns="budget"
          i18nKey={textKey}
          components={{ b: <Text variant="textBoldSM" lineHeight={21} /> }}
        />
      </Text>
      {!!subtitleKey && (
        <Text variant="textBoldSM" color="darkGrey" lineHeight={21}>
          {t(subtitleKey)}
        </Text>
      )}
    </Box>
  )
}
