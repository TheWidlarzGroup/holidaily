import React, { useState } from 'react'
import { Comment, FeedPost } from 'mock-api/models/miragePostTypes'
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types'
import { useBooleanState } from 'hooks/useBooleanState'
import { MessageInputModal } from 'components/MessageInputModal'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useAddComment, useAddReaction } from 'dataAccess/mutations/useAddReactionsComment'
import { Analytics } from 'services/analytics'
import { FooterBarContent } from './FooterBarContent'

type Post = {
  post: FeedPost
}

export const FooterBar = ({ post }: Post) => {
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
        postId={post.id}
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
