import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated'
import IconBack from 'assets/icons/icon-back-white.svg'
import { useUserDetailsContext } from 'screens/editProfile/helpers/UserDetailsContext'
import { useNavigation } from '@react-navigation/native'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { useModalContext } from 'contexts/ModalProvider'

type BubbleProps = {
  color: string
  diameter: number
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>
}

export const Bubble = ({ color, diameter, setIsSelected }: BubbleProps) => {
  const { height, width } = useWindowDimensions()
  const { setUserColor } = useUserDetailsContext()
  const navigation = useNavigation()
  const { showModal, hideModal } = useModalContext()
  const [showArrow, setShowArrow] = useState(false)

  const initialX = Math.random() * (width - diameter)
  const initialY = Math.random() * (height - diameter)

  const translateX = useSharedValue(initialX)
  const translateY = useSharedValue(initialY)

  const handleSelection = () => {
    if (showArrow) {
      setUserColor(color)
      navigation.goBack()
      showModal(<ChangesSavedModal isVisible content={'New color saved'} hideModal={hideModal} />)
    }
    translateX.value = 180
    translateY.value = height / 2
    setIsSelected(true)
    setShowArrow(true)
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
      translateY.value = withDecay({ velocity: velocityY, clamp: [95, height] })
    },
  })
  // eslint-disable-next-line arrow-body-style
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={style}>
        <TouchableOpacity
          style={{
            backgroundColor: color,
            width: diameter,
            height: diameter,
            borderRadius: diameter / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleSelection}>
          {showArrow && <IconBack style={{ transform: [{ rotate: '180deg' }] }} />}
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  )
}
