import React from 'react'

import { Text } from 'utils/theme'
import { useUserContext } from 'hooks/useUserContext'
import { Reaction } from 'mock-api/models/miragePostTypes'
import { Bubble } from './Bubble'

type ReactionBubbleProps = {
  reaction: Reaction
  handlePressReaction: F1<string>
}

export const ReactionBubble = ({ reaction, handlePressReaction }: ReactionBubbleProps) => {
  const { user } = useUserContext()

  const hasUserAddedReaction = reaction.users?.includes(user?.id || '')

  return (
    <Bubble
      margin="xs"
      onPress={() => handlePressReaction(reaction.type)}
      borderColor="black"
      borderWidth={hasUserAddedReaction ? 1.5 : 0}
      height={42}>
      <Text padding="s">{reaction.type}</Text>
      {reaction.users?.length > 0 && (
        <Text paddingEnd="m" variant="primaryBold12" color="black">
          {reaction.users?.length}
        </Text>
      )}
    </Bubble>
  )
}
