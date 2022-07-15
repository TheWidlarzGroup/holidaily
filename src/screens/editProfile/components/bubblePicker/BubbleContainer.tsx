import React, { useEffect, useMemo, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Box, mkUseStyles, Text, useTheme } from 'utils/theme'
import { shadow } from 'utils/theme/shadows'
import { UserProfileNavigationProps } from 'navigation/types'
import { windowHeight, windowWidth } from 'utils/deviceSizes'
import { useTranslation } from 'react-i18next'
import { useAsyncEffect } from 'hooks/useAsyncEffect'
import { sleep } from 'utils/sleep'
import { Bubble } from './Bubble'
import { useBubbles } from './useBubbles'
import { CheckMark } from './Checkmark'
import { BUBBLE_CONSTANTS as C } from './BubbleHelper'
import { BubbleContainerButtons } from './BubbleContainerButtons'
import { BubbleContainerHeader } from './BubbleContainerHeader'

const DropArea = Animated.createAnimatedComponent(Box)

export const BubbleContainer = ({
  route: { params: p },
}: UserProfileNavigationProps<'COLOR_PICKER'>) => {
  const [isAnimated, setIsAnimated] = useState(false)
  const styles = useStyles()
  const theme = useTheme()
  const { t } = useTranslation('userProfile')
  const [dropColor, setDropColor] = useState(theme.colors.colorPickerDropArea)
  const { animatedDrop, bubbles, animateCheckmark, dropArea, animateDropArea } = useBubbles()
  const currentBubble = useMemo(
    () => bubbles.find((bubble) => bubble.color === p.value),
    [bubbles, p.value]
  )

  useEffect(() => {
    if (dropColor !== theme.colors.colorPickerDropArea) p.onChange(dropColor)
  }, [dropColor, p, theme.colors.colorPickerDropArea])

  const startingScale = 100
  const startingY = windowHeight * 0.5
  const startingX = windowWidth * 0.5

  const bubbleY = useSharedValue(startingY)
  const bubbleX = useSharedValue(startingX)
  const bubbleScale = useSharedValue(startingScale)

  const AnimatedBubble = Animated.createAnimatedComponent(Box)
  const AnimatedBubbleStyle = useAnimatedStyle(
    () => ({
      top: bubbleY.value,
      left: bubbleX.value,
      transform: [{ scale: bubbleScale.value }],
    }),
    []
  )

  useAsyncEffect(async () => {
    if (currentBubble) {
      bubbleScale.value = withTiming(1, { duration: 3000 })
      await sleep(2000)
      bubbleX.value = currentBubble.position.x
      bubbleY.value = currentBubble.position.y
      await sleep(1000)
      setIsAnimated(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box flex={1} backgroundColor="colorPickerBackdrop" flexWrap="wrap">
      {animateCheckmark && <CheckMark animateCheckmark={animateCheckmark} />}
      <BubbleContainerButtons />
      <BubbleContainerHeader />
      <DropArea
        style={[
          styles.dropArea,
          animatedDrop,
          {
            backgroundColor: dropColor,
            zIndex: dropColor === theme.colors.colorPickerDropArea ? 0 : 3,
          },
        ]}
      />
      {!isAnimated && (
        <AnimatedBubble
          zIndex="10"
          position="absolute"
          width={C.BUBBLE_SIZE}
          height={C.BUBBLE_SIZE}
          style={[AnimatedBubbleStyle, { backgroundColor: p.value, borderRadius: 500 }]}
        />
      )}
      {bubbles.map((bubble) => (
        <Box position="absolute" key={bubble.id}>
          <Bubble
            {...bubble}
            diameter={C.BUBBLE_SIZE}
            setDropColor={setDropColor}
            dropArea={dropArea.value}
            animateDropArea={animateDropArea}
          />
        </Box>
      ))}
      <Box position="absolute" bottom={64} width="100%" alignItems="center">
        <Text variant="textBoldXS" color="alwaysWhite">
          {t('dropAreaText')}
        </Text>
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  dropArea: {
    position: 'absolute',
    width: windowWidth * 1.2,
    left: -windowWidth * 0.1,
    aspectRatio: 1,
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
