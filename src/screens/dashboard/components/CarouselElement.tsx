import React from 'react'
import { Box, Text } from 'utils/theme'
import { Image } from 'react-native'
import IconProfile from 'assets/icons/icon-profile.svg'
import IconPlane from 'assets/icons/icon-plane.svg'
import IconSuitcase from 'assets/icons/icon-suitcase.svg'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'

export type CarouselElementProps = {
  isOnHoliday: boolean
  firstName: string
  lastName: string
  dayToBeDisplayed: string
  picture?: string
}

export const CarouselElement = (props: CarouselElementProps) => {
  const { isOnHoliday, firstName, lastName, dayToBeDisplayed, picture } = props

  return (
    <Box marginBottom="m" alignItems="center">
      <Box marginHorizontal="m" marginTop="m" marginBottom="xs">
        {picture ? <Image source={{ uri: picture }} /> : <IconProfile width={62} height={62} />}
        {isOnHoliday && <OnHolidayTag variant="small" background="grey" />}
      </Box>
      <Text variant="lightGreyRegular" color="black" lineHeight={14}>
        {firstName}
      </Text>
      <Text variant="lightGreyRegular" color="black" lineHeight={14}>
        {lastName}
      </Text>
      <Box flexDirection="row" alignItems="center">
        {isOnHoliday ? <IconSuitcase /> : <IconPlane />}
        <Text variant="holidayDate" color={isOnHoliday ? 'tertiary' : 'black'}>
          {dayToBeDisplayed}
        </Text>
      </Box>
    </Box>
  )
}
