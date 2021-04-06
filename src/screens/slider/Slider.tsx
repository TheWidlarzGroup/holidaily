import React, { FC, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { AppNavigationType } from '../../navigation/types'
import { colors } from '../../utils/theme/colors'
import { Box, Text } from '../../utils/theme/index'
import { SliderContent } from '../../components/SliderContent'
import { ProgressBar } from '../../components/ProgressBar'

const SLIDER_DATA = [
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

export const Slider: FC = () => {
  const navigation = useNavigation<AppNavigationType<'Slider'>>()
  const translateX = useSharedValue(0)
  const aref = useAnimatedRef<Animated.ScrollView & ScrollView>()
  const { t } = useTranslation('slider')

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x
    },
  })

  const handlePressButton = useCallback(() => {
    if (translateX.value >= (SLIDER_DATA.length - 1) * width) {
      navigation.navigate('Signup')
    } else {
      aref.current?.scrollTo({ x: translateX.value + width, animated: true })
    }
  }, [navigation])

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
        decelerationRate="fast">
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
      <TouchableOpacity style={styles.button} onPress={handlePressButton}>
        <Text variant="buttonText1">{t('Next')}</Text>
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
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
})
