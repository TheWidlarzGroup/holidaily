import React from 'react'
import IconProfile from 'assets/icons/icon-profile.svg'
import { Box, Text } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { User } from 'mockApi/models'

export const avatarSizes = { xs: 24, s: 44, m: 62, l: 112 }

type AvatarProps = React.ComponentProps<typeof Box> & {
  src?: string | null
  size?: keyof typeof avatarSizes | number
  userDetails?: Pick<User, 'userColor' | 'firstName'> & Partial<Pick<User, 'lastName'>>
}

export const Avatar = ({ size = 'm', src, userDetails, ...containerProps }: AvatarProps) => {
  const chosenSize = typeof size === 'number' ? size : avatarSizes[size]
  const width = chosenSize
  const height = chosenSize
  return (
    <Box
      overflow="hidden"
      borderRadius="full"
      alignItems="center"
      justifyContent="center"
      width={width}
      height={height}
      {...containerProps}>
      <UserPhoto src={src} userDetails={userDetails} size={chosenSize} />
    </Box>
  )
}

const UserPhoto = ({
  src,
  userDetails,
  size,
}: Pick<AvatarProps, 'src' | 'userDetails'> & { size: number }) => {
  if (src) return <FastImage style={{ minWidth: size, minHeight: size }} source={{ uri: src }} />
  if (userDetails?.userColor && userDetails.firstName)
    return (
      <Box
        style={{ backgroundColor: userDetails.userColor }}
        height={size}
        width={size}
        borderRadius="full"
        alignItems="center"
        justifyContent="center">
        <Text variant={size >= 62 ? 'avatarXL' : 'avatarLG'} color="white" padding="xs">
          {userDetails.firstName[0]}
          {userDetails.lastName?.[0]}
        </Text>
      </Box>
    )
  return <IconProfile width={size} height={size} />
}
