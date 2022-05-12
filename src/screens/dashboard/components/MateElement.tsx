import React from 'react'
import { Box, Text, BaseOpacity, useTheme, mkUseStyles } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { displayWeekday, displayDayShort, setDateToBeDisplayed } from 'utils/functions'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { Avatar } from 'components/Avatar'
import { User } from 'mock-api/models/mirageTypes'
import { makeUserDetails } from 'utils/userDetails'
import IconBack from 'assets/icons/icon-back2.svg'

type MateElementProps = {
  userData: User
  openUserModal: F1<User>
}

export const MateElement = ({ userData, openUserModal }: MateElementProps) => {
  const { t } = useTranslation('dashboard')
  const theme = useTheme()
  const styles = useStyles()
  const { firstName, lastName, requests, photo } = userData
  const date = userData.isOnHoliday ? requests[0].endDate : requests[0].startDate
  const dateToBeDisplayed = setDateToBeDisplayed(date, userData.isOnHoliday)

  const version: {
    color: 'secondaryOpaque' | 'lightBlue'
    arrow: 'primary' | 'textBlue'
    text: 'backAtWork' | 'lastDayAtWork'
  } = {
    color: userData.isOnHoliday ? 'secondaryOpaque' : 'lightBlue',
    arrow: userData.isOnHoliday ? 'primary' : 'textBlue',
    text: userData.isOnHoliday ? 'backAtWork' : 'lastDayAtWork',
  }

  const handleOnPress = () => openUserModal(userData)

  const isSick = userData.requests[0].isSickTime

  return (
    <BaseOpacity
      backgroundColor={isSick ? 'quarternaryOpaque' : version.color}
      borderRadius="lmin"
      marginVertical="s"
      flexDirection="row"
      alignItems="center"
      height={105}
      onPress={handleOnPress}
      position="relative">
      <Box margin="m">
        <Avatar size="xm" src={photo} userDetails={makeUserDetails(userData)} />
        {userData.isOnHoliday && (
          <OnHolidayTag variant="small" background="secondaryOpaque" isSick={isSick} />
        )}
      </Box>
      <Box marginVertical="s">
        <Text variant="textBoldMD" lineHeight={30}>
          {firstName} {lastName}
        </Text>
        <Text variant="textXS" lineHeight={20} color="darkGrey">
          {t(version.text)}
        </Text>
        <Box flexDirection="row">
          <Text variant="textBoldSM" paddingRight="xs">
            {displayDayShort(dateToBeDisplayed)}
          </Text>
          <Text variant="textSM">{displayWeekday(dateToBeDisplayed)}</Text>
        </Box>
      </Box>
      <Box position="absolute" top={48} right={12} style={styles.arrow}>
        <IconBack
          height={13.4}
          width={13.4}
          color={isSick ? theme.colors.quaternary : theme.colors[version.arrow]}
        />
      </Box>
    </BaseOpacity>
  )
}

const useStyles = mkUseStyles(() => ({
  arrow: {
    transform: [{ rotateX: '180deg' }, { rotateZ: '180deg' }],
  },
}))
