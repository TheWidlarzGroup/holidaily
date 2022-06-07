import React, { useEffect } from 'react'
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
}

export const CommentBox = ({
  comments,
  areCommentsExpanded,
  toggleCommentsExpanded,
  openEditModal,
}: CommentBoxProps) => {
  useEffect(() => {
    if (areCommentsExpanded && comments?.length > 0)
      Analytics().track('FEED_COMMENTS_EXPANDED', { postId: comments[0].meta.id })
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
              key={comment.meta.id}
              hideAvatar={commentFromPreviousUser(comments, index)}
              openEditModal={openEditModal}
            />
          ))
        ) : (
          <Comment comment={comments[comments.length - 1]} openEditModal={openEditModal} />
        )}
      </ScrollView>
    </Box>
  )
}

const commentFromPreviousUser = (comments: CommentType[], index: number) =>
  comments[index].meta.author.id === comments?.[index - 1]?.meta.author?.id
