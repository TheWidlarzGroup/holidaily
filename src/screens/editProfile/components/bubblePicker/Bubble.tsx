import React, { useEffect, useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import IconBack from 'assets/icons/icon-back-white.svg'
import { useUserDetailsContext } from 'screens/editProfile/helpers/UserDetailsContext'
import { useNavigation } from '@react-navigation/native'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { useModalContext } from 'contexts/ModalProvider'

type BubbleProps = {
  id: number | string
  color: string
  diameter: number
  position: { x: number; y: number }
  setSelection: F1<number | string>
  selection: number | string
  prevSelection: number | string | undefined
}

export const Bubble = ({
  id,
  color,
  diameter,
  position,
  prevSelection,
  selection,
  setSelection,
}: BubbleProps) => {
  const navigation = useNavigation()
  const { height, width } = useWindowDimensions()
  const { showModal, hideModal } = useModalContext()
  const { setUserColor } = useUserDetailsContext()

  const [showArrow, setShowArrow] = useState(false)

  const centerX = width / 2 - diameter / 2
  const centerY = height / 2 - diameter / 2

  const initialX = position.x
  const initialY = position.y
  const translateX = useSharedValue(initialX)
  const translateY = useSharedValue(initialY)
  const bubbleSize = useSharedValue(0)

  const randomFromRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min)

  useEffect(() => {
    if (selection !== id) {
      setShowArrow(false)
    }
  }, [id, selection, showArrow])

  useEffect(() => {
    if (prevSelection === id) {
      translateX.value = withTiming(randomFromRange(diameter, width - diameter), { duration: 500 })
      translateY.value = withTiming(randomFromRange(95, height - diameter), { duration: 500 })
    }
  }, [diameter, height, id, prevSelection, translateX, translateY, width])

  const handleSelection = () => {
    if (showArrow && translateX.value === centerX && translateY.value === centerY) {
      setUserColor(color)
      showModal(<ChangesSavedModal isVisible content={'New color saved'} hideModal={hideModal} />)
      navigation.goBack()
    }
    translateX.value = withTiming(centerX, { duration: 200 })
    translateY.value = withTiming(centerY, { duration: 200 })
    setShowArrow(true)
    setSelection(id)
  }

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetY: number
      offsetX: number
    }
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value
      ctx.offsetY = translateY.value
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.offsetX + event.translationX
      translateY.value = ctx.offsetY + event.translationY
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateX.value = withDecay({ velocity: velocityX, clamp: [0, width - diameter] })
      translateY.value = withDecay({ velocity: velocityY, clamp: [90, height - diameter] })
    },
  })
  // eslint-disable-next-line arrow-body-style
  const ViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }
  })
  const randomDelay = Math.floor(Math.random() * 600)

  // eslint-disable-next-line arrow-body-style
  const BubbleStyle = useAnimatedStyle(() => {
    return {
      width: withDelay(
        randomDelay,
        withTiming(bubbleSize.value, {
          duration: 600,
        })
      ),
      height: withDelay(
        randomDelay,
        withTiming(bubbleSize.value, {
          duration: 600,
        })
      ),
      borderRadius: withDelay(randomDelay, withTiming(bubbleSize.value, { duration: 600 })),
    }
  })

  useEffect(() => {
    bubbleSize.value = diameter
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={ViewStyle}>
        <TouchableOpacity onPress={handleSelection} activeOpacity={0.8}>
          <Animated.View
            style={[
              BubbleStyle,
              {
                backgroundColor: color,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            {showArrow && <IconBack style={{ transform: [{ rotate: '180deg' }] }} />}
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  )
}
