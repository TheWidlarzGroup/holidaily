import { useBooleanState } from 'hooks/useBooleanState'
import React, { useState, useEffect } from 'react'
import { LayoutChangeEvent } from 'react-native'

import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Box } from 'utils/theme'
import { colors } from 'utils/theme/colors'
import Checkmark from './Checkmark'
import { CustomButton, CustomButtonProps } from './CustomButton'

type CheckmarkButtonProps = {
  onFinish?: F0
}

export const CheckmarkButton = ({
  label,
  onFinish = () => {},
  variant = 'secondary',
  ...props
}: CustomButtonProps & CheckmarkButtonProps) => {
  const [checkmarkColor, setCheckmarkColor] = useState('white')
  const [isContentVisible, { setFalse: hideContent }] = useBooleanState(true)
  const [isCircle, { setTrue: setCircle }] = useBooleanState(false)
  const containerWidth = useSharedValue(0)
  const opacity = useSharedValue(1)

  useEffect(() => {
    switch (variant) {
      case 'secondary':
        setCheckmarkColor(colors.black)
        break
      case 'blackBgButton':
        setCheckmarkColor(colors.white)
        break
      case 'primary':
        setCheckmarkColor(colors.white)
        break
      default:
        setCheckmarkColor(colors.black)
        break
    }
  }, [variant])

  const handlePress = () => {
    hideContent()
    containerWidth.value = withTiming(
      variant === 'secondary' ? 84 : 80,
      { duration: 250, easing: Easing.linear },
      () => {
        runOnJS(setCircle)()
      }
    )
  }
  const containerStyle = useAnimatedStyle(
    () => ({
      width: containerWidth.value,
      opacity: opacity.value,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    [containerWidth, opacity]
  )
  const measureWidth = ({
    nativeEvent: {
      layout: { width },
    },
  }: LayoutChangeEvent) => {
    containerWidth.value = width
  }
  return (
    <Box alignItems="center" onLayout={measureWidth}>
      <Animated.View style={containerStyle}>
        <CustomButton label={label} onPress={handlePress} variant={variant} {...props}>
          {!isContentVisible && (
            <Checkmark onFinish={onFinish} start={isCircle} color={checkmarkColor} />
          )}
        </CustomButton>
      </Animated.View>
    </Box>
  )
}
