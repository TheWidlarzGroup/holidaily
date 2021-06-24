import React from 'react'
import IconProfile from 'assets/icons/icon-profile.svg'
import { Box } from 'utils/theme'
import FastImage from 'react-native-fast-image'

const sizes = { xs: 24, s: 44, m: 62, l: 112 }

type AvatarProps = React.ComponentProps<typeof Box> & {
  src?: string | null
  size?: keyof typeof sizes | number
}

export const Avatar = ({ size = 'm', src, ...containerProps }: AvatarProps) => {
  const chosenSize = typeof size === 'number' ? size : sizes[size]
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
      {src ? (
        <FastImage style={{ minWidth: width, minHeight: height }} source={{ uri: src }} />
      ) : (
        <IconProfile width={width} height={height} />
      )}
    </Box>
  )
}
