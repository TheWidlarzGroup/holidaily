import React from 'react'
import { EditTargetType, FeedPost } from 'mock-api/models/miragePostTypes'
import { Box } from 'utils/theme'
import { isIos } from 'utils/layout'
import { useBooleanState } from 'hooks/useBooleanState'
import { isScreenHeightShort } from 'utils/deviceSizes'
import { CommentBox } from '../CommentBox/CommentBox'
import { FooterBar } from '../FooterBar/FooterBar'

type Post = {
  post: FeedPost
  openEditModal: F1<EditTargetType>
  isModalOpen: boolean
}

export const FeedPostFooter = (p: Post) => {
  const [areCommentsExpanded, { toggle: toggleCommentsExpanded, setTrue: expandComments }] =
    useBooleanState(false)

  return (
    <Box marginTop={isIos && !isScreenHeightShort ? '-l2plus' : 'none'}>
      <FooterBar post={p.post} expandComments={expandComments} />
      <CommentBox
        comments={p.post.comments}
        areCommentsExpanded={areCommentsExpanded}
        toggleCommentsExpanded={toggleCommentsExpanded}
        {...p}
      />
    </Box>
  )
}
