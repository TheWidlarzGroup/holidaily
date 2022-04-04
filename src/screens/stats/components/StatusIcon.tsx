import React from 'react'
import { Box, useTheme } from 'utils/theme'
import SpinnerIcon from 'assets/icons/icon-spinner.svg'
import CheckIcon from 'assets/icons/icon-check.svg'
import ClockIcon from 'assets/icons/icon-past-request-clock.svg'
import CrossIcon from 'assets/icons/icon-close.svg'
import { DayOffRequest } from 'mock-api/models'

export const StatusIcon = ({ status }: { status: DayOffRequest['status'] }) => {
  const theme = useTheme()

  switch (status) {
    case 'accepted':
      return (
        <Box backgroundColor="approvedGreen" {...commonIconProps}>
          <CheckIcon color={theme.colors.white} />
        </Box>
      )
    case 'pending':
      return (
        <Box backgroundColor="primary" {...commonIconProps}>
          <SpinnerIcon color={theme.colors.white} />
        </Box>
      )
    case 'past':
      return (
        <Box backgroundColor="headerGrey" {...commonIconProps}>
          <ClockIcon color={theme.colors.white} />
        </Box>
      )
    case 'cancelled':
      return (
        <Box backgroundColor="errorRed" {...commonIconProps}>
          <CrossIcon color={theme.colors.white} />
        </Box>
      )
    default:
      return null
  }
}
const commonIconProps = {
  width: 50,
  justifyContent: 'center',
  alignItems: 'center',
}
