import React, { useState, useEffect } from 'react'
import { Box, Theme, useTheme } from 'utils/theme'
import SpinnerIcon from 'assets/icons/icon-spinner.svg'
import CheckIcon from 'assets/icons/icon-check.svg'
import ClockIcon from 'assets/icons/icon-past-request-clock.svg'
import { RequestTypes } from 'types/useUserRequestsTypes'

export const StatusIcon = ({ status }: { status: RequestTypes['status'] }) => {
  const [statusColor, setStatusColor] = useState<keyof Theme['colors']>('primary')
  const theme = useTheme()
  useEffect(() => {
    if (status === 'APPROVED') setStatusColor('approvedGreen')
    if (status === 'PENDING') setStatusColor('primary')
    if (status === 'PAST') setStatusColor('headerGrey')
  }, [status])
  const Icon = getIcon(status)
  return (
    <Box width={50} backgroundColor={statusColor} justifyContent="center" alignItems="center">
      {Icon && <Icon color={theme.colors.white} />}
    </Box>
  )
}

const getIcon = (status: RequestTypes['status']) => {
  switch (status) {
    case 'APPROVED':
      return CheckIcon
    case 'PENDING':
      return SpinnerIcon
    case 'PAST':
      return ClockIcon
    default:
      return null
  }
}
