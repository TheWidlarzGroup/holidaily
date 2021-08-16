import React from 'react'
import { Box, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'

type DrawerHeaderProps = {
  firstName: string
  lastName: string
  job: string | null
  image?: string
}

export const DrawerHeader = ({ firstName, lastName, job, image }: DrawerHeaderProps) => (
  <Box margin="m">
    <Avatar src={image} size="s" />
    <Text marginTop="m" variant="boldBlack18">
      {firstName} {lastName}
    </Text>
    {!!job && <Text variant="regularGrey16">{job}</Text>}
  </Box>
)
