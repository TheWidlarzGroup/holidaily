import React, { FC } from 'react'

import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

export const RequestVacation: FC = () => (
  <SafeAreaWrapper>
    <Box margin="xl">
      <Text variant="title1">Request your vacation date</Text>
    </Box>
  </SafeAreaWrapper>
)
