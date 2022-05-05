import { Avatar } from 'components/Avatar'
import React from 'react'
import { Box, Text } from 'utils/theme'
import { Comment as CommentType } from 'mock-api/models/miragePostTypes'
import { Bubble } from '../Bubble/Bubble'

type CommentProps = {
  hideAvatar?: boolean
  comment: CommentType
}

export const Comment = ({ comment, hideAvatar }: CommentProps) => (
  <Box flexDirection="row" padding="xs" alignItems="flex-start">
    <Box marginRight="s" paddingRight={hideAvatar ? 'xl' : 0} paddingLeft={hideAvatar ? 'xs' : 0}>
      {!hideAvatar && (
        <Avatar
          size="s"
          src={comment.meta.author.pictureUrl}
          userDetails={
            comment.meta.author.userColor
              ? {
                  userColor: comment.meta.author.userColor,
                  firstName: comment.meta.author.name,
                  lastName: comment.meta.author.lastName,
                }
              : undefined
          }
        />
      )}
    </Box>
    <Bubble padding="xm" flexShrink={1} activeOpacity={1}>
      <Text variant="captionText">{comment.text}</Text>
    </Bubble>
  </Box>
)
