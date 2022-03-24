import React from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { MateHolidaysData, RequiredMateHolidaysData } from 'types/holidaysDataTypes'
import { displayWeekday, displayDayShort, setDateToBeDisplayed } from 'utils/functions'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { Avatar } from 'components/Avatar'

type MateElementProps = {
  userData: RequiredMateHolidaysData
  openUserModal: F1<MateHolidaysData>
}

export const MateElement = (props: MateElementProps) => {
  const { t } = useTranslation('dashboard')
  const { firstName, lastName, holidays, photo } = props.userData
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

  const handleOnPress = () => props.openUserModal(props.userData)

  return (
    <BaseOpacity
      backgroundColor="disabledText"
      borderRadius="lmin"
      marginVertical="s"
      borderColor={version.borderColor}
      borderWidth={2}
      flexDirection="row"
      alignItems="center"
      onPress={handleOnPress}>
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
