import React from 'react'
import { Box, Text, theme } from 'utils/theme'
import { PalmTreeIcon } from 'assets/icons/PalmTreeIcon'
import { CheckmarkIcon } from 'assets/icons/CheckmarkIcon'
import { ClockIcon } from 'assets/icons/ClockIcon'
import { QuestionIcon } from 'assets/icons/QuestionIcon'
import { capitalize } from 'utils/role'

export type StatusTypes = 'NOW' | 'APPROVED' | 'PENDING' | 'PAST'
type StatusProps = {
  status: StatusTypes
}

export const Status = ({ status }: StatusProps) => {
  const getColor = () => {
    switch (status) {
      case 'NOW':
        return theme.colors.black
      case 'APPROVED':
        return theme.colors.tertiary
      case 'PENDING':
        return theme.colors.special
      case 'PAST':
        return theme.colors.grey
      default:
        return theme.colors.black
    }
  }
  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center">
      {status === 'NOW' && <PalmTreeIcon fill={getColor()} />}
      {status === 'APPROVED' && <CheckmarkIcon fill={getColor()} />}
      {status === 'PENDING' && <QuestionIcon fill={getColor()} />}
      {status === 'PAST' && <ClockIcon fill={getColor()} />}
      <Text variant="captionText" marginLeft="s" style={{ color: getColor() }}>
        {capitalize(status)}
      </Text>
    </Box>
  )
}
