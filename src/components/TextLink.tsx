import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, Theme } from 'utils/theme'

type TextLinkProps = {
  text: string
  action: () => void
  variant: keyof Theme['textVariants']
}
export const TextLink: FC<TextLinkProps> = ({ text, variant, action }) => (
  <TouchableOpacity onPress={action}>
    <Text variant={variant}>{text}</Text>
  </TouchableOpacity>
)
