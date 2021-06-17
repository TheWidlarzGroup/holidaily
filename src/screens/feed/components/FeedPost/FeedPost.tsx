import React from 'react'
import { FeedPost as FeedPostType } from 'screens/feed/types'
import { Box } from 'utils/theme'
import { FeedPostBody } from './FeedPostBody'
import { FeedPostHeader } from './FeedPostHeader'

type FeedPostProps = {
  post: FeedPostType
}

export const FeedPost = ({ post }: FeedPostProps) => (
  <Box>
    <FeedPostHeader {...post} />
    <FeedPostBody {...post} />
  </Box>
)
