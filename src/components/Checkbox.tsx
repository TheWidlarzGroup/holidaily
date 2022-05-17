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
  size?: 's' | 'l'
  backgroundColor?: string
}

// TODO: This checkbox in size 'l' appears in "Add Request" screen and it should be changed after the UI mock would be completed
const DOT_POSITION_UNCHECKED = -1
const DOT_POSITION_CHECKED = 25
const DOT_POSITION_SMALL_UNCHECKED = 4
const DOT_POSITION_CHECKED_SMALL = 20

export const Checkbox = ({
  checked,
  onPress,
  size = 'l',
  backgroundColor: backgroundColorProp = '#F3F3F3',
}: CheckboxProps) => {
  const styles = useStyles()
  const colors = useColors()

  const backgroundProgress = useDerivedValue(
    () => (checked ? withTiming(1) : withTiming(0)),
    [checked]
  )

  const offset = useDerivedValue(() => {
    if (!checked && size === 'l') return DOT_POSITION_UNCHECKED
    if (!checked && size !== 'l') return DOT_POSITION_SMALL_UNCHECKED
    return size === 'l' ? DOT_POSITION_CHECKED : DOT_POSITION_CHECKED_SMALL
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
      [colors.darkGrey, colors.special]
    )
    return { backgroundColor }
  }, [])

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[size === 'l' ? styles.container : styles.containerSmall, backgroundStyles]}>
        <Animated.View
          style={[
            styles.dot,
            size === 'l' ? styles.dotLarge : styles.dotSmall,
            checked && styles.dotChecked,
            animatedDotStyle,
            { borderColor: backgroundColorProp },
          ]}
        />
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
  containerSmall: {
    height: 28,
    width: 44,
    borderRadius: theme.borderRadii.l,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: 4,
    backgroundColor: theme.colors.white,
    borderRadius: 32,
  },
  dotLarge: {
    position: 'absolute',
    top: -1,
    height: 34,
    width: 34,
    borderWidth: 3,
  },
  dotSmall: {
    height: 20,
    width: 20,
  },
  dotChecked: {
    backgroundColor: theme.colors.alwaysDarkenWhite,
  },
}))
