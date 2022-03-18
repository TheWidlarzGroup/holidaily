import React from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'

export const Submit = ({ onCTAPress, disabledCTA }: { onCTAPress: F0; disabledCTA: boolean }) => {
  const { t } = useTranslation('createPost')
  return (
    <Box
      backgroundColor="disabled"
      justifyContent="center"
      alignItems="stretch"
      paddingHorizontal="xxxl"
      paddingBottom="l">
      <BaseOpacity
        paddingVertical="m"
        borderRadius="xxl"
        bg="tertiary"
        onPress={onCTAPress}
        disabled={disabledCTA}>
        <Text opacity={disabledCTA ? 0.4 : 1} variant="buttonText1">
          {t('sendPost')}
        </Text>
      </BaseOpacity>
    </Box>
  )
}
