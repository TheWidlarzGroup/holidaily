import React from 'react'
import { useBooleanState } from 'hooks/useBooleanState'
import { FlatList } from 'react-native'
import { Box } from 'utils/theme'
import { Comment as CommentType, FeedPost } from '../../types'
import { Comment } from '../Comment/Comment'
import { CommentBoxBtn } from './CommentBoxBtn'

type CommentBoxProps = Pick<FeedPost, 'comments'>

export const CommentBox = ({ comments }: CommentBoxProps) => {
  const [opened, { toggle }] = useBooleanState(false)

  return (
    <Box padding="s">
      {comments.length > 0 && (
        <>
          <CommentBoxBtn quantity={comments.length} onPress={toggle} opened={opened} />
          {opened && (
            <FlatList
              data={comments}
              renderItem={({ item, index }) => (
                <Comment comment={item} hideAvatar={commentFromPreviousUser(comments, index)} />
              )}
              keyExtractor={({ meta }) => meta.id}
            />
          )}
        </>
      )}
    </Box>
  )
}

const commentFromPreviousUser = (comments: CommentType[], index: number) =>
  comments[index].meta.author.id === comments?.[index - 1]?.meta.author?.id
