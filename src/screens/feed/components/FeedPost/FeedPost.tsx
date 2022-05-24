import React from 'react'
import { FeedPost as FeedPostType } from 'mock-api/models/miragePostTypes'
import { BaseOpacity } from 'utils/theme'
import { FeedPostBody } from './FeedPostBody'
import { FeedPostFooter } from './FeedPostFooter'
import { FeedPostHeader } from './FeedPostHeader'

type FeedPostProps = {
  post: FeedPostType
}

export const FeedPost = ({ post }: FeedPostProps) => (
  <BaseOpacity
    activeOpacity={1}
    bg="white"
    borderTopLeftRadius="lmin"
    borderTopRightRadius="lmin"
    marginTop="s"
    paddingTop="s">
    <FeedPostHeader {...post} />
    <FeedPostBody {...post} />
    <FeedPostFooter post={post} />
  </BaseOpacity>
)
