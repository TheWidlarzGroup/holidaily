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
        <Box marginRight="m">{icon}</Box>
        <Text fontFamily="Nunito-Bold" fontSize={18}>
          {text}
        </Text>
      </Box>
    </BaseButton>
  </Box>
)
