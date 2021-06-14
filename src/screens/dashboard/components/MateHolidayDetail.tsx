import React from 'react'
import { Box, Text } from 'utils/theme'
import { HolidayDetails } from 'types/holidaysDataTypes'

export const MateHolidayDetail = (props: Required<HolidayDetails>) => {
  const { isOnHoliday, dayStart, dayEnd } = props

  return (
    <Box padding="m">
      <Text>details - TBD</Text>
    </Box>
  )
}
