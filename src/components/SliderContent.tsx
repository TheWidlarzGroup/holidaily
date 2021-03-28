import React, { FC, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
import type { SliderNavigationProps } from '../screens/slider/Slider'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: -150,
  },
  container: {
    width,
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 50,
    width: '90%',
    maxWidth: 400,
    height: 450,
    borderRadius: 12,
  },
  progressContainer: {
    marginTop: 20,
    minHeight: 50,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },
  text: {
    maxWidth: '80%',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

interface SliderContentProps {
  title: string
  text: string
  image: ImageSourcePropType
  sliderIndex: number
  slidersCount: number
  navigation: SliderNavigationProps
  scrollPositionX: Animated.SharedValue<number>
}

const SliderContent: FC<SliderContentProps> = ({
  title,
  text,
  image,
  sliderIndex,
  slidersCount,
  navigation,
  scrollPositionX,
}) => {
  const handlePressButton = useCallback(() => {
    navigation.navigate('Signup')
  }, [navigation])

  const style = useAnimatedStyle(() => {
    const opacity = withTiming(
      interpolate(
        scrollPositionX.value,
        [width * (sliderIndex - 1), width * sliderIndex, width * (sliderIndex + 1)],
        [0, 1, 0],
        Extrapolate.CLAMP
      )
    )

    return { opacity }
  })

  return (
    <View style={styles.container}>
      <Animated.Image style={[styles.image, style]} source={image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.progressContainer}>
        {slidersCount - 1 === sliderIndex ? (
          <TouchableOpacity style={styles.button} onPress={handlePressButton}>
            <View>
              <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <Path
                  fillRule="evenodd"
                  d="M41 22C41 32.4934 32.4934 41 22 41C11.5066 41 3 32.4934 3 22C3 11.5066 11.5066 3 22 3C32.4934 3 41 11.5066 41 22ZM44 22C44 34.1503 34.1503 44 22 44C9.84974 44 0 34.1503 0 22C0 9.84974 9.84974 0 22 0C34.1503 0 44 9.84974 44 22ZM29.0607 20.9393L23.0607 14.9393C22.4749 14.3536 21.5251 14.3536 20.9393 14.9393C20.3536 15.5251 20.3536 16.4749 20.9393 17.0607L24.3787 20.5H15C14.1716 20.5 13.5 21.1716 13.5 22C13.5 22.8284 14.1716 23.5 15 23.5H24.3787L20.9393 26.9393C20.3536 27.5251 20.3536 28.4749 20.9393 29.0607C21.5251 29.6464 22.4749 29.6464 23.0607 29.0607L29.0607 23.0607C29.6464 22.4749 29.6464 21.5251 29.0607 20.9393Z"
                  fill="#000"
                />
              </Svg>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

export default SliderContent
