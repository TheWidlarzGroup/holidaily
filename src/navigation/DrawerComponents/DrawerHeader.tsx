import React from 'react'
import { Box, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { UserData } from 'contexts/UserContext'
import { useUserContext } from 'hooks/useUserContext'

type DrawerHeaderProps = Pick<UserData, 'firstName' | 'lastName' | 'occupation'>

export const DrawerHeader = ({ firstName, lastName, occupation }: DrawerHeaderProps) => {
  const { user } = useUserContext()
  return (
    <Box margin="m">
      <Avatar src={user?.photo} size="s" />
      <Text marginTop="m" variant="boldBlack18">
        {firstName} {lastName}
      </Text>
      {!!occupation && <Text variant="regularGrey16">{occupation}</Text>}
    </Box>
  )
}
