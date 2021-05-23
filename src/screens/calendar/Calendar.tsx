import React, { FC } from 'react'

import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

export const Calendar: FC = () => (
  <SafeAreaWrapper isDefaultBgColor>
    <Box margin="xl">
      <Text variant="title1">Welcome in Calendar</Text>
    </Box>
  </SafeAreaWrapper>
)
