import React, { ComponentProps, ReactNode } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { BaseOpacity } from 'utils/theme'

export type BubbleProps = ComponentProps<typeof BaseOpacity> &
  TouchableOpacityProps & {
    children?: ReactNode
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
