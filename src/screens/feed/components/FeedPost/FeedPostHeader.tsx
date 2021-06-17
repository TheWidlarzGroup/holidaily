import { DateTime } from 'luxon'
import React from 'react'
import { PostMetaData } from 'screens/feed/types'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'

type FeedPostHeaderProps = {
  meta: PostMetaData
}

export const FeedPostHeader = ({ meta }: FeedPostHeaderProps) => {
  const src =
    'https://images.unsplash.com/photo-1617731653770-a62c51cf8696?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'

  const handlePress = () => {
    // Switch to Post Screen
  }

  return (
    <BaseOpacity onPress={handlePress}>
      <Box justifyContent="flex-start" flexDirection="row">
        <Box padding="s">
          <Avatar src={src} />
        </Box>
        <Box padding="s" flex={1}>
          <HeaderInfo meta={meta} />
        </Box>
      </Box>
    </BaseOpacity>
  )
}

type HeaderInfoProps = Pick<FeedPostHeaderProps, 'meta'>

const HeaderInfo = ({ meta }: HeaderInfoProps) => {
  const { timestamp, author } = meta
  const formattedDate = displayDDMonYYYY(DateTime.fromJSDate(timestamp.createdAt), '')

  return (
    <>
      <Box>
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
