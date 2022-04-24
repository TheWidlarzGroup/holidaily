import React from 'react'
import { Box, useTheme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { CustomButton } from './CustomButton'

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
      <CustomButton
        label={p.text ?? t('sendPost')}
        disabled={p.disabledCTA}
        variant="primary"
        onPress={p.onCTAPress}
        paddingVertical={theme.spacing.xs}
        width={260}
        marginTop={10}
        alignSelf="center"
        customStyle={{
          borderRadius: theme.borderRadii.full,
        }}
      />
    </Box>
  )
}
