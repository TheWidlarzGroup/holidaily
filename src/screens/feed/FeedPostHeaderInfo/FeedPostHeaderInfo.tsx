import React from 'react'
import { displayDDMonYYYY } from 'utils/functions'

import { Box, Text } from 'utils/theme'
import { FeedPost } from 'mock-api/models/miragePostTypes'

type FeedPostHeaderInfoProps = Pick<FeedPost, 'meta'>

export const FeedPostHeaderInfo = ({ meta }: FeedPostHeaderInfoProps) => {
  const formattedDate = displayDDMonYYYY(meta?.timestamp?.createdAt)

  return (
    <Box flexGrow={1} alignItems="stretch" padding="xs" paddingTop={0}>
      <Text variant="regularNeutralGrey10" textAlign="right" marginTop="-xs">
        {formattedDate}
      </Text>
      <Text variant="label1">{meta?.author?.name}</Text>
      <Text variant="captionText">{meta?.author?.occupation}</Text>
    </Box>
  )
}
