import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { calculatePTO, getFormattedPeriod, isDateBetween } from 'utils/dates'
import { DayOffRequest } from 'mockApi/models'
import { Box, Text } from 'utils/theme'
import { Additional, AdditionalsIcons } from './AdditionalsIcons'
import { StatusIcon } from './StatusIcon'

export const Request = (p: DayOffRequest) => {
  const { t } = useTranslation(['stats', 'requestVacation'])
  const [additionals, setAdditionals] = useState<Additional[]>([])
  const [daysBetween, setDaysBetween] = useState(1)

  useEffect(() => {
    setDaysBetween(calculatePTO(p.startDate, p.endDate))
  }, [p.startDate, p.endDate])

  useEffect(() => {
    const tempAdditionals: Additional[] = []
    if (p.isSickTime) tempAdditionals.push('sick')
    if (p.message) tempAdditionals.push('comment')
    setAdditionals(tempAdditionals)
  }, [p.isSickTime, p.message])

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
          <StatusIcon
            status={p.status}
            isOngoing={p.status === 'accepted' && isDateBetween(new Date(), p.startDate, p.endDate)}
          />
          <Box paddingHorizontal="m" paddingVertical="xm" style={{ width: '90%' }}>
            <Text variant="bold16" marginBottom="s" numberOfLines={1} style={{ maxWidth: '90%' }}>
              {p.description || t('requestVacation:timeOffDescriptionPlaceholder')}
            </Text>
            <Text variant="captionText">{getFormattedPeriod(p.startDate, p.endDate, 'long')}</Text>
            <Text variant="captionText" color="headerGrey">
              {daysBetween} {daysBetween > 1 ? t('stats:days') : t('stats:day')}
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
