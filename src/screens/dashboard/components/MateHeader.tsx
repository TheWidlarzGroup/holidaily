import React from 'react'
import { Box, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { User } from 'mock-api/models/mirageTypes'
import { makeUserDetails } from 'utils/userDetails'

export const MateHeader = ({ user }: { user: User }) => {
  const { firstName, lastName, occupation, photo } = user

  return (
    <Box alignItems="center" paddingBottom="l" paddingTop="m">
      <Box>
        <Avatar src={photo} size="xl" userDetails={makeUserDetails(user)} />
      </Box>
      <Text variant="displayBoldMD" marginTop="m">
        {firstName} {lastName}
      </Text>
      {!!occupation && (
        <Text variant="textSM" color="headerGrey">
          {occupation}
        </Text>
      )}
    </Box>
  )
}
