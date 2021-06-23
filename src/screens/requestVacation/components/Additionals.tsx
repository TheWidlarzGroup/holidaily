import React from 'react'
import { Box, Text } from 'utils/theme/index'
import PaperclipIcon from 'assets/icons/paperclip.svg'
import AddCommentIcon from 'assets/icons/addComment.svg'

export const Additionals = () => (
  <Box>
    <Text variant="boldBlack18" textAlign="left" marginTop="l">
      Additionals
    </Text>
    <Text variant="body1" textAlign="left">
      Add and attachment or write a message
    </Text>
    <Box flexDirection="row">
      <Box backgroundColor="lightGrey" padding="xm" marginVertical="m" borderRadius="l">
        <PaperclipIcon width={22} height={22} />
      </Box>
      <Box
        backgroundColor="lightGrey"
        padding="xm"
        marginVertical="m"
        marginHorizontal="m"
        borderRadius="l">
        <AddCommentIcon width={22} height={22} />
      </Box>
    </Box>
  </Box>
)
