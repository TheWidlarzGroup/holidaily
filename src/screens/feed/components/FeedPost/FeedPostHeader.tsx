import React from 'react'
import { FeedPost } from 'screens/feed/types'
import { Box } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { FeedPostHeaderInfo } from 'screens/feed/FeedPostHeaderInfo/FeedPostHeaderInfo'
import { LocationInfo } from 'components/LocationInfo'

type FeedPostHeaderProps = Pick<FeedPost, 'meta'>

export const FeedPostHeader = ({ meta }: FeedPostHeaderProps) => (
  <Box paddingHorizontal="xm" paddingTop="m" alignItems="flex-start">
    <Box flexDirection="row" paddingBottom="s">
      <Avatar src={meta.author.pictureUrl} marginRight="s" />
      <FeedPostHeaderInfo meta={meta} />
    </Box>
    <LocationInfo location={meta.location} />
  </Box>
)
