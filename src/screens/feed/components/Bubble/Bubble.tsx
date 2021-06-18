import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { BaseOpacity } from 'utils/theme'

// TODO - Proper typings fro Bubble (inherit from BaseOpacity)

export type BubbleProps = TouchableOpacityProps & {
  children?: React.ReactNode
}

export const Bubble = ({ children, ...props }: BubbleProps) => (
  <BaseOpacity
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    bg="rippleColor"
    borderRadius="l"
    {...props}>
    {children}
  </BaseOpacity>
)
