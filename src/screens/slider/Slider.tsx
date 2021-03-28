import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Dimensions, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated'
import { AppRoutes } from '../../navigation/types'

import SliderContent from '../../components/SliderContent'
import ProgressBar from '../../components/ProgressBar'

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB051',
  },
  progressBarContainer: {
    position: 'absolute',
    height: 25,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
})

type SliderNavigationProps = StackNavigationProp<AppRoutes, 'Home'>

interface SliderProps {
  navigation: SliderNavigationProps
}

const Slider: FC<SliderProps> = ({ navigation }) => {
  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x
  })

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast">
        {slidersData.map((item, index) => (
          <SliderContent
            key={item.title}
            title={item.title}
            text={item.text}
            image={item.image}
            sliderIndex={index}
            slidersCount={slidersData.length}
            navigation={navigation}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.progressBarContainer}>
        <ProgressBar scrollPositionX={translateX} slidersCount={slidersData.length} />
      </View>
    </SafeAreaView>
  )
}

export default Slider
