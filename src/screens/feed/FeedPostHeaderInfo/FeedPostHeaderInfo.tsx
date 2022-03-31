import React from 'react'
import { displayDDMonYYYY } from 'utils/functions'

import { Box, Text } from 'utils/theme'
import { FeedPost } from 'mock-api/models/miragePostTypes'

type FeedPostHeaderInfoProps = Pick<FeedPost, 'meta'>

export const FeedPostHeaderInfo = ({ meta }: FeedPostHeaderInfoProps) => {
  const { timestamp, author } = meta

  const formattedDate = displayDDMonYYYY(timestamp.createdAt)

  return (
    <Box flexGrow={1} alignItems="stretch" padding="xs" paddingTop={0}>
      <Text variant="regularNeutralGrey10" textAlign="right" marginTop="-xs">
        {formattedDate}
      </Text>
      <Text variant="label1">{author.name}</Text>
      <Text variant="captionText">{author.occupation}</Text>
    </Box>
  )
}
