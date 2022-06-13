import React from 'react'
import { FeedPost } from 'mock-api/models/miragePostTypes'
import { Box } from 'utils/theme'
import { isIos } from 'utils/layout'
import { useBooleanState } from 'hooks/useBooleanState'
import { isScreenHeightShort } from 'utils/deviceSizes'
import { CommentBox } from '../CommentBox/CommentBox'
import { FooterBar } from '../FooterBar/FooterBar'

type Post = {
  post: FeedPost
  showBorder: boolean
}

export const FeedPostFooter = (props: Post) => {
  const [areCommentsExpanded, { toggle: toggleCommentsExpanded, setTrue: expandComments }] =
    useBooleanState(false)
  const { post, showBorder } = props
  const isBorderShown = showBorder ? 2 : 0

  return (
    <Box
      marginTop={isIos && !isScreenHeightShort ? '-l2plus' : 'none'}
      borderWidth={isBorderShown}
      paddingHorizontal={showBorder ? 'none' : 'xxs'}
      paddingBottom={showBorder ? 'none' : 'xxs'}
      borderColor="special"
      borderTopWidth={0}>
      <FooterBar post={post} expandComments={expandComments} />
      <CommentBox
        comments={post.comments}
        areCommentsExpanded={areCommentsExpanded}
        toggleCommentsExpanded={toggleCommentsExpanded}
      />
    </Box>
  )
}
