import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'

import { mkUseStyles, useColors } from 'utils/theme/index'

type CheckboxProps = {
  checked: boolean
  onPress: F0
}

const DOT_POSITION_UNCHECKED = -1
const DOT_POSITION_CHECKED = 25

export const Checkbox = ({ checked, onPress }: CheckboxProps) => {
  const styles = useStyles()
  const colors = useColors()

  const backgroundProgress = useDerivedValue(
    () => (checked ? withTiming(1) : withTiming(0)),
    [checked]
  )

  const offset = useDerivedValue(
    () => (checked ? DOT_POSITION_CHECKED : DOT_POSITION_UNCHECKED),
    [checked]
  )

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
      [colors.lightGrey, colors.primary]
    )
    return { backgroundColor }
  }, [])

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[styles.container, backgroundStyles]}>
        <Animated.View style={[styles.dot, checked && styles.dotChecked, animatedDotStyle]} />
      </Animated.View>
    </TouchableOpacity>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    height: 32,
    width: 56,
    borderRadius: theme.borderRadii.l,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: -1,
    backgroundColor: 'rgba(255, 140, 63, 0.596)',
    height: 34,
    width: 34,
    borderRadius: 32,
    borderColor: theme.colors.disabledText,
    borderWidth: 3,
  },
  dotChecked: {
    backgroundColor: theme.colors.secondary,
  },
}))
