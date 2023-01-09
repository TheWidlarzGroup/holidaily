import React from 'react'
import { EditTargetType, FeedPost } from 'mock-api/models/miragePostTypes'
import { Box, Colors } from 'utils/theme'
import { isIos } from 'utils/layout'
import { useBooleanState } from 'hooks/useBooleanState'
import { isScreenHeightShort } from 'utils/deviceSizes'
import CommentBox from '../CommentBox/CommentBox'
import FooterBar from '../FooterBar/FooterBar'

type Post = {
  post: FeedPost
  openEditModal: F1<EditTargetType>
  isEditingTarget: boolean
  borderColor: Colors
}

export const FeedPostFooter = (props: Post) => {
  const [areCommentsExpanded, { toggle: toggleCommentsExpanded }] = useBooleanState(false)
  const { post, borderColor } = props

  return (
    <Box
      marginTop={isIos && !isScreenHeightShort ? '-l2plus' : 'none'}
      borderWidth={2}
      borderColor={borderColor}
      borderTopWidth={0}>
      <FooterBar post={post} />
      <CommentBox
        areCommentsExpanded={areCommentsExpanded}
        toggleCommentsExpanded={toggleCommentsExpanded}
        {...props}
      />
    </Box>
  )
}
