import React, { FC } from 'react'

import { StyleSheet, View } from 'react-native'
import { Box, theme } from 'utils/theme'
import { colors } from 'utils/theme/colors'

const propStyle = (percent: number, baseDegrees: number) => {
  const rotateBy = baseDegrees + percent * 3.6
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }],
  }
}

const renderThirdLayer = (percent: number) => {
  if (percent > 50) {
    return <View style={[styles.secondProgressLayer, propStyle(percent - 50, 45)]}></View>
  }
  return <View style={styles.offsetLayer}></View>
}

type LoaderProps = {
  percent: number
}

export const Loader: FC<LoaderProps> = ({ percent }) => {
  let firstProgressLayerStyle

  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135)
  } else {
    firstProgressLayerStyle = propStyle(percent, -135)
  }

  return (
    <Box
      width={40}
      height={40}
      borderWidth={6}
      borderRadius="loader"
      borderColor="disabled"
      justifyContent="center"
      alignItems="center">
      <View style={[styles.progressLayer, firstProgressLayerStyle]} />
      {renderThirdLayer(percent)}
    </Box>
  )
}

const styles = StyleSheet.create({
  progressLayer: {
    width: 40,
    height: 40,
    borderWidth: 6,
    borderRadius: theme.borderRadii.loader,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: colors.white,
    borderTopColor: colors.white,
    transform: [{ rotateZ: '-45deg' }],
  },
  secondProgressLayer: {
    width: 40,
    height: 40,
    position: 'absolute',
    borderWidth: 6,
    borderRadius: theme.borderRadii.loader,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: colors.white,
    borderTopColor: colors.white,
    transform: [{ rotateZ: '45deg' }],
  },
  offsetLayer: {
    width: 40,
    height: 40,
    borderWidth: 6,
    borderRadius: theme.borderRadii.loader,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: colors.disabled,
    borderTopColor: colors.disabled,
    transform: [{ rotateZ: '-135deg' }],
  },
})
