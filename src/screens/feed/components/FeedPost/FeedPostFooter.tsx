import React from 'react'
import { FeedPost } from 'mock-api/models/miragePostTypes'
import { Box } from 'utils/theme'
import { isIos } from 'utils/layout'
import { CommentBox } from '../CommentBox/CommentBox'
import { FooterBar } from '../FooterBar/FooterBar'

type Post = { post: FeedPost }

export const FeedPostFooter = ({ post }: Post) => (
  <Box marginTop={isIos ? '-l2plus' : 'none'}>
    <FooterBar post={post} />
    <CommentBox comments={post.comments} />
  </Box>
)
