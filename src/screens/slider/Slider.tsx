import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, ScrollView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppRoutes } from '../../navigation/types'

import SliderContent from '../../components/SliderContent'

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB051',
  },
})

type SliderNavigationProps = StackNavigationProp<AppRoutes, 'Home'>

export type SliderProps = {
  navigation: SliderNavigationProps
}

const Slider: FC<SliderProps> = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <SliderContent
        title={slidersData[3].title}
        text={slidersData[3].text}
        image={slidersData[3].image}
        sliderIndex={3}
        slidersCount={slidersData.length}
        navigation={navigation}
      />
    </ScrollView>
  </SafeAreaView>
)

export default Slider
