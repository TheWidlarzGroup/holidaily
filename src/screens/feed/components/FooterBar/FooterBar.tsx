import React, { useState } from 'react'
import IconComment from 'assets/icons/icon-comment.svg'
import IconReaction from 'assets/icons/icon-reaction.svg'
import { Reaction, Comment, FeedPost } from 'mock-api/models/miragePostTypes'
import { Box, Text, useTheme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types'
import EmojiPicker from 'rn-emoji-keyboard'
import { useBooleanState } from 'hooks/useBooleanState'
import { MessageInputModal } from 'components/MessageInputModal'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useAddComment, useAddReaction } from 'dataAccess/mutations/useAddReactionsComment'
import { Analytics } from 'services/analytics'
import { Bubble, BubbleProps } from '../Bubble/Bubble'
import { ReactionBubble } from '../Bubble/ReactionBubble'
import { MoreBubble } from '../Bubble/MoreBubble'
import { LessBubble } from '../Bubble/LessBubble'

type Post = {
  post: FeedPost
  expandComments: F0
}

export const FooterBar = ({ post, expandComments }: Post) => {
  const { reactions, id } = post
  const [messageInputOpened, { setTrue: showMessageInput, setFalse: hideMessageInput }] =
    useBooleanState(false)
  const { user } = useUserContext()
  const { mutate: addComment } = useAddComment()
  const { mutate: addReaction } = useAddReaction()
  const [messageContent, setMessageContent] = useState('')

  if (!user?.id) return null

  const handleSubmitComment = (comment: Comment) => {
    if (comment.text?.length < 1) return
    const payload = { postId: id || '', comment }
    addComment(payload)
    Analytics().track('FEED_COMMENT_CREATED', { postId: id, content: comment.text })
    setMessageContent('')
    expandComments()
  }

  const handlePressReaction = (emoji: string) => {
    const reactionIndex = reactions.findIndex((reaction) => reaction.type === emoji)
    let usersAddedReaction = reactions[reactionIndex].users
    const index = usersAddedReaction.indexOf(user.id)

    if (index === -1) {
      addReaction({
        postId: id || '',
        reaction: { type: emoji, users: [...usersAddedReaction, user.id] },
      })
    } else {
      usersAddedReaction = usersAddedReaction.filter((usr) => usr !== user.id)
      addReaction({
        postId: id || '',
        reaction: { type: emoji, users: [...usersAddedReaction] },
      })
    }
    Analytics().track('FEED_ADD_EMOJI', { emoji, postId: id })
  }

  const handleAddReaction = (emoji: EmojiType) => {
    const newReaction = { type: emoji.emoji, users: [user.id] }
    const isEmojiPresent = reactions.some((reaction) => reaction.type === emoji.emoji)
    Analytics().track('FEED_ADD_EMOJI', { emoji: emoji.emoji, postId: id })
    if (isEmojiPresent) handlePressReaction(emoji.emoji)
    else addReaction({ postId: id || '', reaction: newReaction })
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
        messageContent={messageContent}
        setMessageContent={setMessageContent}
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
  const [isShowMoreOpen, { setTrue: showMore, setFalse: showLess }] = useBooleanState(false)
  const { t } = useTranslation('feed')
  const theme = useTheme()
  const [footerWidth, setFooterWidth] = useState(0)

  const COMMENT_EMOJI_BTNS_WIDTH = 146
  const EMOJI_BTN_WIDTH = 74

  const maxEmojisInFirstLine = Math.trunc(
    (footerWidth - COMMENT_EMOJI_BTNS_WIDTH) / EMOJI_BTN_WIDTH
  )
  const maxEmojisInSecondLine = Math.trunc(footerWidth / EMOJI_BTN_WIDTH)
  const totalMaxNumberOfEmojis = maxEmojisInFirstLine + maxEmojisInSecondLine

  let emojisCounter = 0

  return (
    <Box
      flexDirection="row"
      padding="s"
      paddingTop="xm"
      justifyContent="space-between"
      alignItems="center"
      onLayout={({ nativeEvent }) => {
        setFooterWidth(nativeEvent.layout.width - 16) // subtract margins
      }}>
      <Box
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
        flexGrow={1}
        flexShrink={1}>
        <Bubble
          padding="s"
          marginHorizontal="xs"
          marginTop="xs"
          onPress={onCommentBtnPress}
          height={42}
          alignSelf="flex-start">
          <IconComment color={theme.colors.black} />
          <Text variant="captionText" fontWeight="700" paddingHorizontal="s" paddingVertical="xs">
            {t('postCommentBtn')}
          </Text>
        </Bubble>
        <EmojiPicker
          onEmojiSelected={props.handleAddReaction}
          open={isPickerOpen}
          onClose={closePicker}
        />
        <ReactionPickerBtn onPress={openPicker} />
        {reactions &&
          reactions.map((item, index) => {
            emojisCounter = index
            if (!isShowMoreOpen && emojisCounter >= totalMaxNumberOfEmojis - 1) return
            return (
              <ReactionBubble
                key={item.type}
                handlePressReaction={props.handlePressReaction}
                reaction={item}
              />
            )
          })}
        {!isShowMoreOpen && emojisCounter >= totalMaxNumberOfEmojis - 1 && (
          <MoreBubble count={emojisCounter - totalMaxNumberOfEmojis + 2} onPress={showMore} />
        )}
        {isShowMoreOpen && <LessBubble onPress={showLess} />}
      </Box>
    </Box>
  )
}

export const ReactionPickerBtn = (props: BubbleProps) => {
  const theme = useTheme()
  return (
    <Bubble {...props} width={42} height={42} margin="xs">
      <IconReaction color={theme.colors.black} />
    </Bubble>
  )
}
