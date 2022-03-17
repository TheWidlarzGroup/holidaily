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
    <Bubble
      margin="xs"
      onPress={toggle}
      {...props}
      borderColor="black"
      borderWidth={toggled ? 1.5 : 0}
      height={42}>
      <Text padding="s">{emoji}</Text>
      {!!quantity && (
        <Text paddingEnd="m" variant="primaryBold12" color="black">
          {quantity}
        </Text>
      )}
    </Bubble>
  )
}
