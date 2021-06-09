import React from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import { Box, Text } from 'utils/theme'

type DrawerItemProps = {
  text: string
  onPress: () => void
  icon?: React.ReactNode | undefined
}

export const DrawerItem = ({ icon, text, onPress }: DrawerItemProps) => (
  <Box margin="s">
    <BaseButton onPress={onPress}>
      <Box margin="s" flexDirection="row" alignItems="center">
        {icon && <Box marginRight="m">{icon}</Box>}
        <Text variant="boldBlack18">{text}</Text>
      </Box>
    </BaseButton>
  </Box>
)
