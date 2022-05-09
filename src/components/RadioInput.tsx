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
      [colors.transparent, colors.primary]
    )
    const borderWidth = withTiming(changeProgress.value * 3, {
      duration: 30,
    })
    const margin = withTiming((1 - changeProgress.value) * 3, {
      duration: 30,
    })
    return { borderColor, borderWidth, margin }
  }, [])

  const animatedCenterStyles = useAnimatedStyle(() => {
    const borderColor = interpolateColor(changeProgress.value, [0, 1], [colors.grey, colors.white])
    const backgroundColor = interpolateColor(
      changeProgress.value,
      [0, 1],
      [colors.grey, colors.secondary]
    )
    return { borderColor, backgroundColor }
  }, [])

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[styles.ring, animatedRingStyles]}>
        <Animated.View style={[styles.center, animatedCenterStyles]} />
      </Animated.View>
    </TouchableOpacity>
  )
}

const useStyles = mkUseStyles((theme) => ({
  center: {
    height: 15,
    width: 15,
    backgroundColor: theme.colors.tertiary,
    borderRadius: theme.borderRadii.full,
    borderColor: theme.colors.white,
    borderWidth: 2.5,
  },
  ring: {
    borderRadius: theme.borderRadii.full,
  },
}))
