import React, { ComponentProps, useEffect, useState } from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { useBooleanState } from 'hooks/useBooleanState'
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native'
import { useTranslation } from 'react-i18next'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { LocationGeocodedAddress } from 'expo-location'

type ExpandingTextProps = ComponentProps<typeof Text> & {
  text: string
  lines?: number
  location?: LocationGeocodedAddress
}

const AnimatedBaseOpacity = Animated.createAnimatedComponent(BaseOpacity)

const LINE_HEIGHT = 21
const PADDING = 12

export const ExpandingText = ({ text, location, lines = 3, ...textProps }: ExpandingTextProps) => {
  const { t } = useTranslation('feed')
  const [numOfLines, setNumOfLines] = useState(lines)
  const [opened, { toggle }] = useBooleanState(false)
  const [initialNumOfLines, setInitialNumOfLines] = useState(0)
  const height = useSharedValue(initialNumOfLines * LINE_HEIGHT)
  const opacity = useSharedValue(0)

  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const textLines = e?.nativeEvent?.lines.length
    setInitialNumOfLines(textLines)
  }

  useEffect(() => {
    if (!opened && initialNumOfLines > 3) setNumOfLines(3)
    else setNumOfLines(initialNumOfLines)
  }, [initialNumOfLines, opened])

  useEffect(() => {
    height.value = withTiming(LINE_HEIGHT * numOfLines + PADDING, {
      duration: 150,
      easing: Easing.exp,
    })
  }, [height, initialNumOfLines, numOfLines, opacity, opened])

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value + 10,
  }))

  const numberOfChars = opened ? 999 : 130

  return (
    <AnimatedBaseOpacity
      marginTop={location ? '-m' : 'none'}
      onPress={toggle}
      activeOpacity={1}
      style={initialNumOfLines > 3 && animatedStyle}>
      <Text
        {...textProps}
        numberOfLines={opened ? undefined : 3}
        variant="textSM"
        lineHeight={LINE_HEIGHT}
        paddingBottom="m">
        {text.slice(0, numberOfChars)}
        {text.length > 130 && !opened && (
          <>
            {'... '}
            <Text variant="textSM" color="special">
              {t('seeMoreCapitalized')}
            </Text>
          </>
        )}
      </Text>
      {/* Comment: below non visible box to get initial number of text lines */}
      <Box position="absolute" zIndex="-1">
        <Text
          variant="textSM"
          lineHeight={LINE_HEIGHT}
          onTextLayout={onTextLayout}
          color="transparent">
          {text}
        </Text>
      </Box>
    </AnimatedBaseOpacity>
  )
}
