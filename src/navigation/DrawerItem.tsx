import React from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Box, Text } from 'utils/theme'

type DrawerItemProps = {
  text?: string
  onPress: () => void
  icon?: React.ReactNode | undefined
}

export const DrawerItem = ({ icon, text, onPress }: DrawerItemProps) => (
  <Box margin="s">
    <BorderlessButton
      onPress={onPress}
      activeOpacity={0.1}
      borderless={false}
      rippleColor="#00000008"
      style={{ alignSelf: 'flex-start' }}>
      <Box margin="s" flexDirection="row" alignItems="center">
        {icon && <Box marginRight="m">{icon}</Box>}
        <Text variant="boldBlack18" marginRight="m">
          {text}
        </Text>
      </Box>
    </BorderlessButton>
  </Box>
)
