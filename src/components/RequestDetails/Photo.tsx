import React, { ComponentProps, useState } from 'react'
import { Box, mkUseStyles } from 'utils/theme'
import FastImage from 'react-native-fast-image'

type PhotoProps = ComponentProps<typeof Box> & {
  src: string
}

export const Photo = ({ src, ...containerProps }: PhotoProps) => {
  const [size, setSize] = useState(0)
  const styles = useStyles()

  return (
    <Box
      alignItems="stretch"
      position="relative"
      flex={1}
      onLayout={(evt) => {
        setSize(evt.nativeEvent.layout.width)
      }}
      {...containerProps}>
      <FastImage
        style={[{ height: size, width: size }, styles.photo]}
        source={{ uri: src }}
        resizeMode="cover"
      />
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  cross: {
    position: 'absolute',
    top: -6,
    right: -6,
  },
  photo: {
    borderRadius: theme.borderRadii.m,
  },
}))
