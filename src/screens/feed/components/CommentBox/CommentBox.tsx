import React from 'react'
import { Box } from 'utils/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { Comment as CommentType, EditTargetType, FeedPost } from 'mock-api/models/miragePostTypes'
import { GestureResponderEvent } from 'react-native'
import { Comment } from '../Comment/Comment'
import { CommentBoxBtn } from './CommentBoxBtn'

type CommentBoxProps = Pick<FeedPost, 'comments'> & {
  areCommentsExpanded: boolean
  toggleCommentsExpanded: F0
  openContextMenu: F2<GestureResponderEvent, EditTargetType>
}

export const CommentBox = ({
  comments,
  areCommentsExpanded,
  toggleCommentsExpanded,
  openContextMenu,
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
        {areCommentsExpanded ? (
          comments.map((comment, index) => (
            <Comment
              comment={comment}
              key={comment.meta.id}
              hideAvatar={commentFromPreviousUser(comments, index)}
              openContextMenu={openContextMenu}
            />
          ))
        ) : (
          <Comment comment={comments[comments.length - 1]} openContextMenu={openContextMenu} />
        )}
      </ScrollView>
    </Box>
  )
}

const commentFromPreviousUser = (comments: CommentType[], index: number) =>
  comments[index].meta.author.id === comments?.[index - 1]?.meta.author?.id
