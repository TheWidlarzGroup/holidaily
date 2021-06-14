import React from 'react'
import { Box, Text } from 'utils/theme'
import { HolidayDetails } from 'types/holidaysDataTypes'

export const MateHoliday = (props: Required<HolidayDetails>) => {
  const { isOnHoliday, dayStart, dayEnd } = props

  return (
    <Box borderBottomColor="black" borderBottomWidth={2} padding="m">
      <Text>out of work - TBD</Text>
    </Box>
  )
}
