import React from 'react'
import { Box, Text } from 'utils/theme'
import IconPlane from 'assets/icons/icon-plane.svg'
import IconSuitcase from 'assets/icons/icon-suitcase.svg'
import { OnHolidayTag } from 'screens/dashboard/components/OnHolidayTag'
import { Avatar } from 'components/Avatar'

export type CarouselElementProps = {
  isOnHoliday: boolean
  firstName: string
  lastName: string
  dayToBeDisplayed: string
  userColor: string
  photo?: string | null
}

export const CarouselElement = (p: CarouselElementProps) => (
  <Box marginBottom="m" alignItems="center">
    <Box marginHorizontal="m" marginTop="m" marginBottom="xs">
      <Avatar
        src={p.photo}
        userDetails={{ firstName: p.firstName, lastName: p.lastName, userColor: p.userColor }}
      />
      {p.isOnHoliday && <OnHolidayTag variant="small" background="grey" />}
    </Box>
    <Text variant="lightGreyRegular" color="black" lineHeight={14}>
      {p.firstName}
    </Text>
    <Text variant="lightGreyRegular" color="black" lineHeight={14}>
      {p.lastName}
    </Text>
    <Box flexDirection="row" alignItems="center">
      {p.isOnHoliday ? <IconSuitcase /> : <IconPlane />}
      <Text variant="holidayDate" color={p.isOnHoliday ? 'tertiary' : 'black'}>
        {p.dayToBeDisplayed}
      </Text>
    </Box>
  </Box>
)
