import React, { Dispatch, SetStateAction } from 'react'
import { Text, Theme, theme } from 'utils/theme'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { Reaction } from 'mock-api/models/miragePostTypes'
import { Bubble } from './Bubble'

type BubbleSizesType = {
  addCommentBtn: number
  addEmojiBtn: number
  singleEmoji: number
}

type ReactionBubbleProps = {
  reaction: Reaction
  handlePressReaction: F1<string>
  setBubblesSize: Dispatch<SetStateAction<BubbleSizesType>>
  bubbleMargin: keyof Theme['spacing']
  reactionBubbleSize: number
}

export const ReactionBubble = ({
  reaction,
  handlePressReaction,
  setBubblesSize,
  bubbleMargin,
  reactionBubbleSize,
}: ReactionBubbleProps) => {
  const { user } = useUserContext()

  const hasUserAddedReaction = reaction.users?.includes(user?.id || '')

  return (
    <Bubble
      margin={bubbleMargin}
      onPress={() => handlePressReaction(reaction.type)}
      onLayout={({ nativeEvent }) => {
        if (reactionBubbleSize) return
        setBubblesSize((prev) => ({
          ...prev,
          singleEmoji: nativeEvent.layout.width + theme.spacing[bubbleMargin] * 2, // calculate full width of emoji with margins
        }))
      }}
      borderColor={hasUserAddedReaction ? 'black' : 'transparent'}
      borderWidth={1.2}
      height={42}>
      <Text padding="s">{reaction.type}</Text>
      {reaction.users?.length > 0 && (
        <Text paddingEnd="m" variant="buttonXS">
          {reaction.users?.length}
        </Text>
      )}
    </Bubble>
  )
}
