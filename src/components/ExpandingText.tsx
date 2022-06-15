import React, { useEffect, useState } from 'react'
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

type ExpandingTextProps = React.ComponentProps<typeof Text> & {
  text: string
  lines?: number
}

const AnimatedBaseOpacity = Animated.createAnimatedComponent(BaseOpacity)

const LINE_HEIGHT = 21
const PADDING = 12

export const ExpandingText = ({ text, lines = 3, ...textProps }: ExpandingTextProps) => {
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
      duration: 250,
      easing: Easing.exp,
    })
    opacity.value = withTiming(opened ? 1 : 0, { duration: 400 })
  }, [height, initialNumOfLines, numOfLines, opacity, opened])

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }))

  const animatedText = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const numberOfChars = opened ? 999 : 130

  return (
    <AnimatedBaseOpacity
      onPress={toggle}
      activeOpacity={1}
      style={initialNumOfLines > 3 && animatedStyle}>
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
      <Text
        {...textProps}
        numberOfLines={opened ? undefined : 3}
        variant="textSM"
        lineHeight={LINE_HEIGHT}
        paddingBottom="xxm">
        {text.slice(0, numberOfChars)}
        {text.length > 130 && !opened && (
          <>
            {'... '}
            <Text variant="textSM" color="special" style={animatedText}>
              {t('seeMoreCapitalized')}
            </Text>
          </>
        )}
        {opened && initialNumOfLines > 3 && (
          <Text variant="textSM" color="special">
            {t('showLessCapitalized')}
          </Text>
        )}
      </Text>
    </AnimatedBaseOpacity>
  )
}
