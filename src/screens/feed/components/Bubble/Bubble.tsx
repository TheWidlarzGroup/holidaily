import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { BaseOpacity } from 'utils/theme'

export type BubbleProps = React.ComponentProps<typeof BaseOpacity> &
  TouchableOpacityProps & {
    children?: React.ReactNode
  }

export const Bubble = ({ children, ...props }: BubbleProps) => (
  <BaseOpacity
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    bg="bubble"
    borderRadius="l"
    {...props}>
    {children}
  </BaseOpacity>
)
