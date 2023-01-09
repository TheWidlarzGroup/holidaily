import React from 'react'
import { EditPost, EditTargetType, FeedPost } from 'mock-api/models/miragePostTypes'
import { BaseOpacity, Box, Colors, useTheme } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { LocationInfo } from 'components/LocationInfo'
import IconDots from 'assets/icons/icon-dots2.svg'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { FeedPostHeaderInfo } from '../FeedPostHeaderInfo/FeedPostHeaderInfo'

type FeedPostHeaderProps = {
  post: FeedPost
  borderColor: Colors
  openEditModal: F1<EditTargetType>
}

export const FeedPostHeader = (props: FeedPostHeaderProps) => {
  const { post, borderColor } = props
  const theme = useTheme()
  const { user } = useUserContext()

  const handleDotsOnPress = () => {
    const post: EditPost = {
      type: 'post',
      postId: props.post.id,
      authorId: user?.id || '',
    }
    props.openEditModal(post)
  }

  return (
    <Box
      paddingHorizontal="m"
      paddingTop="s"
      alignItems="flex-start"
      borderTopLeftRadius="lmin"
      borderTopRightRadius="lmin"
      borderWidth={2}
      borderColor={borderColor}
      borderBottomWidth={0}>
      <Box flexDirection="row" paddingBottom="xm">
        <Avatar
          size="m"
          src={post.author?.pictureUrl}
          marginRight="s"
          userDetails={
            post.author?.userColor
              ? {
                  userColor: post.author?.userColor,
                  firstName: post.author.name,
                  lastName: post.author?.lastName,
                }
              : undefined
          }
        />
        <FeedPostHeaderInfo post={post} />
      </Box>
      <LocationInfo location={post?.location} />
      {post.author?.id === user?.id && (
        <BaseOpacity
          onPress={handleDotsOnPress}
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
