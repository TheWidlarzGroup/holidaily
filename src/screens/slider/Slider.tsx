import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  runOnJS,
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { AuthNavigationType } from 'navigation/types'
import { colors } from 'utils/theme/colors'
import { Box } from 'utils/theme/index'

import { SliderContent } from 'components/SliderContent'
import { ProgressBar } from 'components/ProgressBar'
import { CustomButton } from 'components/CustomButton'

const SLIDER_DATA = [
  {
    title: 'slider1Title',
    text: 'slider1SubTitle',
    image: require('assets/Slider_Illustration-1_2@.png'),
  },
  {
    title: 'slider2Title',
    text: 'slider2SubTitle',
    image: require('assets/Slider_Illustration-2_2@.png'),
  },
  {
    title: 'slider3Title',
    text: 'slider3SubTitle',
    image: require('assets/Slider_Illustration-3_2@.png'),
  },
  {
    title: 'slider4Title',
    text: 'slider4SubTitle',
    image: require('assets/Slider_Illustration-4_2@.png'),
  },
]

const { width } = Dimensions.get('window')

export const Slider: FC = () => {
  const navigation = useNavigation<AuthNavigationType<'Slider'>>()
  const translateX = useSharedValue(0)
  const aref = useAnimatedRef<Animated.ScrollView & ScrollView>()
  const { t } = useTranslation('slider')

  const navigateToSignup = () => {
    navigation.navigate('Signup')
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x
    },
    onEndDrag: () => {
      if (Math.floor(translateX.value) >= Math.floor((SLIDER_DATA.length - 1) * width)) {
        runOnJS(navigateToSignup)()
      }
    },
  })

  const handlePressButton = () => {
    if (Math.floor(translateX.value) >= Math.floor((SLIDER_DATA.length - 1) * width)) {
      navigateToSignup()
    } else {
      aref.current?.scrollTo({ x: translateX.value + width, animated: true })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        ref={aref}
        onScroll={scrollHandler}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        bounces={false}
        decelerationRate="fast"
        overScrollMode="never">
        {SLIDER_DATA.map((item, index) => (
          <SliderContent
            key={item.title}
            title={t(item.title)}
            text={t(item.text)}
            image={item.image}
            sliderIndex={index}
            scrollPositionX={translateX}
          />
        ))}
      </Animated.ScrollView>
      <Box flex={0.15} alignItems="center" justifyContent="center" alignSelf="center">
        <ProgressBar scrollPositionX={translateX} slidersCount={SLIDER_DATA.length} />
      </Box>
      <Box maxWidth={300} marginBottom="xl">
        <CustomButton variant="blackBgButton" label={t('next')} onPress={handlePressButton} />
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.mainBackground,
  },
})
