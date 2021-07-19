import React from 'react'
import { getFormattedPeriod, getNumberOfWorkingDaysBetween } from 'utils/dates'

import { Box, Text } from 'utils/theme'
import { Status, StatusTypes } from './Status'

export type Additional = 'sick' | 'comment' | 'attachment'
type RequestProps = {
  title: string
  startDate: string
  endDate: string
  status: StatusTypes
  additionals?: Additional[]
}

export const Request = ({ title, startDate, endDate, status, additionals }: RequestProps) => (
  <Box
    marginHorizontal="s"
    marginTop="s"
    backgroundColor="white"
    borderRadius="lmin"
    paddingHorizontal="m"
    paddingVertical="xm"
    flexDirection="row"
    justifyContent="space-between"
    borderWidth={status === 'Now' ? 2 : 0}
    borderColor="tertiary">
    <Box>
      <Text variant="bold16" marginBottom="s">
        {title}
      </Text>
      <Text variant="captionText">{getFormattedPeriod(startDate, endDate, 'long')}</Text>
      <Text variant="captionText" color="headerGrey">
        {getNumberOfWorkingDaysBetween(startDate, endDate)} d
      </Text>
    </Box>
    <Box alignItems="flex-end" justifyContent="space-between">
      <Status status={status} />
      <Box></Box>
    </Box>
  </Box>
)
