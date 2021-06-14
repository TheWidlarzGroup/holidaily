import React from 'react'
import { Box, Text } from 'utils/theme'
import IconProfile from 'assets/icons/icon-profile.svg'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { RequiredMateHolidaysData } from 'types/holidaysDataTypes'

export const MateHeader = (props: RequiredMateHolidaysData) => {
  const { firstName, lastName, holidays, role } = props

  return (
    <Box alignItems="center" borderBottomColor="black" borderBottomWidth={2} paddingBottom="l">
      <Box>
        <IconProfile width={104} height={104} />
        {holidays.isOnHoliday && <OnHolidayTag variant="large" background="white" />}
      </Box>
      <Text variant="bold20" color="black" marginTop="m">
        {firstName} {lastName}
      </Text>
      {role && (
        <Text variant="regularGrey16" color="headerGrey">
          {role}
        </Text>
      )}
    </Box>
  )
}
