import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Box, Text, mkUseStyles, Theme, theme } from 'utils/theme'
import IconBack from 'assets/icons/icon-back-white.svg'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { shadow } from 'utils/theme/shadows'
import Checkmark from 'components/Checkmark'
import { Bubble } from './Bubble'

export type Position = {
  x: number
  y: number
}

type ColorProps = {
  id: number | string
  color: string
}
const COLORS: ColorProps[] = [
  {
    color: 'red',
    id: 1,
  },
  {
    color: 'blue',
    id: 2,
  },
  {
    color: 'pink',
    id: 3,
  },
  {
    color: 'orange',
    id: 4,
  },
  {
    color: 'grey',
    id: 5,
  },
  {
    color: 'green',
    id: 6,
  },
  {
    color: 'red',
    id: 7,
  },
  {
    color: 'blue',
    id: 8,
  },
  {
    color: 'pink',
    id: 9,
  },
  {
    color: 'orange',
    id: 10,
  },
  {
    color: 'grey',
    id: 11,
  },
  {
    color: 'green',
    id: 12,
  },
  {
    color: 'red',
    id: 13,
  },
  {
    color: 'blue',
    id: 14,
  },
  {
    color: 'pink',
    id: 15,
  },
  {
    color: 'orange',
    id: 16,
  },
  {
    color: 'grey',
    id: 17,
  },
  {
    color: 'green',
    id: 18,
  },
]

type BubbleProps = {
  position: Position
  id: number | string
  color: string
}

export const BubbleContainer = () => {
  const styles = useStyles()
  const { goBack } = useNavigation()
  const [dropColor, setDropColor] = useState('#F3F3F3')
  const [animateCheckmark, setAnimateCheckmark] = useState(false)
  const { width, height } = useWindowDimensions()
  const diameter = 56
  const checkmarkBoxSize = 30
  const checkmarkCenter = {
    x: width / 2 - checkmarkBoxSize / 2,
    y: height / 2 - checkmarkBoxSize / 2,
  }
  const dropTop = useSharedValue(height - 175)
  const dropHeight = useSharedValue(1000)

  const randomFromRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min)

  const initBubbles = COLORS.map((color) => ({
    ...color,
    position: {
      x: randomFromRange(diameter, width - diameter),
      y: randomFromRange(130, height - 250),
    },
  }))
  const [bubbles] = useState<BubbleProps[]>(initBubbles)

  const animateDropArea = () => {
    dropTop.value = withTiming(-50, { duration: 400 })
    dropHeight.value = withTiming(1.5 * height, { duration: 400 })
    setTimeout(() => setAnimateCheckmark(true), 200)
  }

  // eslint-disable-next-line arrow-body-style
  const AnimatedDrop = useAnimatedStyle(() => {
    return {
      top: dropTop.value,
      height: dropHeight.value,
    }
  })

  return (
    <View style={styles.mainContainer}>
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
          AnimatedDrop,
          {
            backgroundColor: dropColor,
            left: width / 2 - 500,
            zIndex: dropColor === '#F3F3F3' ? 0 : 1,
          },
        ]}></Animated.View>
      {animateCheckmark && (
        <Box
          position="absolute"
          top={checkmarkCenter.y}
          left={checkmarkCenter.x}
          width={checkmarkBoxSize}
          height={checkmarkBoxSize}
          alignItems="center"
          justifyContent="center"
          backgroundColor="transparent"
          zIndex="10">
          <Checkmark
            width={10}
            start={animateCheckmark}
            color={theme.colors.white}
            onFinish={() => {}}
          />
        </Box>
      )}

      {bubbles.map((bubble) => (
        <Box position="absolute" key={bubble.id}>
          <Bubble
            {...bubble}
            diameter={diameter}
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
    zIndex: theme.zIndices['5'],
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
    opacity: 0.75,
    shadowColor: shadow.md.shadowColor,
    shadowRadius: shadow.md.shadowRadius,
    shadowOpacity: shadow.md.shadowOpacity,
    shadowOffset: shadow.md.shadowOffset,
  },
}))
