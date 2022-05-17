import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'

import { mkUseStyles, useColors } from 'utils/theme/index'

type RadioInputProps = {
  checked: boolean
  onPress: F0
}

export const RadioInput = ({ checked, onPress }: RadioInputProps) => {
  const styles = useStyles()
  const colors = useColors()

  const changeProgress = useDerivedValue(() => (checked ? withTiming(1) : withTiming(0)), [checked])

  const animatedRingStyles = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      changeProgress.value,
      [0, 1],
      [colors.transparent, colors.special]
    )
    return { borderColor }
  }, [])

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={checked ? [styles.ringChecked, animatedRingStyles] : styles.ring}>
        <Animated.View style={checked ? styles.centerChecked : styles.center} />
      </Animated.View>
    </TouchableOpacity>
  )
}

const useStyles = mkUseStyles((theme) => ({
  center: {
    height: 18,
    width: 18,
    borderRadius: theme.borderRadii.full,
    backgroundColor: theme.colors.transparent,
  },
  centerChecked: {
    height: 15,
    width: 15,
    borderRadius: theme.borderRadii.full,
    backgroundColor: theme.colors.transparent,
  },
  ring: {
    borderWidth: 2,
    marginRight: 1,
    borderColor: theme.colors.darkGrey,
    borderRadius: theme.borderRadii.full,
  },
  ringChecked: {
    borderWidth: 5,
    borderColor: theme.colors.special,
    borderRadius: theme.borderRadii.full,
  },
}))
