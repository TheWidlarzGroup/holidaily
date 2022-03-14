import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { getFormattedPeriod, getNumberOfWorkingDaysBetween } from 'utils/dates'

import { Box, Text, Theme, useTheme } from 'utils/theme'
import SpinnerIcon from 'assets/icons/icon-spinner.svg'
import CheckIcon from 'assets/icons/icon-check.svg'
import ClockIcon from 'assets/icons/icon-past-request-clock.svg'
import { Additional, AdditionalsIcons } from './AdditionalsIcons'
import { StatusTypes } from './Status'

type RequestProps = {
  item: {
    description: string
    range: string[]
    status: StatusTypes
    sickTime?: boolean
    message?: string
  }
}

export const Request = ({
  item: { description, range, status, sickTime, message },
}: RequestProps) => {
  const { t } = useTranslation(['stats'])
  const [additionals, setAdditionals] = useState<Additional[]>([])
  const [daysBetween, setDaysBetween] = useState(1)

  useEffect(() => {
    setDaysBetween(getNumberOfWorkingDaysBetween(range[0], range[range.length - 1]))
  }, [range])

  useEffect(() => {
    const tempAdditionals: Additional[] = []
    if (sickTime) tempAdditionals.push('sick')
    if (message) tempAdditionals.push('comment')
    setAdditionals(tempAdditionals)
  }, [sickTime, message])

  return (
    <Box
      marginHorizontal="s"
      marginTop="s"
      backgroundColor="white"
      borderRadius="lmin"
      flexDirection="row"
      justifyContent="space-between"
      borderWidth={status === 'NOW' ? 2 : 0}
      borderColor="tertiary"
      overflow="hidden">
      <Box>
        <Box flexDirection="row">
          <StatusIcon status={status} />
          <Box paddingHorizontal="m" paddingVertical="xm">
            <Text variant="bold16" marginBottom="s">
              {description}
            </Text>
            <Text variant="captionText">
              {getFormattedPeriod(range[0], range[range.length - 1], 'long')}
            </Text>
            <Text variant="captionText" color="headerGrey">
              {daysBetween} {daysBetween > 1 ? t('days') : t('day')}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        alignSelf="flex-end"
        alignItems="flex-end"
        justifyContent="space-between"
        paddingHorizontal="m"
        paddingVertical="xm">
        <AdditionalsIcons additionals={additionals} />
      </Box>
    </Box>
  )
}

const StatusIcon = ({ status }: { status: StatusTypes }) => {
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

const getIcon = (status: StatusTypes) => {
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
