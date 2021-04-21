import React from 'react'

import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

export const Panel = () => (
  <SafeAreaWrapper>
    <Box margin="xl">
      <Text variant="title1">Welcome in panel</Text>
    </Box>
  </SafeAreaWrapper>
)
