import React from 'react'

import { useBooleanState } from 'hooks/useBooleanState'
import { Text } from 'utils/theme'
import { Bubble } from './Bubble'

type ReactionBubbleProps = {
  emoji: string
  selectable?: boolean
  selected?: boolean
  quantity?: number
}

export const ReactionBubble = ({ selected, emoji, quantity, ...props }: ReactionBubbleProps) => {
  const [toggled, { toggle }] = useBooleanState(selected ?? false)

  return (
    <Bubble margin="xs" onPress={toggle} {...props} bg={toggled ? 'primary' : 'rippleColor'}>
      <Text padding="s">{emoji}</Text>
      {!!quantity && <Text paddingEnd="m">{quantity}</Text>}
    </Bubble>
  )
}
