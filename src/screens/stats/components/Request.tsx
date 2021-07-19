import React from 'react'

import { Box, Text } from 'utils/theme'
import { Status, StatusTypes } from './Status'

export type Additional = 'sick' | 'comment' | 'attachment'
type RequestProps = {
  title: string
  date: string
  duration: string
  status: StatusTypes
  additionals?: Additional[]
}

export const Request = ({ title, date, duration, status, additionals }: RequestProps) => (
  <Box
    marginHorizontal="s"
    marginTop="s"
    backgroundColor="white"
    borderRadius="lmin"
    padding="m"
    flexDirection="row"
    justifyContent="space-between"
    borderWidth={status === 'Now' ? 2 : 0}
    borderColor="tertiary">
    <Box>
      <Text variant="bold16" marginBottom="s">
        {title}
      </Text>
      <Text variant="captionText">{date}</Text>
      <Text variant="captionText">{duration}</Text>
    </Box>
    <Box alignItems="flex-end" justifyContent="space-between">
      <Status status={status} />
      <Box></Box>
    </Box>
  </Box>
)
