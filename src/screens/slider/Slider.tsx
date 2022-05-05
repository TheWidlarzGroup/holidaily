import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dimensions, ScrollView, ImageSourcePropType, TouchableOpacity } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  runOnJS,
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { AuthNavigationType } from 'navigation/types'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme/index'

import { SliderContent } from 'components/SliderContent'
import { ProgressBar } from 'components/ProgressBar'
import { CustomButton } from 'components/CustomButton'

const SLIDER_DATA: {
  title: `slider${1 | 2 | 3 | 4}Title`
  text: `slider${1 | 2 | 3 | 4}SubTitle`
  image: ImageSourcePropType
}[] = [
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
  const styles = useStyles()

  const navigateToWelcomeScreen = () => {
    navigation.navigate('Welcome')
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x
    },
    onEndDrag: () => {
      if (Math.floor(translateX.value) >= Math.floor((SLIDER_DATA.length - 1) * width)) {
        runOnJS(navigateToWelcomeScreen)()
      }
    },
  })

  const handlePressButton = () => {
    if (Math.floor(translateX.value) >= Math.floor((SLIDER_DATA.length - 1) * width)) {
      navigateToWelcomeScreen()
    } else {
      aref.current?.scrollTo({ x: translateX.value + width, animated: true })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Box
        justifyContent="center"
        alignItems="flex-end"
        width="100%"
        height={50}
        paddingHorizontal="m">
        <TouchableOpacity
          onPress={navigateToWelcomeScreen}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <Text variant="boldBlack18">{t('skip')}</Text>
        </TouchableOpacity>
      </Box>
      <Animated.ScrollView
        ref={aref}
        onScroll={scrollHandler}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        scrollEventThrottle={16}
        disableIntervalMomentum
        bounces={false}
        decelerationRate={0.6}
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
      <Box alignItems="center" justifyContent="center" alignSelf="center" marginBottom="m">
        <ProgressBar scrollPositionX={translateX} slidersCount={SLIDER_DATA.length} />
      </Box>
      <Box maxWidth={250} marginBottom="lplus">
        <CustomButton variant="alternative" label={t('next')} onPress={handlePressButton} />
      </Box>
    </SafeAreaView>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.mainBackground,
  },
}))
