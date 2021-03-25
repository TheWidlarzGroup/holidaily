import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, ScrollView } from 'react-native'

import SliderContent from '../../components/SliderContent'

const sliderContent = [
  {
    title: 'Welcome to Holidaily!',
    text: 'All your team days-off in one place.',
  },
  {
    title: 'Real-time vacation checking',
    text: 'Check how many leaves have left.',
  },
  {
    title: 'Request time off',
    text: 'Are you planning vacations or some personal time? Simply request it.',
  },
  {
    title: 'Get notified',
    text: 'You’ll get notifications once the vacation is approved or rejected.',
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB051',
  },
})

const Slider = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <SliderContent title={sliderContent[0].title} text={sliderContent[0].text} />
      {/* <SliderContent title={sliderContent[1].title} text={sliderContent[1].text} />
      <SliderContent title={sliderContent[2].title} text={sliderContent[2].text} />
      <SliderContent title={sliderContent[3].title} text={sliderContent[3].text} /> */}
    </ScrollView>
  </SafeAreaView>
)

export default Slider
