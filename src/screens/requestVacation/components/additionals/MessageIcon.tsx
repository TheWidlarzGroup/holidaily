import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box, Text } from 'utils/theme'
import AddCommentIcon from 'assets/icons/addComment.svg'

type MessageIconProps = {
  onPress: F0
}

export const MessageIcon = ({ onPress }: MessageIconProps) => (
  <Box backgroundColor="lightGrey" padding="xm" margin="s" marginLeft={0} borderRadius="l">
    <TouchableOpacity onPress={onPress}>
      <AddCommentIcon width={22} height={22} />
    </TouchableOpacity>
  </Box>
)
