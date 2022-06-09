import React from 'react'
import { FeedPost } from 'mock-api/models/miragePostTypes'
import { Box } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { FeedPostHeaderInfo } from 'screens/feed/FeedPostHeaderInfo/FeedPostHeaderInfo'
import { LocationInfo } from 'components/LocationInfo'

type FeedPostHeaderProps = {
  post: Pick<FeedPost, 'meta'>
  showBorder: boolean
}

export const FeedPostHeader = (props: FeedPostHeaderProps) => {
  const { post, showBorder } = props
  const isBorderShown = showBorder ? 2 : 0

  return (
    <Box
      paddingHorizontal="m"
      paddingTop="m"
      alignItems="flex-start"
      borderTopLeftRadius="lmin"
      borderTopRightRadius="lmin"
      borderWidth={isBorderShown}
      borderColor="special"
      borderBottomWidth={0}>
      <Box flexDirection="row" paddingBottom="xm">
        <Avatar
          size="m"
          src={post.meta?.author.pictureUrl}
          marginRight="s"
          userDetails={
            post.meta.author.userColor
              ? {
                  userColor: post.meta.author.userColor,
                  firstName: post.meta.author.name,
                  lastName: post.meta.author.lastName,
                }
              : undefined
          }
        />
        <FeedPostHeaderInfo meta={post.meta} />
      </Box>
      <LocationInfo location={post.meta?.location} />
    </Box>
  )
}
