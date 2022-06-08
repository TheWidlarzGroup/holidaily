import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DayOffRequest } from 'mockApi/models'
import { Box, Text } from 'utils/theme'
import { getDateWithShortMonthString, getFormattedPeriod } from 'utils/dates'
import { Additional, AdditionalsIcons } from './AdditionalsIcons'
import { StatusIcon } from './StatusIcon'

export const Request = (p: DayOffRequest) => {
  const { t } = useTranslation(['stats', 'requestVacation', 'seeRequest'])
  const [additionals, setAdditionals] = useState<Additional[]>([])

  useEffect(() => {
    const tempAdditionals: Additional[] = []
    if (p.isSickTime) tempAdditionals.push('sick')
    if (p.message) tempAdditionals.push('comment')
    setAdditionals(tempAdditionals)
  }, [p.isSickTime, p.message])

  return (
    <Box
      height={106}
      marginHorizontal="m"
      marginTop="s"
      backgroundColor="white"
      borderRadius="lmin"
      flexDirection="row"
      justifyContent="flex-start"
      overflow="hidden">
      {p.isSickTime && (
        <Box
          position="absolute"
          top={0}
          right={0}
          backgroundColor="quarternaryDarken"
          borderTopRightRadius="lmin"
          borderBottomLeftRadius="lmin"
          justifyContent="center"
          alignItems="center">
          <Text
            variant="boldWhite12"
            lineHeight={14}
            marginHorizontal="xm"
            marginVertical="xs"
            color="veryLightGrey">
            {t('seeRequest:sickLeave')}
          </Text>
        </Box>
      )}
      <StatusIcon status={p.status} />
      <Box margin="m" flexDirection="column" flexGrow={1}>
        <Text
          variant="textBoldSM"
          color="black"
          marginBottom="xsplus"
          numberOfLines={1}
          lineHeight={21}
          style={{ maxWidth: '70%' }}>
          {p.description || t('requestVacation:timeOffDescriptionPlaceholder')}
        </Text>
        <Text variant="textSM" color="blackBrighter" lineHeight={21} marginBottom="xm">
          {getFormattedPeriod(p.startDate, p.endDate, 'shortMonths')}
        </Text>
        <Box flexDirection="row" justifyContent="space-between">
          <AdditionalsIcons additionals={additionals} />
          <Text variant="displayXS" color="darkGreyBrighter">
            {`${t('stats:sent')}: ${getDateWithShortMonthString(p.createdAt)}`}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
