import React from 'react'
import { FeedPost } from 'mock-api/models/miragePostTypes'
import { BaseOpacity, Box, useTheme } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { FeedPostHeaderInfo } from 'screens/feed/FeedPostHeaderInfo/FeedPostHeaderInfo'
import { LocationInfo } from 'components/LocationInfo'
import IconDots from 'assets/icons/icon-dots2.svg'
import { useUserContext } from 'hooks/context-hooks/useUserContext'

type FeedPostHeaderProps = {
  post: Pick<FeedPost, 'meta'>
  showBorder: boolean
}

export const FeedPostHeader = (props: FeedPostHeaderProps) => {
  const { post, showBorder } = props
  const isBorderShown = showBorder ? 2 : 0
  const theme = useTheme()
  const { user } = useUserContext()

  return (
    <Box
      paddingHorizontal={showBorder ? 'ms' : 'm'}
      paddingTop={showBorder ? 'ms' : 'm'}
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
      {post.meta.author.id === user?.id && (
        <BaseOpacity
          position="absolute"
          right={20}
          top={45}
          hitSlop={{ top: 20, bottom: 20, left: 25, right: 20 }}>
          <IconDots color={theme.colors.black} />
        </BaseOpacity>
      )}
    </Box>
  )
}
