import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'

import IconTick from 'assets/icons/icon-button-tick.svg'

export const SuccessCard = () => {
  const { t } = useTranslation('createPost')

  return (
    <Box
      flexGrow={1}
      alignItems="center"
      padding="xxxl"
      bg="primary"
      borderTopLeftRadius="l"
      borderTopRightRadius="l"
      position="absolute"
      bottom={0}
      right={0}
      left={0}>
      <Text variant="bold20" marginBottom="l">
        {t('postSent')}
      </Text>
      <Box>
        <IconTick />
      </Box>
    </Box>
  )
}
