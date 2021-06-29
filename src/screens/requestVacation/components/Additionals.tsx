import React from 'react'
import { Box, mkUseStyles, Text } from 'utils/theme/index'
import PaperclipIcon from 'assets/icons/paperclip.svg'
import AddCommentIcon from 'assets/icons/addComment.svg'
import { TouchableOpacity } from 'react-native'

type AdditionalsProps = {
  onPressMessage: F0
  messageContent: string
  showMessageInput: boolean
}

export const Additionals = ({
  onPressMessage,
  messageContent,
  showMessageInput,
}: AdditionalsProps) => {
  const styles = useStyles()

  return (
    <Box>
      <Text variant="boldBlack18" textAlign="left" marginTop="l">
        Additionals
      </Text>
      <Text variant="body1" textAlign="left">
        Add an attachment or write a message
      </Text>
      <Box
        flexDirection={messageContent ? 'column-reverse' : 'row'}
        justifyContent="flex-start"
        alignItems="flex-start">
        <Box backgroundColor="lightGrey" padding="xm" margin="s" marginLeft={0} borderRadius="l">
          <PaperclipIcon width={22} height={22} />
        </Box>

        {!showMessageInput && !messageContent && (
          <Box backgroundColor="lightGrey" padding="xm" margin="s" marginLeft={0} borderRadius="l">
            <TouchableOpacity onPress={onPressMessage}>
              <AddCommentIcon width={22} height={22} />
            </TouchableOpacity>
          </Box>
        )}

        {!showMessageInput && !!messageContent && (
          <TouchableOpacity onPress={onPressMessage}>
            <Box position="relative" style={{ padding: 25 }}>
              <Box
                backgroundColor="lightGrey"
                padding="xm"
                margin="s"
                marginLeft={0}
                borderRadius="l"
                style={styles.cornerAddComment}>
                <TouchableOpacity onPress={onPressMessage}>
                  <AddCommentIcon width={22} height={22} />
                </TouchableOpacity>
              </Box>
              <Box padding="l" backgroundColor="lightGrey" borderRadius="mplus">
                <Text variant="regularGrey16" color="black">
                  {messageContent}
                </Text>
              </Box>
            </Box>
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    position: 'relative',
    backgoundColor: 'lightgreen',
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
