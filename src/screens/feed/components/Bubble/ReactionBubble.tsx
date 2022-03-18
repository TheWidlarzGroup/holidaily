import React from 'react'

import { Text } from 'utils/theme'
import { useUserContext } from 'hooks/useUserContext'
import { Reaction } from 'screens/feed/types'
import { Bubble } from './Bubble'

type ReactionBubbleProps = {
  reaction: Reaction
  handlePressReaction: (emoji: string) => void
}

export const ReactionBubble = ({ reaction, handlePressReaction }: ReactionBubbleProps) => {
  const { user } = useUserContext()

  const checkIfUserAddedReaction = reaction.users.includes(user?.id || '')

  return (
    <Bubble
      margin="xs"
      onPress={() => handlePressReaction(reaction.type)}
      borderColor="black"
      borderWidth={checkIfUserAddedReaction ? 1.5 : 0}
      height={42}>
      <Text padding="s">{reaction.type}</Text>
      {!!reaction.users.length && (
        <Text paddingEnd="m" variant="primaryBold12" color="black">
          {reaction.users.length}
        </Text>
      )}
    </Bubble>
  )
}
