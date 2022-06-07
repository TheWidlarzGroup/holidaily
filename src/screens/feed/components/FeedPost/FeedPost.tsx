import React from 'react'
import { EditTargetType, FeedPost as FeedPostType } from 'mock-api/models/miragePostTypes'
import { BaseOpacity } from 'utils/theme'
import { GestureResponderEvent } from 'react-native'
import { FeedPostBody } from './FeedPostBody'
import { FeedPostFooter } from './FeedPostFooter'
import { FeedPostHeader } from './FeedPostHeader'

type FeedPostProps = {
  post: FeedPostType
  openContextMenu: F2<GestureResponderEvent, EditTargetType>
}

export const FeedPost = ({ post, openContextMenu }: FeedPostProps) => (
  <BaseOpacity
    activeOpacity={1}
    bg="white"
    borderTopLeftRadius="lmin"
    borderTopRightRadius="lmin"
    marginTop="s"
    paddingTop="s">
    <FeedPostHeader {...post} />
    <FeedPostBody {...post} />
    <FeedPostFooter post={post} openContextMenu={openContextMenu} />
  </BaseOpacity>
)
