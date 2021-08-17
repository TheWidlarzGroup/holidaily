import React from 'react'
import { Box, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { UserData } from 'contexts/UserContext'

type DrawerHeaderProps = Pick<UserData, 'firstName' | 'lastName' | 'occupation' | 'photo'>

export const DrawerHeader = ({ firstName, lastName, occupation, photo }: DrawerHeaderProps) => (
  <Box margin="m">
    <Avatar src={photo} size="s" />
    <Text marginTop="m" variant="boldBlack18">
      {firstName} {lastName}
    </Text>
    {!!occupation && <Text variant="regularGrey16">{occupation}</Text>}
  </Box>
)
