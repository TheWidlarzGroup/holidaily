import React from 'react'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import { DayOffRequest } from 'mock-api/models'
import SpinnerIcon from 'assets/icons/icon-spinner.svg'
import CheckIcon from 'assets/icons/icon-check.svg'
import ClockIcon from 'assets/icons/icon-past-request-clock.svg'
import CrossIcon from 'assets/icons/icon-close.svg'

export const CircleStatusIcon = ({ status }: { status: DayOffRequest['status'] }) => {
  const styles = useStyles()
  switch (status) {
    case 'cancelled':
      return (
        <Box style={styles.iconWrapper} bg="errorRed">
          <CrossIcon color="white" />
        </Box>
      )
    case 'accepted':
      return (
        <Box style={styles.iconWrapper} bg="approvedGreen">
          <CheckIcon color="white" />
        </Box>
      )
    case 'past':
      return (
        <Box style={styles.iconWrapper} bg="greyDark">
          <ClockIcon color="white" />
        </Box>
      )
    case 'pending':
    default:
      return (
        <Box style={styles.iconWrapper} bg="primary">
          <SpinnerIcon color="white" />
        </Box>
      )
  }
}

const useStyles = mkUseStyles((theme: Theme) => ({
  iconWrapper: {
    height: 36,
    width: 36,
    borderRadius: 18,
    bg: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.m,
  },
}))
