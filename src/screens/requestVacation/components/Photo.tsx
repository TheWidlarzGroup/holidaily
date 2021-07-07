import React from 'react'
import { Box } from 'utils/theme'
import FastImage from 'react-native-fast-image'

const sizes = { xs: 24, s: 44, m: 62, l: 112 }

type PhotoProps = React.ComponentProps<typeof Box> & {
  src?: string
  size?: keyof typeof sizes | number
}

export const Photo = ({ size = 'm', src, ...containerProps }: PhotoProps) => {
  const chosenSize = typeof size === 'number' ? size : sizes[size]
  const width = chosenSize
  const height = chosenSize

  return (
    <Box
      overflow="hidden"
      borderRadius="m"
      alignItems="center"
      justifyContent="center"
      width={width}
      height={height}
      {...containerProps}>
      <FastImage style={{ minWidth: width, minHeight: height }} source={{ uri: src }} />
    </Box>
  )
}
