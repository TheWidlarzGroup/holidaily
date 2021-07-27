import React from 'react'
import { Box, mkUseStyles, Text } from 'utils/theme/index'
import AddCommentIcon from 'assets/icons/addComment.svg'
import { TouchableOpacity } from 'react-native'

type MessageProps = {
  onPressMessage: F0
  messageContent: string
}

export const Message = ({ onPressMessage, messageContent }: MessageProps) => {
  const styles = useStyles()

  return (
    <TouchableOpacity onPress={onPressMessage}>
      <Box position="relative" style={styles.container}>
        {/*<Box
          backgroundColor="lightGrey"
          padding="xm"
          margin="s"
          marginLeft={0}
          borderRadius="l"
          style={styles.cornerAddComment}>
          <TouchableOpacity onPress={onPressMessage}>
            <AddCommentIcon width={22} height={22} />
          </TouchableOpacity>
        </Box>*/}
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
    paddingHorizontal: 10,
  },
  cornerAddComment: {
    position: 'absolute',
    top: 0,
    left: 0,
    background: theme.colors.grey,
    zIndex: 4,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: theme.colors.disabledText,
  },
}))
