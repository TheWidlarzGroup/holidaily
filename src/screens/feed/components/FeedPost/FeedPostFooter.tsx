import React from 'react'
import { FeedPost } from 'screens/feed/types'
import { Box } from 'utils/theme'
import { CommentBox } from '../CommentBox/CommentBox'
import { FooterBar } from '../FooterBar/FooterBar'

// TODO: Comment Section

type FeedPostFooterProps = Pick<FeedPost, 'meta' | 'comments' | 'reactions'>

export const FeedPostFooter = ({ reactions, comments }: FeedPostFooterProps) => (
  <Box>
    <FooterBar reactions={reactions} />
    <CommentBox comments={comments} />
  </Box>
)
