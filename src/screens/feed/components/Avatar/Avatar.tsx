import React from 'react'
import { Image } from 'react-native'
import IconProfile from 'assets/icons/icon-profile.svg'
import { Box } from 'utils/theme'

const sizes = {
  s: 44,
  m: 88,
  l: 176,
}

type AvatarProps = {
  src?: string
  size?: keyof typeof sizes | number
}

export const Avatar = ({ size = 'm', src }: AvatarProps) => {
  const chosenSize = typeof size === 'number' ? size : sizes[size] ?? sizes.m

  return (
    <Box>
      {src ? (
        <Image width={chosenSize} height={chosenSize} source={{ uri: src }} />
      ) : (
        <IconProfile width={chosenSize} height={chosenSize} />
      )}
    </Box>
  )
}
