import React, { useEffect, useState } from 'react'
import { Box } from 'utils/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { Comment as CommentType, EditTargetType, FeedPost } from 'mock-api/models/miragePostTypes'
import { Analytics } from 'services/analytics'
import { Comment } from '../Comment/Comment'
import { CommentBoxBtn } from './CommentBoxBtn'

type CommentBoxProps = {
  areCommentsExpanded: boolean
  toggleCommentsExpanded: F0
  openEditModal: F1<EditTargetType>
  post: FeedPost
  isEditingComment: boolean
}

export const CommentBox = ({
  areCommentsExpanded,
  toggleCommentsExpanded,
  openEditModal,
  post,
  isEditingComment,
}: CommentBoxProps) => {
  const [editCommentId, setEditCommentId] = useState('')
  const { comments, id } = post
  useEffect(() => {
    if (areCommentsExpanded && comments?.length > 0)
      Analytics().track('FEED_COMMENTS_EXPANDED', { postId: comments[0].id })
  }, [areCommentsExpanded, comments])

  if (comments?.length === 0) return null

  const commentsCopy = comments.slice().reverse()

  return (
    <Box padding="s" marginTop="-ml" paddingBottom="xm">
      <CommentBoxBtn
        quantity={comments?.length}
        onPress={toggleCommentsExpanded}
        opened={areCommentsExpanded}
      />
      <ScrollView>
        {commentsCopy.map((comment, index) => {
          if (!areCommentsExpanded && index > 0) return
          return (
            <Comment
              openEditModal={openEditModal}
              editCommentId={editCommentId}
              setEditCommentId={setEditCommentId}
              isEditingComment={isEditingComment}
              postId={id}
              comment={comment}
              hideAvatar={commentFromPreviousUser(comments, index)}
              id={comment.id}
              key={comment.id}
            />
          )
        })}
      </ScrollView>
    </Box>
  )
}

const commentFromPreviousUser = (comments: CommentType[], index: number) =>
  comments[index].meta.author.id === comments?.[index - 1]?.meta.author?.id
