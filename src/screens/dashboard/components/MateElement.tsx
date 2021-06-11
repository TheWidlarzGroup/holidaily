import React from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import IconProfile from 'assets/icons/icon-profile.svg'
import { RequiredUserDetails } from 'types/holidaysDataTypes'
import { displayWeekday, displayDayShort, setDateToBeDisplayed } from 'utils/functions'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { BaseOpacity } from './BaseOpacity'

export const MateElement = (props: RequiredUserDetails) => {
  const { t, i18n } = useTranslation('dashboard')
  const { firstName, lastName, holidays } = props
  const date = holidays.isOnHoliday ? holidays.dayStart : holidays.dayEnd
  const dateToBeDisplayed = setDateToBeDisplayed(date, holidays.isOnHoliday)

  const version = {
    color: holidays.isOnHoliday ? 'tertiary' : 'greyDark',
    text: holidays.isOnHoliday ? 'backAtWork' : 'lastDayAtWork',
    borderColor: holidays.isOnHoliday ? 'tertiary' : 'disabledText',
  }

  return (
    <BaseOpacity mate={props} borderColor={version.borderColor}>
      <Box margin="m">
        <IconProfile width={62} height={62} />
        {holidays.isOnHoliday && <OnHolidayTag variant="small" />}
      </Box>
      <Box marginVertical="s">
        <Text variant="alreadyRegistered" color="black" lineHeight={20}>
          {firstName} {lastName}
        </Text>
        <Text variant="lightGreyRegular" color="headerGrey">
          {t(version.text).toUpperCase()}
        </Text>
        <Text variant="bold20" color={version.color}>
          {displayDayShort(dateToBeDisplayed, i18n.language)}
        </Text>
        <Text variant="regular15" color={version.color}>
          {displayWeekday(dateToBeDisplayed, i18n.language)}
        </Text>
      </Box>
    </BaseOpacity>
  )
}
