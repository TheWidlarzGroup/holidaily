import React from 'react'
import { Box, Text } from 'utils/theme'
import IconProfile from 'assets/icons/icon-profile.svg'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { RequiredMateHolidaysData } from 'types/holidaysDataTypes'

export const MateHeader = (props: RequiredMateHolidaysData) => {
  const { firstName, lastName, holidays } = props

  return (
    <Box alignItems="center" borderBottomColor="black" borderBottomWidth={2} paddingBottom="m">
      <Box>
        <IconProfile width={104} height={104} />
        {holidays.isOnHoliday && <OnHolidayTag variant="large" background="white" />}
      </Box>
      <Text variant="bold20" color="black" marginTop="m">
        {firstName} {lastName}
      </Text>
      <Text variant="regularGrey16" color="headerGrey">
        role need to be implemented
      </Text>
    </Box>
  )
}
