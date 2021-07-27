import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box, Text } from 'utils/theme'
import PaperclipIcon from 'assets/icons/paperclip.svg'

type AttachmentIconProps = {
  showAttachmentModal: F0
}

export const AttachmentIcon = ({ showAttachmentModal }: AttachmentIconProps) => (
  <Box backgroundColor="lightGrey" padding="xm" margin="s" marginLeft={0} borderRadius="l">
    <TouchableOpacity onPress={showAttachmentModal}>
      <PaperclipIcon width={22} height={22} />
    </TouchableOpacity>
  </Box>
)
