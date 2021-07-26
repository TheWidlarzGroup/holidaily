import React, { FC } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { BaseOpacity, mkUseStyles } from 'utils/theme'

type AlertProps = {
  show: boolean
  style?: StyleProp<ViewStyle>
  onPress?: F0
}

export const Alert: FC<AlertProps> = ({ show, style, onPress, children }) => {
  const styles = useStyles()
  const progress = useDerivedValue(() => (show ? 0 : 1), [show])

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withTiming(1 - progress.value, { duration: 300 }),
    transform: [
      {
        translateY: withTiming(-(progress.value * 200), { duration: 300 }),
      },
    ],
  }))

  if (!show) return null
  return (
    <Animated.View style={[styles.container, style, animatedStyles]}>
      <BaseOpacity style={styles.button} onPress={onPress}>
        {children}
      </BaseOpacity>
    </Animated.View>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: '#D3FF9E',
    position: 'absolute',
    left: 0,
    right: 0,
    top: -50,
    height: 84,
    borderRadius: theme.borderRadii.m,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
}))
