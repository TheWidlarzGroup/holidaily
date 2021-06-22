import React from 'react'
import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

export const ChangePassword = () => (
  <SafeAreaWrapper edges={['top']}>
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>{'change password'}</Text>
    </Box>
  </SafeAreaWrapper>
)
