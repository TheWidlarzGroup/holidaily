import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'utils/theme'

type TextLinkProps = {
  text: string
  action: () => void
  variant: any
}
export const TextLink: FC<TextLinkProps> = ({ text, action, variant }) => (
  <TouchableOpacity onPress={action}>
    <Text variant={variant}>{text}</Text>
  </TouchableOpacity>
)
