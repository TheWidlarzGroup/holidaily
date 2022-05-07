import React from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { displayWeekday, displayDayShort, setDateToBeDisplayed } from 'utils/functions'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { Avatar } from 'components/Avatar'
import { User } from 'mock-api/models/mirageTypes'
import { makeUserDetails } from 'utils/userDetails'

type MateElementProps = {
  userData: User
  openUserModal: F1<User>
}

export const MateElement = ({ userData, openUserModal }: MateElementProps) => {
  const { t } = useTranslation('dashboard')
  const { firstName, lastName, requests, photo } = userData
  const date = userData.isOnHoliday ? requests[0].endDate : requests[0].startDate
  const dateToBeDisplayed = setDateToBeDisplayed(date, userData.isOnHoliday)

  const version: {
    color: 'tertiary' | 'greyDark'
    text: 'backAtWork' | 'lastDayAtWork'
    borderColor: 'tertiary' | 'disabledText'
  } = {
    color: userData.isOnHoliday ? 'tertiary' : 'greyDark',
    text: userData.isOnHoliday ? 'backAtWork' : 'lastDayAtWork',
    borderColor: userData.isOnHoliday ? 'tertiary' : 'disabledText',
  }

  const handleOnPress = () => openUserModal(userData)

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
        <Avatar src={photo} userDetails={makeUserDetails(userData)} />
        {userData.isOnHoliday && <OnHolidayTag variant="small" background="grey" />}
      </Box>
      <Box marginVertical="s">
        <Text variant="alreadyRegistered" color="black" lineHeight={20}>
          {firstName} {lastName}
        </Text>
        <Text variant="lightGreyRegular" color="darkGreyBrighterDouble">
          {t(version.text).toUpperCase()}
        </Text>
        <Text variant="bold20" color="blackBrighter">
          {displayDayShort(dateToBeDisplayed)}
        </Text>
        <Text variant="regular15" color="blackBrighter">
          {displayWeekday(dateToBeDisplayed)}
        </Text>
      </Box>
    </BaseOpacity>
  )
}
