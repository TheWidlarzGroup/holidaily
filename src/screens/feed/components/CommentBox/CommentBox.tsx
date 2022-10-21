import React, { useEffect, useState } from 'react'
import { Box } from 'utils/theme'
import { Comment as CommentType, EditTargetType, FeedPost } from 'mock-api/models/miragePostTypes'
import { Analytics } from 'services/analytics'
import {
  Easing,
  FadeInUp,
  FadeOutDown,
  Layout,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { AnimatedBox } from 'components/AnimatedBox'
import { Comment } from '../Comment/Comment'
import { CommentBoxBtn } from './CommentBoxBtn'

type CommentBoxProps = {
  areCommentsExpanded: boolean
  toggleCommentsExpanded: F0
  openEditModal: F1<EditTargetType>
  post: FeedPost
  isEditingTarget: boolean
}

const CommentBox = ({
  areCommentsExpanded,
  toggleCommentsExpanded,
  openEditModal,
  post,
  isEditingTarget,
}: CommentBoxProps) => {
  const [editCommentId, setEditCommentId] = useState('')
  const { comments, id } = post
  const height = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    const heightDuration = areCommentsExpanded ? 210 : 320
    height.value = withTiming(areCommentsExpanded ? 100 : 0, {
      duration: heightDuration,
      easing: Easing.exp,
    })

    opacity.value = withTiming(areCommentsExpanded ? 1 : 0, {
      duration: 350,
      easing: Easing.exp,
    })
  }, [height, areCommentsExpanded, opacity])

  useEffect(() => {
    if (areCommentsExpanded && comments?.length > 0)
      Analytics().track('FEED_COMMENTS_EXPANDED', { postId: comments[0].id })
  }, [areCommentsExpanded, comments])

  const commentsCopy = comments?.slice()?.reverse()

  if (comments?.length === 0) return null

  return (
    <Box padding="s" marginTop="-ml" paddingBottom="xm">
      <CommentBoxBtn
        quantity={comments?.length}
        onPress={toggleCommentsExpanded}
        opened={areCommentsExpanded}
      />
      <Box>
        <Comment
          openEditModal={openEditModal}
          editCommentId={editCommentId}
          setEditCommentId={setEditCommentId}
          isEditingTarget={isEditingTarget}
          postId={id}
          comment={commentsCopy?.[0]}
          hideAvatar={commentFromPreviousUser(commentsCopy, 0)}
          id={commentsCopy?.[0].id}
        />
        {areCommentsExpanded ? (
          <AnimatedBox
            layout={Layout.duration(350)}
            entering={FadeInUp}
            exiting={FadeOutDown.duration(300)}>
            {commentsCopy?.map((comment, index) => {
              if (index === 0) return
              return (
                <Comment
                  openEditModal={openEditModal}
                  editCommentId={editCommentId}
                  setEditCommentId={setEditCommentId}
                  hideAvatar={commentFromPreviousUser(commentsCopy, index)}
                  isEditingTarget={isEditingTarget}
                  postId={id}
                  comment={comment}
                  id={comment?.id}
                  key={index}
                />
              )
            })}
          </AnimatedBox>
        ) : null}
      </Box>
    </Box>
  )
}

const arePropsEqual = (prevProps: CommentBoxProps, nextProps: CommentBoxProps) => {
  const { post, isEditingTarget, areCommentsExpanded } = prevProps
  const {
    post: newPost,
    isEditingTarget: newIsEditingTarget,
    areCommentsExpanded: newAreCommentsExpanded,
  } = nextProps
  return (
    JSON.stringify(post.comments) === JSON.stringify(newPost.comments) &&
    isEditingTarget === newIsEditingTarget &&
    areCommentsExpanded === newAreCommentsExpanded
  )
}

export default React.memo(CommentBox, arePropsEqual)

const commentFromPreviousUser = (comments: CommentType[], index: number) =>
  comments?.[index]?.author?.id === comments?.[index - 1]?.author?.id
