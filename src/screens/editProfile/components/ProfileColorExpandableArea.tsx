import React from 'react'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { windowHeight, windowWidth } from 'utils/deviceSizes'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Box, Text, mkUseStyles, useTheme } from 'utils/theme'
import SwipeUpIcon from 'assets/icons/icon-swipe-up.svg'
import { sleep } from 'utils/sleep'

type ProfileColorExpandableAreaProps = {
  callback: F0
  currentColor?: string
}

export const ProfileColorExpandableArea = (props: ProfileColorExpandableAreaProps) => {
  const styles = useStyles()
  const theme = useTheme()

  const startingPosition = 0
  const translateY = useSharedValue(startingPosition)
  const ExpandableArea = Animated.createAnimatedComponent(Box)
  const expandableAreaStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: translateY.value }],
    }),
    []
  )

  const triggerAction = async () => {
    props.callback()
    await sleep(500)
    translateY.value = startingPosition
  }

  useAnimatedReaction(
    () => translateY.value,
    (data) => {
      const maxHeight = -windowHeight * 1.2
      if (data === maxHeight) {
        runOnJS(triggerAction)()
      }
    }
  )

  const eventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      startY: number
    }
  >({
    onStart: (_, ctx) => {
      ctx.startY = startingPosition
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY
    },
    onEnd: (event) => {
      if (event.translationY < -200) {
        translateY.value = withSpring(-windowHeight * 1.2)
      } else {
        translateY.value = withSpring(startingPosition)
      }
    },
  })

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <ExpandableArea
        style={[
          styles.componentArea,
          expandableAreaStyle,
          {
            backgroundColor: props.currentColor || theme.colors.primary,
          },
        ]}>
        <SwipeUpIcon
          width={12}
          height={12}
          style={styles.swipeUpIcon}
          color={theme.colors.alwaysWhite}
        />
        <Text style={styles.changeColor} variant="textBoldSM" lineHeight={21} color="alwaysWhite">
          Change color
        </Text>
      </ExpandableArea>
    </PanGestureHandler>
  )
}

const useStyles = mkUseStyles(() => ({
  componentArea: {
    height: windowHeight * 2,
    width: windowWidth * 1.2,
    left: -windowWidth * 0.1,
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
    alignItems: 'center',
  },
  swipeUpIcon: {
    top: 17,
  },
  changeColor: {
    position: 'relative',
    top: 42,
  },
}))
