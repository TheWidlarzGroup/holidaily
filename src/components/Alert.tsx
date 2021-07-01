import { useBooleanState } from 'hooks/useBooleanState'
import React, { useEffect, FC } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { mkUseStyles } from 'utils/theme'

type AlertProps = {
  show: boolean
  style?: StyleProp<ViewStyle>
}

export const Alert: FC<AlertProps> = ({ show, style, children }) => {
  const [hidden, { setTrue: setHiddenTrue, setFalse: setHiddenFalse }] = useBooleanState(!show)
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
  useEffect(() => {
    if (show) setHiddenFalse()
    else setTimeout(setHiddenTrue, 1000)
  }, [show, setHiddenFalse, setHiddenTrue])

  if (!show && hidden) return null
  return <Animated.View style={[styles.container, style, animatedStyles]}>{children}</Animated.View>
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
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}))
