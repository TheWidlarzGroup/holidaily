import React from 'react'
import { FeedPost as FeedPostType } from 'screens/feed/types'
import { Box } from 'utils/theme'
import { FeedPostBody } from './FeedPostBody'
import { FeedPostFooter } from './FeedPostFooter'
import { FeedPostHeader } from './FeedPostHeader'

type FeedPostProps = {
  post: FeedPostType
}

export const FeedPost = ({ post }: FeedPostProps) => (
  <Box bg="white" borderTopLeftRadius="l" borderTopRightRadius="l" marginTop="s" paddingTop="s">
    <FeedPostHeader {...post} />
    <FeedPostBody {...post} />
    <FeedPostFooter {...post} />
  </Box>
)
