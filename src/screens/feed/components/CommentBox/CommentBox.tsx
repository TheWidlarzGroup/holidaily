import React, { useEffect, useState } from 'react'
import { Box } from 'utils/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { Comment as CommentType, EditTargetType, FeedPost } from 'mock-api/models/miragePostTypes'
import { Analytics } from 'services/analytics'
import { Comment } from '../Comment/Comment'
import { CommentBoxBtn } from './CommentBoxBtn'

type CommentBoxProps = Pick<FeedPost, 'comments'> & {
  areCommentsExpanded: boolean
  toggleCommentsExpanded: F0
  openEditModal: F1<EditTargetType>
  post: FeedPost
  isEditingComment: boolean
}

export const CommentBox = ({
  comments,
  areCommentsExpanded,
  toggleCommentsExpanded,
  openEditModal,
  post,
  isEditingComment,
}: CommentBoxProps) => {
  const [editCommentId, setEditCommentId] = useState('')

  useEffect(() => {
    if (areCommentsExpanded && comments?.length > 0)
      Analytics().track('FEED_COMMENTS_EXPANDED', { postId: comments[0].id })
  }, [areCommentsExpanded, comments])

  if (comments?.length === 0) return null

  return (
    <Box padding="s" marginTop="-ml" paddingBottom="xm">
      <CommentBoxBtn
        quantity={comments?.length}
        onPress={toggleCommentsExpanded}
        opened={areCommentsExpanded}
      />
      <ScrollView>
        {areCommentsExpanded ? (
          comments.map((comment, index) => (
            <Comment
              comment={comment}
              key={comment.id}
              id={comment.id}
              postId={post.id}
              hideAvatar={commentFromPreviousUser(comments, index)}
              openEditModal={openEditModal}
              editCommentId={editCommentId}
              setEditCommentId={setEditCommentId}
              isEditingComment={isEditingComment}
            />
          ))
        ) : (
          <Comment
            comment={comments[comments.length - 1]}
            openEditModal={openEditModal}
            postId={post.id}
            id={comments[comments.length - 1].id}
            editCommentId={editCommentId}
            setEditCommentId={setEditCommentId}
            isEditingComment={isEditingComment}
          />
        )}
      </ScrollView>
    </Box>
  )
}

const commentFromPreviousUser = (comments: CommentType[], index: number) =>
  comments[index].meta.author.id === comments?.[index - 1]?.meta.author?.id
