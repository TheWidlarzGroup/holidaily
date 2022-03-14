import React from 'react'

import { Box } from 'utils/theme'
import IconMessage from 'assets/icons/icon-message-small.svg'
import IconAttachment from 'assets/icons/icon-attachment-small.svg'
import IconPill from 'assets/icons/icon-pill-small.svg'

export type Additional = 'sick' | 'comment' | 'attachment'

const Icon = ({ name }: { name: Additional }) => {
  switch (name) {
    case 'attachment':
      return <IconAttachment />
    case 'comment':
      return <IconMessage />
    case 'sick':
      return <IconPill />
    default:
      return null
  }
}

export const AdditionalsIcons = ({ additionals }: { additionals?: Additional[] }) => (
  <Box flexDirection="row" alignItems="flex-end">
    {additionals?.map((item) => (
      <Icon name={item} key={item} />
    ))}
  </Box>
)
