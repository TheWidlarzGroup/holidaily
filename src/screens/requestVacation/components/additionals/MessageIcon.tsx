import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box, useTheme } from 'utils/theme'
import AddCommentIcon from 'assets/icons/addComment.svg'

type MessageIconProps = {
  onPress: F0
}

export const MessageIcon = ({ onPress }: MessageIconProps) => {
  const theme = useTheme()
  return (
    <Box backgroundColor="lightGrey" padding="xm" margin="s" marginLeft="none" borderRadius="l">
      <TouchableOpacity onPress={onPress}>
        <AddCommentIcon color={theme.colors.black} width={22} height={22} />
      </TouchableOpacity>
    </Box>
  )
}
