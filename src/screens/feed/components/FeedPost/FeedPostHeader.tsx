import React from 'react'
import { FeedPost } from 'screens/feed/types'
import { Box } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { FeedPostHeaderInfo } from 'screens/feed/FeedPostHeaderInfo/FeedPostHeaderInfo'

type FeedPostHeaderProps = Pick<FeedPost, 'meta'>

export const FeedPostHeader = ({ meta }: FeedPostHeaderProps) => (
  <Box flexDirection="row" padding="s">
    <Avatar src={meta.author.pictureUrl} marginRight="s" />
    <FeedPostHeaderInfo meta={meta} />
  </Box>
)
