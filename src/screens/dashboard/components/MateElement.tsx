import React from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import IconProfile from 'assets/icons/icon-profile.svg'
import { RequiredMateHolidaysData } from 'types/holidaysDataTypes'
import { displayWeekday, displayDayShort, setDateToBeDisplayed } from 'utils/functions'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { useNavigation } from '@react-navigation/native'
import { DashboardNavigationType } from 'navigation/types'

type MateElementProps = RequiredMateHolidaysData

export const MateElement = (props: MateElementProps) => {
  const { t, i18n } = useTranslation('dashboard')
  const { firstName, lastName, holidays } = props
  const date = holidays.isOnHoliday ? holidays.dayStart : holidays.dayEnd
  const dateToBeDisplayed = setDateToBeDisplayed(date, holidays.isOnHoliday)

  const version = {
    color: holidays.isOnHoliday ? 'tertiary' : 'greyDark',
    text: holidays.isOnHoliday ? 'backAtWork' : 'lastDayAtWork',
    borderColor: holidays.isOnHoliday ? 'tertiary' : 'disabledText',
  }

  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToMateDetails = () => navigation.navigate('DashboardTeamMember', { ...props })

  return (
    <BaseOpacity
      backgroundColor="disabledText"
      borderRadius="lmin"
      marginVertical="s"
      borderColor={version.borderColor}
      borderWidth={2}
      flexDirection="row"
      alignItems="center"
      onPress={navigateToMateDetails}>
      <Box margin="m">
        <IconProfile width={62} height={62} />
        {holidays.isOnHoliday && <OnHolidayTag variant="small" background="grey" />}
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
