import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { getFormattedPeriod, getNumberOfWorkingDaysBetween } from 'utils/dates'

import { Box, Text } from 'utils/theme'
import { Additional, AdditionalsIcons } from './AdditionalsIcons'
import { Status, StatusTypes } from './Status'

type RequestProps = {
  item: {
    title: string
    startDate: string
    endDate: string
    status: StatusTypes
    additionals?: Additional[]
  }
}

export const Request = ({
  item: { title, startDate, endDate, status, additionals },
}: RequestProps) => {
  const { t } = useTranslation(['stats'])
  const [daysBetween, setDaysBetween] = useState(1)
  useEffect(() => {
    setDaysBetween(getNumberOfWorkingDaysBetween(startDate, endDate))
  }, [startDate, endDate])
  return (
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
          {daysBetween} {daysBetween > 1 ? t('days') : t('day')}
        </Text>
      </Box>
      <Box alignItems="flex-end" justifyContent="space-between">
        <Status status={status} />
        <AdditionalsIcons additionals={additionals} />
      </Box>
    </Box>
  )
}
