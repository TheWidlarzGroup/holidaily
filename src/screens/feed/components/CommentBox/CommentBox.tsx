import React from 'react'
import { useBooleanState } from 'hooks/useBooleanState'
import { Box } from 'utils/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { Comment as CommentType, FeedPost } from 'mock-api/models/miragePostTypes'
import { Comment } from '../Comment/Comment'
import { CommentBoxBtn } from './CommentBoxBtn'

type CommentBoxProps = Pick<FeedPost, 'comments'>

export const CommentBox = ({ comments }: CommentBoxProps) => {
  const [opened, { toggle }] = useBooleanState(false)

  if (comments?.length === 0) return null

  return (
    <Box padding="s">
      <CommentBoxBtn quantity={comments?.length} onPress={toggle} opened={opened} />
      {opened && (
        <ScrollView>
          {comments.map((comment, index) => (
            <Comment
              comment={comment}
              key={comment.meta.id}
              hideAvatar={commentFromPreviousUser(comments, index)}
            />
          ))}
        </ScrollView>
      )}
    </Box>
  )
}

const commentFromPreviousUser = (comments: CommentType[], index: number) =>
  comments[index].meta.author.id === comments?.[index - 1]?.meta.author?.id
