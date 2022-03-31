import React from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { displayWeekday, displayDayShort, setDateToBeDisplayed } from 'utils/functions'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { Avatar } from 'components/Avatar'
import { User } from 'mock-api/models/mirageTypes'

type MateElementProps = {
  userData: User
  openUserModal: F1<User>
}

export const MateElement = (props: MateElementProps) => {
  const { t } = useTranslation('dashboard')
  const { firstName, lastName, requests, photo } = props.userData
  const date = requests[0].isOnHoliday ? requests[0].endDate : requests[0].startDate
  const dateToBeDisplayed = setDateToBeDisplayed(date, requests[0].isOnHoliday)

  const version: {
    color: 'tertiary' | 'greyDark'
    text: 'backAtWork' | 'lastDayAtWork'
    borderColor: 'tertiary' | 'disabledText'
  } = {
    color: requests[0].isOnHoliday ? 'tertiary' : 'greyDark',
    text: requests[0].isOnHoliday ? 'backAtWork' : 'lastDayAtWork',
    borderColor: requests[0].isOnHoliday ? 'tertiary' : 'disabledText',
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
        {requests[0].isOnHoliday && <OnHolidayTag variant="small" background="grey" />}
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
