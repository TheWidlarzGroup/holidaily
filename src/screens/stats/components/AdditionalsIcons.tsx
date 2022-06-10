import React from 'react'

import { Box, useTheme } from 'utils/theme'
import IconMessage from 'assets/icons/icon-message-small.svg'
import IconAttachment from 'assets/icons/icon-attachment-small.svg'

export type Additional = 'sick' | 'comment' | 'attachment'

type IconProps = {
  name: Additional
  iconColor: string
}

const Icon = (props: IconProps) => {
  switch (props.name) {
    case 'attachment':
      return <IconAttachment color={props.iconColor} />
    case 'comment':
      return <IconMessage color={props.iconColor} />
    default:
      return null
  }
}

export const AdditionalsIcons = ({ additionals }: { additionals?: Additional[] }) => {
  const theme = useTheme()

  return (
    <Box flexDirection="row" alignItems="flex-start">
      {additionals?.map((item) => (
        <Icon name={item} key={item} iconColor={theme.colors.darkGreyBrighter} />
      ))}
    </Box>
  )
}
