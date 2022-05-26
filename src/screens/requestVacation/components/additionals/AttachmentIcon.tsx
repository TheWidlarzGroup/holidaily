import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box, useTheme } from 'utils/theme'
import PaperclipIcon from 'assets/icons/paperclip.svg'
import AddMessageIcon from 'assets/icons/addMessage.svg'
import { SvgProps } from 'react-native-svg'

type AttachmentIconProps = {
  onPress: F0
  variant: 'msg' | 'file'
}

export const AttachmentIcon = (p: AttachmentIconProps) => {
  const theme = useTheme()
  const iconProps: SvgProps = { color: theme.colors.alwaysWhite, width: 24, height: 24 }
  return (
    <Box backgroundColor="special" padding="s" margin="s" marginLeft="none" borderRadius="l">
      <TouchableOpacity onPress={p.onPress}>
        {p.variant === 'file' && <PaperclipIcon {...iconProps} />}
        {p.variant === 'msg' && <AddMessageIcon {...iconProps} />}
      </TouchableOpacity>
    </Box>
  )
}
