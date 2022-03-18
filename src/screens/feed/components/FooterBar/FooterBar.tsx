import React from 'react'

import IconComment from 'assets/icons/icon-comment.svg'
import IconReaction from 'assets/icons/icon-reaction.svg'

import { Reaction, Comment } from 'screens/feed/types'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types'
import EmojiPicker from 'rn-emoji-keyboard'
import { useBooleanState } from 'hooks/useBooleanState'
import { MessageInputModal } from 'components/MessageInputModal'
import { useUserContext } from 'hooks/useUserContext'
import { Bubble, BubbleProps } from '../Bubble/Bubble'
import { ReactionBubble } from '../Bubble/ReactionBubble'

type FooterBarProps = {
  reactions: Reaction[]
  comments: Comment[]
}

export const FooterBar = ({ reactions, comments }: FooterBarProps) => {
  const [messageInputOpened, { setTrue: showMessageInput, setFalse: hideMessageInput }] =
    useBooleanState(false)
  const { user } = useUserContext()

  const handleSubmitComment = (comment: Comment) => {
    comments.push(comment)
  }

  const handlePressReaction = (emoji: string) => {
    const getReactionIndex = reactions.findIndex((reaction) => reaction.type === emoji)
    const usersAddedReaction = reactions[getReactionIndex].users
    const checkIfUserAddedReaction = usersAddedReaction.includes(user?.id || '')
    if (checkIfUserAddedReaction) {
      const index = usersAddedReaction.indexOf(user?.id || '')
      if (index !== -1) {
        usersAddedReaction.splice(index, 1)
      }
    } else {
      usersAddedReaction.push(user?.id || '')
    }
  }

  const handleAddReaction = (emoji: EmojiType) => {
    const newReaction = { type: emoji.emoji, users: [user?.id || ''] }
    const isEmojiPresent = reactions.some((reaction) => reaction.type === emoji.emoji)
    if (isEmojiPresent) {
      handlePressReaction(emoji.emoji)
    } else {
      reactions.push(newReaction)
    }
  }

  return (
    <>
      <FooterBarContent
        onCommentBtnPress={showMessageInput}
        reactions={reactions}
        handlePressReaction={handlePressReaction}
        handleAddReaction={handleAddReaction}
      />
      <MessageInputModal
        visible={messageInputOpened}
        onSubmitEditing={hideMessageInput}
        onRequestClose={hideMessageInput}
        handleSubmitComment={handleSubmitComment}
        autofocus
      />
    </>
  )
}

type FooterBarContentProps = {
  reactions: Reaction[]
  onCommentBtnPress: F0
  handlePressReaction: (emoji: string) => void
  handleAddReaction: (emoji: EmojiType) => void
}

const FooterBarContent = (props: FooterBarContentProps) => {
  const { reactions, onCommentBtnPress } = props
  const [isPickerOpen, { setTrue: openPicker, setFalse: closePicker }] = useBooleanState(false)
  const { t } = useTranslation('feed')

  return (
    <Box flexDirection="row" padding="s" justifyContent="space-between" alignItems="center">
      <Box
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
        flexGrow={1}
        flexShrink={1}>
        <EmojiPicker
          onEmojiSelected={props.handleAddReaction}
          open={isPickerOpen}
          onClose={closePicker}
        />
        {reactions &&
          reactions.map((item) => {
            if (item.users.length === 0) return
            return (
              <ReactionBubble
                key={item.type}
                handlePressReaction={props.handlePressReaction}
                reaction={item}
              />
            )
          })}
        <ReactionPickerBtn onPress={openPicker} />
      </Box>
      <Bubble
        padding="s"
        marginTop="xs"
        onPress={onCommentBtnPress}
        height={42}
        alignSelf="flex-start">
        <IconComment />
        <Text variant="captionText" fontWeight="700" paddingHorizontal="s" paddingVertical="xs">
          {t('postCommentBtn')}
        </Text>
      </Bubble>
    </Box>
  )
}

export const ReactionPickerBtn = (props: BubbleProps) => (
  <Bubble {...props} width={42} height={42} margin="xs">
    <IconReaction />
  </Bubble>
)
