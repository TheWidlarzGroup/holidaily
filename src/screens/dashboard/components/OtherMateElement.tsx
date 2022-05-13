import React from 'react'
import { Box, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { User } from 'mock-api/models/mirageTypes'
import { makeUserDetails } from 'utils/userDetails'

export const OtherMateElement = (props: User) => {
  const { firstName, lastName, photo } = props

  return (
    <Box marginVertical="s" alignItems="center" flexBasis="25%" marginBottom="m">
      <Box marginBottom="s">
        <Avatar size="xm" src={photo} userDetails={makeUserDetails(props)} />
      </Box>
      <Text variant="displayXS">{firstName}</Text>
      <Text variant="displayXS">{lastName}</Text>
    </Box>
  )
}
