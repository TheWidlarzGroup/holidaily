import React from 'react'
import { Box, Text, Theme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { displayDatesRange } from 'utils/functions'
import { DayOffRequest, User } from 'mock-api/models/mirageTypes'
import { HolidayTag } from './HolidayTag'

type MateHolidayTypes = { user: User; isNextRequest?: true; sortedRequests: DayOffRequest[] }

export const MateHoliday = ({ user, isNextRequest, sortedRequests }: MateHolidayTypes) => {
  const userRequest = isNextRequest ? sortedRequests[1] : sortedRequests[0]
  const { startDate, endDate, isSickTime, description } = userRequest
  const { isOnHoliday } = user
  const { t } = useTranslation('dashboard')

  const header = isOnHoliday ? 'outOfWorkNow' : 'outOfWorkSoon'

  let background: keyof Theme['colors'] = 'primaryOpaque'
  let text: keyof Theme['colors'] = 'primaryOpaque'

  switch (true) {
    case isOnHoliday && !isSickTime:
      background = 'primaryOpaque'
      text = 'tertiary'
      break
    case isOnHoliday && isSickTime:
      background = 'quarternaryOpaque'
      text = 'quarternary'
      break
    case !isOnHoliday:
      background = 'lightBlue'
      text = 'textBlue'
      break
    default:
      break
  }

  return (
    <Box
      padding="xm"
      paddingBottom="l"
      backgroundColor={background}
      borderTopLeftRadius="lmin"
      borderTopRightRadius="lmin"
      marginTop={isNextRequest ? 'l' : 'none'}
      borderBottomLeftRadius={isNextRequest ? 'lmin' : 'none'}
      borderBottomRightRadius={isNextRequest ? 'lmin' : 'none'}>
      <Box position="absolute" left={30} top={11}>
        <HolidayTag hideBorder hideBorderColor isSick={isSickTime} isSoonOnHoliday={!isOnHoliday} />
      </Box>
      <Text variant="textBoldXS" color={text} paddingLeft="lplus">
        {t(header)}
      </Text>
      <Text variant="textBoldMD" textAlign="center" marginTop="s">
        {description || t('coupleDaysOff')}
      </Text>
      <Text variant="textSM" textAlign="center" marginTop="xs">
        {startDate && endDate && displayDatesRange(startDate, endDate)}
      </Text>
    </Box>
  )
}
