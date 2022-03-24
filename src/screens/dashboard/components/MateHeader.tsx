import React from 'react'
import { Box, Text } from 'utils/theme'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { MateHolidaysData } from 'types/holidaysDataTypes'
import { Avatar } from 'components/Avatar'

export const MateHeader = (props: MateHolidaysData) => {
  const { firstName, lastName, holidays, occupation, photo } = props

  return (
    <Box alignItems="center" borderBottomColor="black" borderBottomWidth={2} paddingBottom="l">
      <Box>
        <Avatar src={photo} size="l" />
        {holidays.isOnHoliday && <OnHolidayTag variant="large" background="white" />}
      </Box>
      <Text variant="bold20" color="black" marginTop="m">
        {firstName} {lastName}
      </Text>
      {occupation && (
        <Text variant="regularGrey16" color="headerGrey">
          {occupation}
        </Text>
      )}
    </Box>
  )
}
