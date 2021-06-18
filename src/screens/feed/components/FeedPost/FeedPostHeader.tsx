import { DateTime } from 'luxon'
import React from 'react'
import { FeedPost } from 'screens/feed/types'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'

// TODO: Localization

type FeedPostHeaderProps = Pick<FeedPost, 'meta'>

export const FeedPostHeader = ({ meta }: FeedPostHeaderProps) => (
  <BaseOpacity>
    <Box justifyContent="flex-start" flexDirection="row">
      <Box padding="s">
        <Avatar src={meta.author.pictureUrl} />
      </Box>
      <Box padding="s" flex={1} paddingRight="m">
        <HeaderInfo meta={meta} />
      </Box>
    </Box>
  </BaseOpacity>
)

type HeaderInfoProps = Pick<FeedPostHeaderProps, 'meta'>

const HeaderInfo = ({ meta }: HeaderInfoProps) => {
  const { timestamp, author } = meta
  const formattedDate = displayDDMonYYYY(DateTime.fromJSDate(timestamp.createdAt), '')

  return (
    <>
      <Box flex={0.3}>
        <Text variant="labelGrey" textAlign="right">
          {formattedDate}
        </Text>
      </Box>
      <Box>
        <Text variant="boldBlack18">{author.lastName}</Text>
      </Box>
      <Box>
        <Text variant="lightGreyBold">{author.firstName}</Text>
      </Box>
    </>
  )
}

function displayDDMonYYYY(date: DateTime, lang: string) {
  return date.setLocale(lang).toFormat('dd LLL yyyy')
}
