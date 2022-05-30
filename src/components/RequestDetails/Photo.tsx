import React, { useState } from 'react'
import { Box, mkUseStyles, theme } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import Cross from 'assets/icons/circle-cross.svg'
import { TouchableOpacity } from 'react-native-gesture-handler'

type PhotoProps = React.ComponentProps<typeof Box> & {
  onClose: F0
  displayClose?: true
  src?: string
}

export const Photo = ({ src, onClose, displayClose, ...containerProps }: PhotoProps) => {
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
      {displayClose && (
        <Box style={styles.cross}>
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}>
            <Cross width={24} height={24} color={theme.colors.deleteButton} />
          </TouchableOpacity>
        </Box>
      )}
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
