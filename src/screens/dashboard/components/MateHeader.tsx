import React from 'react'
import { Box, Text } from 'utils/theme'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { Avatar } from 'components/Avatar'
import { User } from 'mock-api/models/mirageTypes'

export const MateHeader = (props: User) => {
  const { firstName, lastName, requests, occupation, photo } = props

  return (
    <Box alignItems="center" borderBottomColor="black" borderBottomWidth={2} paddingBottom="l">
      <Box>
        <Avatar src={photo} size="l" />
        {requests[0].isOnHoliday && <OnHolidayTag variant="large" background="white" />}
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
