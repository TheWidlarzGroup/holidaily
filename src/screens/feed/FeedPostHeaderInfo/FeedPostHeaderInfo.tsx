import React from 'react'
import { DateTime } from 'luxon'
import { displayDDMonYYYY } from 'utils/functions'
import { useTranslation } from 'react-i18next'

import { Box, Text } from 'utils/theme'
import { FeedPost } from '../types'

type FeedPostHeaderInfoProps = Pick<FeedPost, 'meta'>

export const FeedPostHeaderInfo = ({ meta }: FeedPostHeaderInfoProps) => {
  const { timestamp, author } = meta

  const { i18n } = useTranslation('feed')
  const formattedDate = displayDDMonYYYY(DateTime.fromJSDate(timestamp.createdAt), i18n.language)

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
