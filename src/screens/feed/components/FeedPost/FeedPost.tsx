import React from 'react'
import { FeedPost as FeedPostType } from 'mock-api/models/miragePostTypes'
import { BaseOpacity } from 'utils/theme'
import { GestureResponderEvent } from 'react-native'
import { FeedPostBody } from './FeedPostBody'
import { FeedPostFooter } from './FeedPostFooter'
import { FeedPostHeader } from './FeedPostHeader'

type FeedPostProps = {
  post: FeedPostType
  handleEdit: F1<GestureResponderEvent>
}

export const FeedPost = ({ post, handleEdit }: FeedPostProps) => (
  <BaseOpacity
    activeOpacity={1}
    bg="white"
    borderTopLeftRadius="lmin"
    borderTopRightRadius="lmin"
    marginTop="s"
    paddingTop="s">
    <FeedPostHeader {...post} />
    <FeedPostBody {...post} />
    <FeedPostFooter post={post} handleEdit={handleEdit} />
  </BaseOpacity>
)
