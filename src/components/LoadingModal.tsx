import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import React, { useEffect } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Box, mkUseStyles, Text, useColors } from 'utils/theme'
import { Loader } from './Loader'

type LoadingModalProps = {
  show: boolean
  style?: StyleProp<ViewStyle>
}

export const LoadingModal = ({ show, style }: LoadingModalProps) => {
  const styles = useStyles()
  const colors = useColors()
  const { height } = useDimensions()
  const loaderProgress = useSharedValue(0)

  const showProgress = useDerivedValue(() => (show ? 1 : 0), [show])

  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: withTiming(showProgress.value, { duration: 100 }),
  }))

  if (!show) return null
  return (
    <Animated.View style={[styles.container, { height: height + 120 }, style, animatedOpacity]}>
      <Loader
        progress={loaderProgress}
        size={40}
        frontLayerColor={colors.secondary}
        backLayerColor={colors.lightGrey}
        strokeWidth={4}
      />
      <Text variant="boldOrange15" marginTop="l">
        Wait a second...
      </Text>
    </Animated.View>
  )
}

const useStyles = mkUseStyles(() => ({
  container: {
    backgroundColor: 'rgba(255, 255, 255, .8)',
    position: 'absolute',
    left: -50,
    right: -50,
    bottom: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
