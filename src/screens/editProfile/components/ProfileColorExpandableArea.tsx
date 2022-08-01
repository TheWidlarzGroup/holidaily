import React from 'react'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { windowHeight, windowWidth } from 'utils/deviceSizes'
import {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { mkUseStyles, Text, useTheme } from 'utils/theme'
import SwipeUpIcon from 'assets/icons/icon-swipe-up.svg'
import { useTranslation } from 'react-i18next'
import { AnimatedBox } from 'components/AnimatedBox'
import { sleep } from 'utils/sleep'

type ProfileColorExpandableAreaProps = {
  callback: F0
  animationStatus: {
    animationIsTriggered: F0
    animationNotTriggered: F0
  }
  currentColor?: string
}

const STARTING_POSITION = 0

export const ProfileColorExpandableArea = (props: ProfileColorExpandableAreaProps) => {
  const styles = useStyles()
  const theme = useTheme()
  const { t } = useTranslation('userProfile')

  const translateY = useSharedValue(STARTING_POSITION)
  const expandableAreaStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: translateY.value }],
    }),
    []
  )

  const triggerAction = async () => {
    props.callback()
    await sleep(100)
    translateY.value = STARTING_POSITION
    props.animationStatus.animationNotTriggered()
  }

  useAnimatedReaction(
    () => translateY.value,
    (data) => {
      const maxHeight = -windowHeight * 1.2
      if (data === maxHeight) runOnJS(triggerAction)()
    }
  )

  const onEndTriggerred = () => {
    props.animationStatus.animationIsTriggered()
    translateY.value = withSpring(-windowHeight * 1.2)
  }

  const eventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      startY: number
    }
  >({
    onStart: (_, ctx) => {
      ctx.startY = STARTING_POSITION
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY
    },
    onEnd: (event) => {
      if (event.translationY < -70) runOnJS(onEndTriggerred)()
      else translateY.value = withSpring(STARTING_POSITION)
    },
  })

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <AnimatedBox
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
          {t('changeColor')}
        </Text>
      </AnimatedBox>
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
