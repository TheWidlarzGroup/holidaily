import React from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import IconProfile from 'assets/icons/icon-profile.svg'
import { RequiredUserDetails } from 'types/holidaysDataTypes'
import { displayWeekday, displayDayShort, setDateToBeDisplayed } from 'utils/functions'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { TouchableOpacity } from 'react-native-gesture-handler'

type MateElementProps = RequiredUserDetails & {
  navigateToMateScreen: () => void
}

export const MateElement = (props: MateElementProps) => {
  const { t, i18n } = useTranslation('dashboard')
  const { firstName, lastName, holidays, navigateToMateScreen } = props
  const date = holidays.isOnHoliday ? holidays.dayStart : holidays.dayEnd
  const dateToBeDisplayed = setDateToBeDisplayed(date, holidays.isOnHoliday)

  const version = holidays.isOnHoliday
    ? {
        color: 'tertiary',
        text: 'backAtWork',
      }
    : {
        color: 'greyDark',
        text: 'lastDayAtWork',
      }

  return (
    <Box backgroundColor="disabledText" borderRadius="lmin" marginVertical="s">
      <TouchableOpacity onPress={navigateToMateScreen}>
        <Box flexDirection="row" alignItems="center">
          <Box margin="m">
            <IconProfile width={62} height={62} />
            {holidays.isOnHoliday && <OnHolidayTag variant="small" />}
          </Box>
          <Box marginVertical="s">
            <Box flexDirection="row" marginBottom="s">
              <Text variant="alreadyRegistered" color="black" style={{ lineHeight: 20 }}>
                {firstName}
              </Text>
              <Text
                marginLeft="xs"
                variant="alreadyRegistered"
                color="black"
                style={{ lineHeight: 20 }}>
                {lastName}
              </Text>
            </Box>
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
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
