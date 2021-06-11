import React from 'react'
import { Box, Text } from 'utils/theme'

export const CalendarHeader = ({ monthName }: { monthName: string }) => (
  <Box margin="xm">
    <Text fontFamily="Nunito-Bold" fontSize={15}>
      {monthName}
    </Text>
  </Box>
)
