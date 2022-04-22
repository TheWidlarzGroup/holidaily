import React from 'react'
import { Box, Text, BaseOpacity, useTheme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'

type SubmitProps = {
  onCTAPress: F0
  disabledCTA: boolean
  text?: string
  noBg?: true
  loading?: boolean
}

export const Submit = (p: SubmitProps) => {
  const { t } = useTranslation('createPost')
  const theme = useTheme()
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
        minHeight={54}
        onPress={p.onCTAPress}
        disabled={p.disabledCTA}>
        {p.loading ? (
          <ActivityIndicator size="small" color={theme.colors.white} />
        ) : (
          <Text opacity={p.disabledCTA ? 0.4 : 1} variant="buttonText1">
            {p.text ?? t('sendPost')}
          </Text>
        )}
      </BaseOpacity>
    </Box>
  )
}
