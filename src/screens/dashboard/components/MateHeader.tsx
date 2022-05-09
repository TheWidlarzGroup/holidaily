import React from 'react'
import { Box, Text } from 'utils/theme'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { Avatar } from 'components/Avatar'
import { User } from 'mock-api/models/mirageTypes'
import { makeUserDetails } from 'utils/userDetails'

export const MateHeader = ({ user }: { user: User }) => {
  const { firstName, lastName, occupation, photo } = user

  return (
    <Box alignItems="center" borderBottomColor="black" borderBottomWidth={2} paddingBottom="l">
      <Box>
        <Avatar src={photo} size="l" userDetails={makeUserDetails(user)} />
        {user.isOnHoliday && <OnHolidayTag variant="large" background="white" />}
      </Box>
      <Text variant="bold20" color="black" marginTop="m">
        {firstName} {lastName}
      </Text>
      {!!occupation && (
        <Text variant="regularGrey16" color="headerGrey">
          {occupation}
        </Text>
      )}
    </Box>
  )
}
