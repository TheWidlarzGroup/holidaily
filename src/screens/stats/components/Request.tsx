import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { getFormattedPeriod, getNumberOfWorkingDaysBetween } from 'utils/dates'

import { Box, Text } from 'utils/theme'
import { RequestTypes } from 'types/useUserRequestsTypes'
import { Additional, AdditionalsIcons } from './AdditionalsIcons'
import { StatusIcon } from './StatusIcon'

export const Request = ({
  item: { description, range, status, sickTime, message },
}: {
  item: RequestTypes
}) => {
  const { t } = useTranslation('stats')
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
