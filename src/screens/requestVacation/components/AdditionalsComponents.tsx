import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box, Text } from 'utils/theme'
import { Photo } from './Photo'
import PaperclipIcon from 'assets/icons/paperclip.svg'
import PaperclipOrangeIcon from 'assets/icons/paperclipOrange.svg'
import AddCommentIcon from 'assets/icons/addComment.svg'

type AdditionalsAttachmentIconProps = {
  showAttachmentModal: F0
}

type AdditionalsMessageIconProps = {
  onPress: F0
}

type AdditionalsAttachmentProps = {
  photos: string[]
  addMore: F0
  displayAddMore: boolean
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

export const AdditionalsAttachment = ({
  photos,
  addMore,
  displayAddMore,
}: AdditionalsAttachmentProps) => {
  const getPadding = (index: number, side: 'right' | 'left') => {
    const n = index % 3
    const paddingSize = 2
    if (n === 0) return side == 'left' ? 0 : 2 * paddingSize
    if (n === 2) return side == 'left' ? 2 * paddingSize : 0
    if (n === 1) return paddingSize
  }

  return (
    <Box alignSelf="stretch">
      <Box flexDirection="row" flexWrap="wrap">
        {photos.map((uri, uriIndex) => (
          <Box
            paddingTop="s"
            style={{
              paddingLeft: getPadding(uriIndex, 'left'),
              paddingRight: getPadding(uriIndex, 'right'),
              width: '33.33%',
            }}>
            <Photo src={uri} />
          </Box>
        ))}
      </Box>
      <TouchableOpacity onPress={addMore}>
        {displayAddMore && (
          <Box flexDirection="row" alignSelf="flex-end" alignItems="center">
            <PaperclipOrangeIcon width={14} height={14} color={'red'} />
            <Text variant="boldOrange15" fontSize={12} marginLeft="s">
              Add more
            </Text>
          </Box>
        )}
      </TouchableOpacity>
    </Box>
  )
}
