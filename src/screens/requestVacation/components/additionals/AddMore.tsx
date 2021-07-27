import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box, Text } from 'utils/theme'
import PaperclipOrangeIcon from 'assets/icons/paperclipOrange.svg'

type AddMoreProps = {
  onPress: F0
}

export const AddMore = ({ onPress }: AddMoreProps) => (
  <TouchableOpacity onPress={onPress}>
    <Box flexDirection="row" alignSelf="flex-end" alignItems="center" marginTop="s">
      <PaperclipOrangeIcon width={14} height={14} />
      <Text variant="boldOrange15" fontSize={12} marginLeft="s">
        Add more
      </Text>
    </Box>
  </TouchableOpacity>
)
