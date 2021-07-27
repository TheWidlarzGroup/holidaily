import React from 'react'
import { Box, mkUseStyles, Text } from 'utils/theme/index'
import CommentIcon from 'assets/icons/icon-message.svg'
import { TouchableOpacity } from 'react-native'

type MessageProps = {
  onPressMessage: F0
  messageContent: string
}

export const Message = ({ onPressMessage, messageContent }: MessageProps) => {
  const styles = useStyles()

  return (
    <TouchableOpacity onPress={onPressMessage} style={{ marginTop: 35 }}>
      <Box position="relative" style={styles.container}>
        <Box backgroundColor="lightGrey" borderRadius="l" style={styles.cornerAddComment}>
          <TouchableOpacity onPress={onPressMessage}>
            <CommentIcon width={18} height={18} />
          </TouchableOpacity>
        </Box>
        <Box padding="m" backgroundColor="lightGrey" borderRadius="mplus">
          <Text variant="regularGrey16" color="black">
            {messageContent}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    position: 'relative',
    overflow: 'visible',
    paddingHorizontal: 10,
  },
  cornerAddComment: {
    position: 'absolute',
    top: -17,
    left: -13,
    background: theme.colors.grey,
    zIndex: 4,
    borderWidth: 3,
    borderColor: theme.colors.disabledText,
    padding: 8,
    margin: 0,
  },
}))
