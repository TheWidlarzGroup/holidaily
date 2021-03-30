import React, { FC, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from 'react-native-reanimated'
import { AppRoutes } from '../../navigation/types'
import { colors } from '../../utils/theme/colors'
import { Box } from '../../utils/theme/index'

import { SliderContent } from '../../components/SliderContent'
import { ProgressBar } from '../../components/ProgressBar'

const slidersData = [
  {
    title: 'Welcome to Holidaily!',
    text: 'All your team days-off in one place.',
    image: require('../../assets/Slider_Illustration-1_2@.png'),
  },
  {
    title: 'Real-time vacation checking',
    text: 'Check how many leaves have left.',
    image: require('../../assets/Slider_Illustration-2_2@.png'),
  },
  {
    title: 'Request time off',
    text: 'Are you planning vacations or some personal time? Simply request it.',
    image: require('../../assets/Slider_Illustration-3_2@.png'),
  },
  {
    title: 'Get notified',
    text: 'You’ll get notifications once the vacation is approved or rejected.',
    image: require('../../assets/Slider_Illustration-4_2@.png'),
  },
]

const { width } = Dimensions.get('window')

type SliderNavigationProps = StackNavigationProp<AppRoutes, 'Home'>

type SliderProps = {
  navigation: SliderNavigationProps
}

export const Slider: FC<SliderProps> = ({ navigation }) => {
  const translateX = useSharedValue(0)
  const aref = useAnimatedRef<Animated.ScrollView & ScrollView>()

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x
    },
  })

  const handlePressButton = useCallback(() => {
    if (translateX.value >= (slidersData.length - 1) * width) {
      navigation.navigate('Signup')
    } else {
      aref.current?.scrollTo({ x: translateX.value + width, animated: true })
    }
  }, [navigation, translateX, aref])

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        ref={aref}
        onScroll={scrollHandler}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        snapToEnd={false}
        decelerationRate="fast">
        {slidersData.map((item, index) => (
          <SliderContent
            key={item.title}
            title={item.title}
            text={item.text}
            image={item.image}
            sliderIndex={index}
            scrollPositionX={translateX}
          />
        ))}
      </Animated.ScrollView>
      <Box style={styles.progressBarContainer}>
        <ProgressBar scrollPositionX={translateX} slidersCount={slidersData.length} />
      </Box>
      <TouchableOpacity style={styles.button} onPress={handlePressButton}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 30,
    width: 221,
    height: 53,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  progressBarContainer: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
})
