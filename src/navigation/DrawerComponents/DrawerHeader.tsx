import React from 'react'
import { Box, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { User } from 'mock-api/models/mirageTypes'
import { makeUserDetails } from 'utils/userDetails'

type DrawerHeaderProps = Pick<User, 'firstName' | 'lastName' | 'occupation'>

export const DrawerHeader = ({ firstName, lastName, occupation }: DrawerHeaderProps) => {
  const { user } = useUserContext()

  return (
    <Box margin="m">
      <Avatar src={user?.photo} userDetails={makeUserDetails(user)} size="m" />
      <Text marginTop="m" variant="boldBlack18">
        {firstName} {lastName}
      </Text>
      {!!occupation && (
        <Text variant="textMD" color="grey">
          {occupation}
        </Text>
      )}
    </Box>
  )
}
