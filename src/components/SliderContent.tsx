import React, { useEffect } from 'react'
import { Dimensions, ImageSourcePropType, Image } from 'react-native'
import { Box, Text } from 'utils/theme/index'
import { isSmallScreen, windowHeight } from 'utils/deviceSizes'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withDelay,
  withSpring,
  withRepeat,
} from 'react-native-reanimated'

const { width } = Dimensions.get('window')

type SliderContentProps = {
  title: string
  text: string
  image: ImageSourcePropType
  isUserLoggedIn: boolean
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
const IMAGE_HEIGHT = 280
const middleScreenY = windowHeight / 2 - IMAGE_HEIGHT / 1.5

const imgStyles = {
  height: IMAGE_HEIGHT,
}

export const SliderContent = ({ title, text, image, isUserLoggedIn }: SliderContentProps) => {
  const translateY = useSharedValue(middleScreenY)
  const scale = useSharedValue(0.57)
  const opacity = useSharedValue(0)
  const rotate = useSharedValue(0)
  const opacityStyles = useAnimatedStyle(() => ({ opacity: opacity.value }), [])
  const imageStyles = useAnimatedStyle(
    () => ({
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    }),
    []
  )

  useEffect(() => {
    const rotateCount = isUserLoggedIn ? -1 : 6
    rotate.value = withDelay(700, withRepeat(withTiming(-25, { duration: 580 }), rotateCount, true))
    const longAnimation = () => {
      translateY.value = withDelay(2600, withTiming(middleScreenY + 30))
      scale.value = withDelay(3000, withSpring(1))
      translateY.value = withDelay(3000, withSpring(0))
      opacity.value = withDelay(3600, withTiming(1, { duration: 300 }))
    }
    if (!isUserLoggedIn) longAnimation()
  }, [isUserLoggedIn, opacity, rotate, scale, translateY])

  return (
    <Box width={width} alignItems="center" justifyContent="space-around">
      <AnimatedBox
        style={imageStyles}
        justifyContent="center"
        alignItems="center"
        aspectRatio={isSmallScreen ? 1.4 : 1}
        width="100%"
        backgroundColor="primary"
        marginTop="-ml"
        marginBottom="-ml">
        <Image style={imgStyles} source={image} resizeMode="contain" />
      </AnimatedBox>
      <AnimatedBox style={opacityStyles} maxWidth="80%" justifyContent="center" alignItems="center">
        <Text variant="title1" paddingBottom="m" color="alwaysBlack">
          {title}
        </Text>
        <Text variant="body1" color="alwaysBlack">
          {text}
        </Text>
      </AnimatedBox>
    </Box>
  )
}
