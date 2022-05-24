import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { BaseOpacity } from 'utils/theme'

export type BubbleProps = React.ComponentProps<typeof BaseOpacity> &
  TouchableOpacityProps & {
    children?: React.ReactNode
    isCommentBubble?: true
  }

export const Bubble = ({ children, isCommentBubble, ...props }: BubbleProps) => (
  <BaseOpacity
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    bg="bubble"
    borderRadius={isCommentBubble ? 'lmin' : 'l'}
    {...props}>
    {children}
  </BaseOpacity>
)
