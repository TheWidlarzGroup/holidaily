import React from 'react'
import { Box, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { User } from 'mock-api/models/mirageTypes'
import { makeUserDetails } from 'utils/userDetails'

export const OtherMateElement = (props: User) => {
  const { firstName, lastName, photo } = props

  return (
    <Box marginVertical="m" alignItems="center" flexBasis="25%">
      <Box marginBottom="s">
        <Avatar src={photo} userDetails={makeUserDetails(props)} />
      </Box>
      <Text numberOfLines={1} variant="holidayDate" color="black">
        {firstName}
      </Text>
      <Text numberOfLines={1} variant="holidayDate" color="black">
        {lastName}
      </Text>
    </Box>
  )
}
