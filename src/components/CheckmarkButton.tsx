import { useBooleanState } from 'hooks/useBooleanState'
import React, { useState } from 'react'

import { FlexStyle } from 'react-native'
import { RectButtonProperties } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Box } from 'utils/theme'
import CheckmarkLoading from './CheckmarkLoading'
import { CustomButton, CustomButtonProps } from './CustomButton'

interface CheckmarkButtonProps extends RectButtonProperties, FlexStyle {
  onFinish: () => void
  loading: boolean
}

export const CheckmarkButton = ({
  label,
  onPress,
  onFinish,
  loading,
  ...props
}: CustomButtonProps & CheckmarkButtonProps) => {
  const [text, setText] = useState(label)
  const [isCircle, { setTrue: setCircle }] = useBooleanState(false)
  const containerWidth = useSharedValue(0)
  const opacity = useSharedValue(1)
  const handlePress = () => {
    if (onPress) onPress()
    containerWidth.value = withTiming(85, { duration: 250, easing: Easing.linear }, () =>
      runOnJS(setCircle)()
    )
    setText(' ')
  }
  const containerStyle = useAnimatedStyle(
    () => ({
      width: containerWidth.value,
      opacity: opacity.value,
    }),
    [containerWidth, opacity]
  )
  return (
    <Box
      alignItems="center"
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => {
        containerWidth.value = width
      }}>
      <Animated.View style={[containerStyle, { justifyContent: 'center', alignItems: 'center' }]}>
        {isCircle ? (
          <CheckmarkLoading callback={() => onFinish()} loading={loading} />
        ) : (
          <CustomButton label={text} onPress={handlePress} {...props} />
        )}
      </Animated.View>
    </Box>
  )
}
