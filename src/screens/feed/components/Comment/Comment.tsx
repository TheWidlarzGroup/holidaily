import { Avatar } from 'components/Avatar'
import React from 'react'
import { Box, Text } from 'utils/theme'
import { Bubble } from '../Bubble/Bubble'
import { Comment as CommentType } from '../../types'

type CommentProps = {
  hideAvatar?: boolean
  comment: CommentType
}

export const Comment = ({ comment, hideAvatar }: CommentProps) => (
  <Box flexDirection="row" padding="xs" alignItems="flex-end">
    <Box marginRight="s" paddingRight={hideAvatar ? 'xl' : 0} paddingLeft={hideAvatar ? 'xs' : 0}>
      {!hideAvatar && <Avatar size="s" src={comment.meta.author.pictureUrl} />}
    </Box>
    <Bubble padding="s">
      <Text>{comment.text}</Text>
    </Bubble>
  </Box>
)
