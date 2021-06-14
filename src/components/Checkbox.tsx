import React, { forwardRef, useEffect } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, TextInputProps, Pressable } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { Text, Box, theme } from 'utils/theme/index'

type CheckboxProps = {
  checked: boolean
  onClick: () => void
}

export const Checkbox = ({ checked, onClick }: CheckboxProps) => {
  const backgroundProgress = useDerivedValue(() => {
    return checked ? withTiming(1) : withTiming(0)
  }, [checked])

  const offset = useDerivedValue(() => {
    return checked ? DOT_POSITION_CHECKED : DOT_POSITION_UNCHECKED
  }, [checked])

  const animatedDotStyle = useAnimatedStyle(
    () => ({
      left: withTiming(offset.value, {
        duration: 200,
      }),
    }),
    []
  )

  const backgroundStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      backgroundProgress.value,
      [0, 1],
      [BACKGROUND_UNCHECKED, BACKGROUND_CHECKED]
    )
    return { backgroundColor }
  }, [])

  return (
    <Pressable onPress={onClick}>
      <Animated.View style={[styles.container, backgroundStyles]}>
        <Animated.View
          style={[styles.dot, checked && styles.dotChecked, animatedDotStyle]}></Animated.View>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 56,
    borderRadius: theme.borderRadii.l,
    position: 'relative',
  },
  containerChecked: {},
  dot: {
    position: 'absolute',
    top: -1,
    backgroundColor: 'rgba(255, 140, 63, 0.596)',
    height: 34,
    width: 34,
    borderRadius: 32,
    borderColor: theme.colors.white,
    borderWidth: 3,
  },
  dotChecked: {
    backgroundColor: theme.colors.secondary,
  },
})

const DOT_POSITION_UNCHECKED = -1
const DOT_POSITION_CHECKED = 25
const BACKGROUND_UNCHECKED = theme.colors.lightGrey
const BACKGROUND_CHECKED = theme.colors.primary
