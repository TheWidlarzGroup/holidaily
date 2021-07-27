import React from 'react'
import { displayDDMonYYYY } from 'utils/functions'

import { Box, Text } from 'utils/theme'
import { FeedPost } from '../types'

type FeedPostHeaderInfoProps = Pick<FeedPost, 'meta'>

export const FeedPostHeaderInfo = ({ meta }: FeedPostHeaderInfoProps) => {
  const { timestamp, author } = meta

  const formattedDate = displayDDMonYYYY(timestamp.createdAt)

  return (
    <Box flexGrow={1} alignItems="stretch" padding="xs">
      <Text variant="labelGrey" textAlign="right">
        {formattedDate}
      </Text>
      <Text variant="boldBlack18">{author.lastName}</Text>
      <Text variant="lightGreyBold">{author.firstName}</Text>
    </Box>
  )
}
