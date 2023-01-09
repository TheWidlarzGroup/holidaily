import React from 'react'
import { BaseOpacity, Text, TextVariant } from 'utils/theme'

type TextLinkProps = {
  text: string
  action: () => void
  variant: TextVariant
}
export const TextLink = ({ text, variant, action }: TextLinkProps) => (
  <BaseOpacity onPress={action}>
    <Text variant={variant}>{text}</Text>
  </BaseOpacity>
)
