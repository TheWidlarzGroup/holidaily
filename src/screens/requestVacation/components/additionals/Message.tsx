import React from 'react'
import { Box, Text } from 'utils/theme/index'
import { TouchableOpacity } from 'react-native'

type MessageProps = {
  onPressMessage: F0
  messageContent: string
}

export const Message = ({ onPressMessage, messageContent }: MessageProps) => (
  <TouchableOpacity onPress={onPressMessage}>
    <Box>
      <Box padding="xm" backgroundColor="lightGrey" borderRadius="l1min">
        <Text variant="inputText" color="black">
          {messageContent}
        </Text>
      </Box>
    </Box>
  </TouchableOpacity>
)
