import React from 'react'
import { Box, Text } from 'utils/theme/index'

export const SummaryDays = () => (
  <Box flexDirection="row" justifyContent="space-around" alignItems="center">
    <Box alignItems="center">
      <Text variant="captionText">YOU'RE TAKING</Text>
      <Text variant="heading1">3</Text>
      <Text variant="captionText">DAYS OF PTO</Text>
    </Box>
    <Box alignItems="center">
      <Text variant="captionText">YOU'LL HAVE</Text>
      <Text variant="heading1">19</Text>
      <Text variant="captionText">DAYS OF PTO LEFT</Text>
    </Box>
  </Box>
)
