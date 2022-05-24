import React from 'react'
import { displayDDMonYYYY } from 'utils/functions'

import { Box, Text } from 'utils/theme'
import { FeedPost } from 'mock-api/models/miragePostTypes'

type FeedPostHeaderInfoProps = Pick<FeedPost, 'meta'>

export const FeedPostHeaderInfo = ({ meta }: FeedPostHeaderInfoProps) => {
  const formattedDate = displayDDMonYYYY(meta?.timestamp?.createdAt)

  return (
    <Box flexGrow={1} paddingHorizontal="xs" flex={1} justifyContent="space-evenly">
      <Text variant="textBoldSM" color="blackBrighterDouble">
        {meta?.author?.name}
      </Text>
      <Text variant="textXS" color="darkGrey">
        {meta?.author?.occupation}
      </Text>
      <Box position="absolute" right={0}>
        <Text variant="textXS" color="darkGrey">
          {formattedDate}
        </Text>
      </Box>
    </Box>
  )
}
