import React, { FC } from 'react'
import { Pressable, PressableProps } from 'react-native'
import { themeBase } from 'utils/theme/themeBase'

export const FooterButton: FC<PressableProps> = ({ onPress, onLongPress, children }) => (
  <Pressable onPress={onPress} onLongPress={onLongPress} android_ripple={androidRipple}>
    {children}
  </Pressable>
)

const androidRipple = {
  color: themeBase.colors.rippleColor,
  borderless: true,
}
