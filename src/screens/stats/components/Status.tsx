import React from 'react'
import { Box, Text, theme } from 'utils/theme'
import { PalmTreeIcon } from 'assets/icons/PalmTreeIcon'
import { CheckmarkIcon } from 'assets/icons/CheckmarkIcon'
import { ClockIcon } from 'assets/icons/ClockIcon'
import { QuestionIcon } from 'assets/icons/QuestionIcon'

export type StatusTypes = 'Now' | 'Approved' | 'Pending' | 'Past'
type StatusProps = {
  status: StatusTypes
}

export const Status = ({ status }: StatusProps) => {
  const getColor = () => {
    switch (status) {
      case 'Now':
        return theme.colors.black
      case 'Approved':
        return theme.colors.tertiary
      case 'Pending':
        return theme.colors.special
      case 'Past':
        return theme.colors.grey
      default:
        return theme.colors.black
    }
  }
  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center">
      {status === 'Now' && <PalmTreeIcon fill={getColor()} />}
      {status === 'Approved' && <CheckmarkIcon fill={getColor()} />}
      {status === 'Pending' && <ClockIcon fill={getColor()} />}
      {status === 'Past' && <QuestionIcon fill={getColor()} />}
      <Text variant="captionText" marginLeft="s" style={{ color: getColor() }}>
        {status}
      </Text>
    </Box>
  )
}
