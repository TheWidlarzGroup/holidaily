import React, { FC, useEffect } from 'react'
import { Dimensions, ImageSourcePropType, Image } from 'react-native'
import { Box, Text } from 'utils/theme/index'
import { isSmallScreen } from 'utils/deviceSizes'
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
}
const imgStyles = {
  width: '75%',
  maxWidth: 240,
}
const AnimatedBox = Animated.createAnimatedComponent(Box)

export const SliderContent: FC<SliderContentProps> = ({ title, text, image }) => {
  const translateY = useSharedValue(260)
  const scale = useSharedValue(0)
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
    translateY.value = withTiming(260)
    scale.value = withDelay(200, withSpring(0.5))
    rotate.value = withDelay(700, withRepeat(withTiming(-25, { duration: 750 }), 4, true))
    translateY.value = withDelay(2200, withSpring(280))
    scale.value = withDelay(2400, withSpring(1))
    translateY.value = withDelay(2600, withSpring(0))
    opacity.value = withDelay(3000, withTiming(1, { duration: 300 }))
  }, [opacity, scale, translateY, rotate])

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
