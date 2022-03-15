import React from 'react'
import { Box, useTheme } from 'utils/theme'
import SpinnerIcon from 'assets/icons/icon-spinner.svg'
import CheckIcon from 'assets/icons/icon-check.svg'
import ClockIcon from 'assets/icons/icon-past-request-clock.svg'
import CrossIcon from 'assets/icons/icon-close.svg'
import { RequestStatus } from 'types/useUserRequestsTypes'

export const StatusIcon = ({ status }: { status: RequestStatus }) => {
  const theme = useTheme()

  const commonIconProps = {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }

  switch (status) {
    case 'APPROVED':
      return (
        <Box backgroundColor="approvedGreen" {...commonIconProps}>
          <CheckIcon color={theme.colors.white} />
        </Box>
      )
    case 'PENDING':
      return (
        <Box backgroundColor="primary" {...commonIconProps}>
          <SpinnerIcon color={theme.colors.white} />
        </Box>
      )

    case 'PAST':
      return (
        <Box backgroundColor="headerGrey" {...commonIconProps}>
          <ClockIcon color={theme.colors.white} />
        </Box>
      )

    case 'CANCELLED':
      return (
        <Box backgroundColor="errorRed" {...commonIconProps}>
          <CrossIcon color={theme.colors.white} />
        </Box>
      )

    default:
      return null
  }
}
