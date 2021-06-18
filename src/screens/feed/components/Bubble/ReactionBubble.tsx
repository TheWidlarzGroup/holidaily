import React from 'react'

import { useBooleanState } from 'hooks/useBooleanState'
import { Text } from 'utils/theme'
import { Bubble } from './Bubble'

type ReactionBubbleProps = {
  selectable?: boolean
  selected?: boolean
  emoji: string
  quantity?: number
}

export const ReactionBubble = ({ selected, emoji, quantity, ...props }: ReactionBubbleProps) => {
  const [toggled, { toggle }] = useBooleanState(selected ?? false)

  const bg = toggled ? 'primary' : 'rippleColor'

  return (
    <Bubble margin="xs" onPress={toggle} {...props} {...bg}>
      <Text padding="s">{emoji}</Text>
      {quantity ? <Text paddingEnd="m">{quantity}</Text> : null}
    </Bubble>
  )
}
