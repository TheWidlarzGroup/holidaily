import React from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'

type SubmitProps = {
  onCTAPress: F0
  disabledCTA: boolean
  text?: string
  noBg?: true
}

export const Submit = (p: SubmitProps) => {
  const { t } = useTranslation('createPost')
  return (
    <Box
      backgroundColor={p.noBg ? undefined : 'disabled'}
      justifyContent="center"
      alignItems="stretch"
      paddingHorizontal="xxxl"
      paddingBottom="l">
      <BaseOpacity
        paddingVertical="m"
        borderRadius="xxl"
        bg="tertiary"
        onPress={p.onCTAPress}
        disabled={p.disabledCTA}>
        <Text opacity={p.disabledCTA ? 0.4 : 1} variant="buttonText1">
          {p.text ?? t('sendPost')}
        </Text>
      </BaseOpacity>
    </Box>
  )
}
