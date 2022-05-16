import { BoxProps } from '@shopify/restyle'
import React, { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { exhaustiveTypeCheck } from 'utils/functions'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'
import { CircleStatusIcon, IconStatus } from './CircleStatusIcon'

type ToastProps = {
  variant: 'success'
  text: string
  onHide: F0
  visibilityTime?: number
} & BoxProps<Theme>

export const Toast = ({
  variant,
  text,
  onHide,
  visibilityTime = 1200,
  ...styleProps
}: ToastProps) => {
  const styles = useStyles()
  const iconStatus: IconStatus = variant
  const translateY = useSharedValue<number>(-100)

  useEffect(() => {
    translateY.value = withDelay(100, withTiming(0))
    let timeout = setTimeout(() => {
      translateY.value = withTiming(-200)
      timeout = setTimeout(onHide, 300)
    }, visibilityTime)
    
    return () => clearTimeout(timeout)
  }, [translateY, onHide, visibilityTime])
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))
  
  return (
    <AnimatedBox style={[styles.container, animatedStyle]}>
      <Box
        borderRadius="l1min"
        paddingVertical="ml"
        paddingHorizontal="xm"
        alignItems="center"
        flexDirection="row"
        {...getVariantStyle(variant)}
        {...styleProps}>
        <CircleStatusIcon width={25} status={iconStatus} />
        <Text variant="textSM">{text}</Text>
      </Box>
    </AnimatedBox>
  )
}

const getVariantStyle = (variant: ToastProps['variant']): BoxProps<Theme> => {
  switch (variant) {
    case 'success': {
      return {
        bg: 'successToastBg',
        borderColor: 'successToastBorder',
        borderWidth: 1,
      }
    }
    default:
      exhaustiveTypeCheck(variant, `Unknown Toast variant: ${variant}`)
      return {}
  }
}

const useStyles = mkUseStyles((theme: Theme) => ({
  container: {
    position: 'absolute',
    top: 12,
    paddingHorizontal: theme.spacing.m,
    width: '100%',
    zIndex: theme.zIndices['20'],
  },
}))

const AnimatedBox = Animated.createAnimatedComponent(Box)
