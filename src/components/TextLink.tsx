import React, { FC } from 'react'
import { BaseOpacity, Text, Theme } from 'utils/theme'

type TextLinkProps = {
  text: string
  action: () => void
  variant: keyof Theme['textVariants']
}
export const TextLink: FC<TextLinkProps> = ({ text, variant, action }) => (
  <BaseOpacity onPress={action}>
    <Text variant={variant}>{text}</Text>
  </BaseOpacity>
)
