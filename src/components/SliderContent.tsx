import React, { FC } from 'react'
import { StyleSheet, Dimensions, ImageSourcePropType } from 'react-native'
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'
import { Box, Text } from 'utils/theme/index'

const { width } = Dimensions.get('window')

type SliderContentProps = {
  title: string
  text: string
  image: ImageSourcePropType
  sliderIndex: number
  scrollPositionX: Animated.SharedValue<number>
}

export const SliderContent: FC<SliderContentProps> = ({
  title,
  text,
  image,
  sliderIndex,
  scrollPositionX,
}) => {
  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollPositionX.value,
      [width * (sliderIndex - 1), width * sliderIndex, width * (sliderIndex + 1)],
      [0, 1, 0],
      Extrapolate.CLAMP
    )

    return { opacity }
  })

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.imageContainer, style]}>
        <Animated.Image style={styles.image} source={image} />
      </Animated.View>
      <Box maxWidth="80%" justifyContent="center" alignItems="center">
        <Text variant="title1">{title}</Text>
        <Text variant="body1">{text}</Text>
      </Box>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageContainer: {
    marginTop: 20,
    width: '90%',
    maxWidth: 400,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  image: { resizeMode: 'center' },
})
