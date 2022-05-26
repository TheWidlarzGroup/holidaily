import React from 'react'
import { Box } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { CustomButton } from './CustomButton'

type SubmitProps = {
  onCTAPress: F0
  disabledCTA: boolean
  noBg?: boolean
  text?: string
  loading?: boolean
}

export const Submit = (p: SubmitProps) => {
  const { t } = useTranslation('createPost')
  return (
    <Box
      backgroundColor={p.noBg ? 'transparent' : 'white'}
      justifyContent="center"
      alignItems="stretch"
      paddingBottom="xxm">
      <CustomButton
        label={p.text ?? t('sendPost')}
        disabled={p.disabledCTA}
        variant="primary"
        onPress={p.onCTAPress}
        marginTop={10}
        alignSelf="center"
      />
    </Box>
  )
}
