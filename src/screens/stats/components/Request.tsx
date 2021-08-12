import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { getFormattedPeriod, getNumberOfWorkingDaysBetween } from 'utils/dates'

import { Box, Text } from 'utils/theme'
import { Additional, AdditionalsIcons } from './AdditionalsIcons'
import { Status, StatusTypes } from './Status'

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
      paddingHorizontal="m"
      paddingVertical="xm"
      flexDirection="row"
      justifyContent="space-between"
      borderWidth={status === 'NOW' ? 2 : 0}
      borderColor="tertiary">
      <Box>
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
      <Box alignItems="flex-end" justifyContent="space-between">
        <Status status={status} />
        <AdditionalsIcons additionals={additionals} />
      </Box>
    </Box>
  )
}
