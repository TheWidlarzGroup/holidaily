import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box, useTheme } from 'utils/theme'
import PaperclipIcon from 'assets/icons/paperclip.svg'

type AttachmentIconProps = {
  showAttachmentModal: F0
}

export const AttachmentIcon = ({ showAttachmentModal }: AttachmentIconProps) => {
  const theme = useTheme()
  return (
    <Box backgroundColor="lightGrey" padding="xm" margin="s" marginLeft="none" borderRadius="l">
      <TouchableOpacity onPress={showAttachmentModal}>
        <PaperclipIcon color={theme.colors.black} width={22} height={22} />
      </TouchableOpacity>
    </Box>
  )
}
