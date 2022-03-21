import React from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { RequiredMateHolidaysData } from 'types/holidaysDataTypes'
import { displayWeekday, displayDayShort, setDateToBeDisplayed } from 'utils/functions'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { useNavigation } from '@react-navigation/native'
import { DashboardNavigationType } from 'navigation/types'
import { Avatar } from 'components/Avatar'

type MateElementProps = RequiredMateHolidaysData

export const MateElement = (props: MateElementProps) => {
  const { t } = useTranslation('dashboard')
  const { firstName, lastName, holidays, photo } = props
  const date = holidays.isOnHoliday ? holidays.dayEnd : holidays.dayStart
  const dateToBeDisplayed = setDateToBeDisplayed(date, holidays.isOnHoliday)

  const version: {
    color: 'tertiary' | 'greyDark'
    text: 'backAtWork' | 'lastDayAtWork'
    borderColor: 'tertiary' | 'disabledText'
  } = {
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
        <Avatar src={photo} />
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
          {displayDayShort(dateToBeDisplayed)}
        </Text>
        <Text variant="regular15" color={version.color}>
          {displayWeekday(dateToBeDisplayed)}
        </Text>
      </Box>
    </BaseOpacity>
  )
}
