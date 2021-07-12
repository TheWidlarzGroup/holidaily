import React from 'react'
import { useBooleanState } from 'hooks/useBooleanState'
import { Box } from 'utils/theme'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Comment as CommentType, FeedPost } from '../../types'
import { Comment } from '../Comment/Comment'
import { CommentBoxBtn } from './CommentBoxBtn'

type CommentBoxProps = Pick<FeedPost, 'comments'>

export const CommentBox = ({ comments }: CommentBoxProps) => {
  const [opened, { toggle }] = useBooleanState(false)
  const commentBoxFlexGrow = useSharedValue(0)
  commentBoxFlexGrow.value = opened ? 1 : 0

  const commentBoxStyles = useAnimatedStyle(() => ({
    flexGrow: withSpring(commentBoxFlexGrow.value),
  }))

  if (comments.length === 0) return null

  return (
    <Box padding="s">
      <CommentBoxBtn quantity={comments.length} onPress={toggle} opened={opened} />
      {opened && (
        <Animated.ScrollView style={commentBoxStyles}>
          {comments.map((comment, index) => (
            <Comment
              comment={comment}
              key={comment.meta.id}
              hideAvatar={commentFromPreviousUser(comments, index)}
            />
          ))}
        </Animated.ScrollView>
      )}
    </Box>
  )
}

const commentFromPreviousUser = (comments: CommentType[], index: number) =>
  comments[index].meta.author.id === comments?.[index - 1]?.meta.author?.id
