import React, { useState } from 'react'
import { Box } from 'utils/theme'
import FastImage from 'react-native-fast-image'

type PhotoProps = React.ComponentProps<typeof Box> & {
  src?: string
}

export const Photo = ({ src, ...containerProps }: PhotoProps) => {
  const [size, setSize] = useState(0)

  return (
    <Box
      overflow="hidden"
      borderRadius="m"
      alignItems="stretch"
      flex={1}
      onLayout={(evt) => {
        setSize(evt.nativeEvent.layout.width)
      }}
      {...containerProps}>
      <FastImage style={{ height: size, width: size }} source={{ uri: src }} resizeMode="cover" />
    </Box>
  )
}
