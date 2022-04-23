import React from 'react'
import FastImage from 'react-native-fast-image'
import { Box, mkUseStyles } from 'utils/theme'

const manImgSrc = require('assets/Splash_screen.png')
const waveImgSrc = require('assets/Wave.png')

export const AboutBackground = () => {
  const styles = useStyles()
  return (
    <Box flex={1} alignItems="center" justifyContent="center" zIndex="-1">
      <FastImage style={styles.manImage} source={manImgSrc} resizeMode="contain" />
      <FastImage style={styles.waveImage} source={waveImgSrc} resizeMode="contain" />
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  manImage: {
    height: '100%',
    width: '60%',
    zIndex: 10,
  },
  waveImage: {
    aspectRatio: 1,
    width: '100%',
    position: 'absolute',
    bottom: -110,
  },
}))
