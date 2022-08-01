import React, { ComponentProps } from 'react'
import IconProfile from 'assets/icons/icon-profile.svg'
import { Box, Text } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { User } from 'mockApi/models'

export const avatarSizes = { xs: 24, s: 32, m: 40, l: 56, xl: 100 }

type AvatarProps = ComponentProps<typeof Box> & {
  src?: string | null
  size?: keyof typeof avatarSizes
  userDetails?: Pick<User, 'userColor' | 'firstName'> & Partial<Pick<User, 'lastName'>>
}

export type AvatarSize = keyof typeof avatarSizes

export const Avatar = ({ size = 'l', src, userDetails, ...containerProps }: AvatarProps) => (
  <Box
    overflow="hidden"
    borderRadius="full"
    alignItems="center"
    justifyContent="center"
    width={avatarSizes[size]}
    height={avatarSizes[size]}
    {...containerProps}>
    <UserPhoto src={src} userDetails={userDetails} size={avatarSizes[size]} />
  </Box>
)

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
        <Text variant={size >= 62 ? 'avatarXL' : 'avatarLG'} color="alwaysWhite" padding="xs">
          {userDetails.firstName[0]}
          {userDetails.lastName?.[0]}
        </Text>
      </Box>
    )
  return <IconProfile width={size} height={size} />
}
