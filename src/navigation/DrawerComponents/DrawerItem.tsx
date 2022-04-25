import React from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Box, Text, theme } from 'utils/theme'
import { isSmallScreen } from 'utils/deviceSizes'

type DrawerItemProps = {
  onPress: () => void
  text?: string
  icon?: React.ReactNode
}

export const DrawerItem = ({ icon, text, onPress }: DrawerItemProps) => (
  <Box margin="s">
    <BorderlessButton
      onPress={onPress}
      activeOpacity={0.1}
      borderless={false}
      rippleColor={theme.colors.rippleColor}>
      <Box margin="s" flexDirection="row" alignItems="center">
        {icon && <Box marginRight="m">{icon}</Box>}
        <Text
          fontFamily="Nunito-Bold"
          color="black"
          textAlign="center"
          fontSize={isSmallScreen ? 16 : 18}
          marginRight="m">
          {text}
        </Text>
      </Box>
    </BorderlessButton>
  </Box>
)
