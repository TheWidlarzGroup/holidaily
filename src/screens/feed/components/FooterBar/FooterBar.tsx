import React from 'react'

import IconComment from 'assets/icons/icon-comment.svg'
import IconReaction from 'assets/icons/icon-reaction.svg'

import { Reaction, Comment, FeedPost } from 'mock-api/models/miragePostTypes'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types'
import EmojiPicker from 'rn-emoji-keyboard'
import { useBooleanState } from 'hooks/useBooleanState'
import { MessageInputModal } from 'components/MessageInputModal'
import { useUserContext } from 'hooks/useUserContext'
import { useAddComment } from 'dataAccess/mutations/useAddLikeComment'
import { Bubble, BubbleProps } from '../Bubble/Bubble'
import { ReactionBubble } from '../Bubble/ReactionBubble'

type Post = {
  post: FeedPost
}

export const FooterBar = ({ post }: Post) => {
  const { reactions, id } = post
  const [messageInputOpened, { setTrue: showMessageInput, setFalse: hideMessageInput }] =
    useBooleanState(false)
  const { user } = useUserContext()
  const { mutate } = useAddComment()

  const handleSubmitComment = (comment: Comment) => {
    if (comment.text?.length < 1) return console.log('too short msg')
    const payload = { postId: id || '', comment }
    mutate(payload)
  }

  const handlePressReaction = (emoji: string) => {
    const reactionIndex = reactions.findIndex((reaction) => reaction.type === emoji)
    const usersAddedReaction = reactions[reactionIndex].users
    const index = usersAddedReaction.indexOf(user?.id || '')

    if (index === -1) {
      usersAddedReaction.push(user?.id || '')
    } else {
      usersAddedReaction.splice(index, 1)
    }
  }

  const handleAddReaction = (emoji: EmojiType) => {
    const newReaction = { type: emoji.emoji, users: [user?.id || ''] }
    const isEmojiPresent = reactions.some((reaction) => reaction.type === emoji.emoji)
    if (isEmojiPresent) handlePressReaction(emoji.emoji)
    else reactions.push(newReaction)
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
  handlePressReaction: F1<string>
  handleAddReaction: F1<EmojiType>
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
            if (item.users?.length === 0) return
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
