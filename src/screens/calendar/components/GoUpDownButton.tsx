import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import ArrowUp from 'assets/icons/icon-vector.svg'
import { BaseOpacity, useTheme } from 'utils/theme'

type GoUpDownButtonProps = {
  onPress: F0
  arrowDirection: 'up' | 'down'
}

export const GoUpDownButton = (props: GoUpDownButtonProps) => {
  const theme = useTheme()
  const rotation = useSharedValue(0)
  const rotationStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  useEffect(() => {
    if (props.arrowDirection === 'up') rotation.value = withSpring(0)
    else rotation.value = withSpring(180)
  }, [props.arrowDirection, rotation])

  return (
    <BaseOpacity
      width={40}
      height={40}
      position="absolute"
      bottom={84}
      right={24}
      backgroundColor="special"
      borderRadius="full"
      justifyContent="center"
      alignItems="center"
      onPress={() => props.onPress()}>
      <Animated.View style={[rotationStyles]}>
        <ArrowUp color={theme.colors.alwaysWhite} />
      </Animated.View>
    </BaseOpacity>
  )
}
