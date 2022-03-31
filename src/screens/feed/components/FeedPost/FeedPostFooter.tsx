import React from 'react'
import { FeedPost } from 'screens/feed/types'
import { Box } from 'utils/theme'
import { CommentBox } from '../CommentBox/CommentBox'
import { FooterBar } from '../FooterBar/FooterBar'

type FeedPostFooterProps = Pick<FeedPost, 'meta' | 'comments' | 'reactions'>

export const FeedPostFooter = (props: FeedPostFooterProps) => (
  <Box>
    <FooterBar {...props} />
    <CommentBox comments={props.comments} />
  </Box>
)
