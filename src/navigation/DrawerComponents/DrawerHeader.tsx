import React from 'react'
import { Box, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { UserData } from 'contexts/UserContext'
import { useAvatarContext } from 'contexts/AvatarProvider'

type DrawerHeaderProps = Pick<UserData, 'firstName' | 'lastName' | 'occupation'>

export const DrawerHeader = ({ firstName, lastName, occupation }: DrawerHeaderProps) => {
  const { avatarUri } = useAvatarContext()
  return (
    <Box margin="m">
      <Avatar src={avatarUri} size="s" />
      <Text marginTop="m" variant="boldBlack18">
        {firstName} {lastName}
      </Text>
      {!!occupation && <Text variant="regularGrey16">{occupation}</Text>}
    </Box>
  )
}
