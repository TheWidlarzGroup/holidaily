import React, { FC } from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { Box, Text } from '../utils/theme/index'

import { IconGoogle } from './icons/IconGoogle'
import { IconSlack } from './icons/IconSlack'

type ButtonProps = {
  label: string
  textColor: 'white' | 'black'
  backgroundColor?: 'black' | '#FF9F2D'
  onPress?: () => void
  icon?: 'google' | 'slack'
}

export const Button: FC<ButtonProps> = ({ label, textColor, backgroundColor, icon, onPress }) => (
  <RectButton onPress={onPress}>
    <Box
      flexDirection="row"
      width={275}
      height={53}
      alignSelf="center"
      justifyContent="space-evenly"
      alignItems="center"
      borderRadius="xxl"
      borderWidth={2}
      style={[backgroundColor && { backgroundColor, borderColor: backgroundColor }]}>
      {icon === 'google' && <IconGoogle />}
      {icon === 'slack' && <IconSlack />}
      <Text variant="buttonText1" color={textColor}>
        {label}
      </Text>
    </Box>
  </RectButton>
)
