import React from 'react'
import { Box } from 'utils/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { Comment as CommentType, FeedPost } from 'mock-api/models/miragePostTypes'
import { Comment } from '../Comment/Comment'
import { CommentBoxBtn } from './CommentBoxBtn'

type CommentBoxProps = Pick<FeedPost, 'comments'> & {
  areCommentsExpanded: boolean
  toggleCommentsExpanded: F0
}

export const CommentBox = ({
  comments,
  areCommentsExpanded,
  toggleCommentsExpanded,
}: CommentBoxProps) => {
  if (comments?.length === 0) return null

  return (
    <Box padding="s" marginTop="-ml" paddingBottom="xm">
      <CommentBoxBtn
        quantity={comments?.length}
        onPress={toggleCommentsExpanded}
        opened={areCommentsExpanded}
      />
      <ScrollView>
        {comments.map((comment, index) => {
          if (!areCommentsExpanded && index > 0) return
          return (
            <Comment
              comment={comment}
              key={comment.meta.id}
              hideAvatar={commentFromPreviousUser(comments, index)}
            />
          )
        })}
      </ScrollView>
    </Box>
  )
}

const commentFromPreviousUser = (comments: CommentType[], index: number) =>
  comments[index].meta.author.id === comments?.[index - 1]?.meta.author?.id
