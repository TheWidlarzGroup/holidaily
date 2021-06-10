import React from 'react'
import { Box, Text } from 'utils/theme'
import { Image } from 'react-native'
import UserIconPlaceholder from 'assets/icons/icon-profile.svg'

const imageSize = 44

type DrawerHeaderProps = {
  firstName: string
  lastName: string
  job: string
  image?: string
}

export const DrawerHeader = ({ firstName, lastName, job, image }: DrawerHeaderProps) => (
  <Box margin="m">
    {image ? (
      <Image
        source={{ uri: image }}
        style={{ width: imageSize, height: imageSize, borderRadius: imageSize / 2 }}
      />
    ) : (
      <UserIconPlaceholder width={imageSize} height={imageSize} />
    )}
    <Text marginTop="m" variant="boldBlack18">
      {firstName} {lastName}
    </Text>
    <Text variant="regularGrey16">{job}</Text>
  </Box>
)
