import React from 'react'
import { ModalProps } from 'react-native-modal'
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { Box } from 'utils/theme'

const AnimatedBox = Animated.createAnimatedComponent(Box)

type BottomModalProps = Pick<ModalProps, 'isVisible'> & {
  children: React.ReactNode
  isInvalid?: boolean
}

export const BottomModal = ({ children, isVisible, isInvalid }: BottomModalProps) => {
  const progress = useDerivedValue(() => (isVisible ? 1 : 0), [isVisible])
  const animatedModalStyles = useAnimatedStyle(() => {
    const v = progress.value
    const h = 100
    return {
      transform: [{ translateY: withTiming((1 - v) * h, { duration: 100 }) }],
      opacity: withTiming(v, { duration: 100 }),
    }
  }, [])

  if (!isVisible) return null
  return (
    <AnimatedBox
      flex={1}
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      borderTopLeftRadius="lmin"
      borderTopRightRadius="lmin"
      paddingHorizontal="xxl"
      paddingVertical="xl"
      backgroundColor={isInvalid ? 'specialRed' : 'primary'}
      style={animatedModalStyles}>
      {children}
    </AnimatedBox>
  )
}
