import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import React from 'react'
import { ModalProps } from 'react-native-modal'
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { Box } from 'utils/theme'

const AnimatedBox = Animated.createAnimatedComponent(Box)

type BottomModalProps = Pick<ModalProps, 'isVisible'> & {
  children: React.ReactNode
  isInvalid?: boolean
  coverScreen?: true
}

export const BottomModal = (p: BottomModalProps) => {
  const progress = useDerivedValue(() => (p.isVisible ? 1 : 0), [p.isVisible])
  const { height } = useDimensions()
  const animatedModalStyles = useAnimatedStyle(() => {
    const v = progress.value
    const h = p.coverScreen ? height : 100
    return {
      transform: [{ translateY: withTiming((1 - v) * h, { duration: 100 }) }],
      opacity: withTiming(v, { duration: 100 }),
    }
  }, [])

  if (!p.isVisible) return null
  return (
    <AnimatedBox
      flex={1}
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      top={p.coverScreen ? -5 : undefined}
      borderTopLeftRadius="lmin"
      borderTopRightRadius="lmin"
      paddingHorizontal={p.coverScreen ? undefined : 'xxl'}
      paddingVertical={p.coverScreen ? undefined : 'xl'}
      backgroundColor={p.isInvalid ? 'specialRed' : 'primary'}
      shadowColor="black"
      shadowOffset={{ width: -2, height: 0 }}
      shadowOpacity={0.04}
      shadowRadius={2}
      elevation={20}
      style={animatedModalStyles}>
      {p.children}
    </AnimatedBox>
  )
}
