import React from 'react'
import { BaseOpacity, Text, Theme } from 'utils/theme'

type TextLinkProps = {
  text: string
  action: () => void
  variant: keyof Theme['textVariants']
}
export const TextLink = ({ text, variant, action }: TextLinkProps) => (
  <BaseOpacity onPress={action}>
    <Text variant={variant}>{text}</Text>
  </BaseOpacity>
)
