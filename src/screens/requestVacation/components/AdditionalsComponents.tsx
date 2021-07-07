import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box } from 'utils/theme'
import { Photo } from './Photo'
import PaperclipIcon from 'assets/icons/paperclip.svg'
import AddCommentIcon from 'assets/icons/addComment.svg'

type AdditionalsAttachmentIconProps = {
  showAttachmentModal: F0
}

type AdditionalsMessageIconProps = {
  onPress: F0
}

type AdditionalsAttachmentProps = {
  photos: string[]
}

export const AdditionalsAttachmentIcon = ({
  showAttachmentModal,
}: AdditionalsAttachmentIconProps) => (
  <Box backgroundColor="lightGrey" padding="xm" margin="s" marginLeft={0} borderRadius="l">
    <TouchableOpacity onPress={showAttachmentModal}>
      <PaperclipIcon width={22} height={22} />
    </TouchableOpacity>
  </Box>
)

export const AdditionalsMessageIcon = ({ onPress }: AdditionalsMessageIconProps) => (
  <Box backgroundColor="lightGrey" padding="xm" margin="s" marginLeft={0} borderRadius="l">
    <TouchableOpacity onPress={onPress}>
      <AddCommentIcon width={22} height={22} />
    </TouchableOpacity>
  </Box>
)

export const AdditionalsAttachment = ({ photos }: AdditionalsAttachmentProps) => (
  <Box flexDirection="row" flexWrap="wrap">
    {photos.map((uri) => (
      <Box marginRight="s" marginTop="s">
        <Photo src={uri} size={90} marginBottom="m" />
      </Box>
    ))}
  </Box>
)
