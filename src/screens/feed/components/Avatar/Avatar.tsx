import React from 'react'
import { Image } from 'react-native'
import IconProfile from 'assets/icons/icon-profile.svg'
import { Box } from 'utils/theme'

type AvatarProps = {
  src?: string
  size?: 's' | 'm' | 'l' // | number
}

const sizes = {
  s: 44,
  m: 88,
  l: 176,
}

export const Avatar = ({ size = 'm', src }: AvatarProps) => {
  const chosenSize = sizes[size] ?? sizes.m // size in sizes ? sizes[size] : size

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
