import React from 'react'
import { FeedPost } from 'mock-api/models/miragePostTypes'
import { Box } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { FeedPostHeaderInfo } from 'screens/feed/FeedPostHeaderInfo/FeedPostHeaderInfo'
import { LocationInfo } from 'components/LocationInfo'

type FeedPostHeaderProps = Pick<FeedPost, 'meta'>

export const FeedPostHeader = ({ meta }: FeedPostHeaderProps) => (
  <Box paddingHorizontal="m" paddingTop="s" alignItems="flex-start">
    <Box flexDirection="row" paddingBottom="s">
      <Avatar
        size="m"
        src={meta?.author.pictureUrl}
        marginRight="s"
        userDetails={
          meta.author.userColor
            ? {
                userColor: meta.author.userColor,
                firstName: meta.author.name,
                lastName: meta.author.lastName,
              }
            : undefined
        }
      />
      <FeedPostHeaderInfo meta={meta} />
    </Box>
    <LocationInfo location={meta?.location} />
  </Box>
)
