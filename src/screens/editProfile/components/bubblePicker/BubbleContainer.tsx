import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { Box, Text, mkUseStyles, Theme, theme } from 'utils/theme'
import { shadow } from 'utils/theme/shadows'
import { randomFromRange } from 'utils/randomFromRange'
import IconBack from 'assets/icons/icon-back-white.svg'
import { Bubble } from './Bubble'
import { CheckMark } from './Checkmark'
import { COLORS } from '../../helpers/mockedData'
import { BUBBLE_CONSTANTS as C } from './BubbleHelper'

export type Position = {
  x: number
  y: number
}

type BubbleProps = {
  position: Position
  id: number | string
  color: string
}

export const BubbleContainer = () => {
  const styles = useStyles()
  const { goBack } = useNavigation()
  const [dropColor, setDropColor] = useState(theme.colors.disabledText)
  const [animateCheckmark, setAnimateCheckmark] = useState(false)
  const { width, height } = useWindowDimensions()
  const dropTop = useSharedValue(height - C.DROP_AREA_OFFSET_BOTTOM)
  const dropHeight = useSharedValue(C.DROP_AREA_INIT_HEIGHT)

  const initBubbles = COLORS.map((color) => ({
    ...color,
    position: {
      x: randomFromRange(C.BUBBLE_SIZE, width - C.BUBBLE_SIZE),
      y: randomFromRange(C.BUBBLES_OFFSET_TOP, height - C.BUBBLES_OFFSET_BOTTOM),
    },
  }))
  const [bubbles] = useState<BubbleProps[]>(initBubbles)

  const animateDropArea = () => {
    dropTop.value = withTiming(-50, C.ANIMATION_CONFIG_MEDIUM)
    dropHeight.value = withTiming(1.5 * height, C.ANIMATION_CONFIG_MEDIUM)
    setTimeout(() => setAnimateCheckmark(true), C.CHECKMARK_ANIMATION_DELAY)
  }

  const animatedDrop = useAnimatedStyle(() => ({
    top: dropTop.value,
    height: dropHeight.value,
  }))

  return (
    <View style={styles.mainContainer}>
      {animateCheckmark && <CheckMark animateCheckmark={animateCheckmark} />}
      <TouchableOpacity onPress={goBack} style={styles.backBtn} activeOpacity={0.2}>
        <IconBack />
      </TouchableOpacity>
      <Box marginTop="xxxl" alignItems="center">
        <Text variant="buttonText1" marginHorizontal="xxl">
          Pick your favourite color and drop it in the grey area below
        </Text>
      </Box>
      <Animated.View
        style={[
          styles.dropArea,
          animatedDrop,
          {
            backgroundColor: dropColor,
            left: width / 2 - 500,
            zIndex: dropColor === theme.colors.disabledText ? 0 : 3,
          },
        ]}
      />
      {bubbles.map((bubble) => (
        <Box position="absolute" key={bubble.id}>
          <Bubble
            {...bubble}
            diameter={C.BUBBLE_SIZE}
            dropArea={dropTop.value}
            setDropColor={setDropColor}
            animateDropArea={animateDropArea}
          />
        </Box>
      ))}
    </View>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  backBtn: {
    position: 'absolute',
    left: 0,
    top: 65,
    zIndex: theme.zIndices['2'],
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexWrap: 'wrap',
  },
  dropArea: {
    position: 'absolute',
    width: 1000,
    borderRadius: 500,
    shadowColor: shadow.md.shadowColor,
    shadowRadius: shadow.md.shadowRadius,
    shadowOpacity: shadow.md.shadowOpacity,
    shadowOffset: shadow.md.shadowOffset,
  },
  scaleCheckmark: {
    transform: [{ scale: 2 }],
  },
}))
