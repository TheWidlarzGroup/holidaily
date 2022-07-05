import React from 'react'
import { displayDDMonYYYY } from 'utils/functions'

import { Box, Text } from 'utils/theme'
import { FeedPost } from 'mock-api/models/miragePostTypes'

export const FeedPostHeaderInfo = ({ post }: { post: FeedPost }) => {
  const formattedDate = displayDDMonYYYY(new Date(post.createdAt))

  return (
    <Box flexGrow={1} paddingHorizontal="xs" flex={1} justifyContent="space-evenly">
      <Text variant="textBoldSM" color="blackBrighterDouble">
        {post?.author?.name}
      </Text>
      <Text variant="textXS" color="darkGrey">
        {post?.author?.occupation}
      </Text>
      <Box position="absolute" right={0}>
        <Text variant="textXS" color="darkGrey">
          {formattedDate}
        </Text>
      </Box>
    </Box>
  )
}
