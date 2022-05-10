import React from 'react'
import { Box, Text, theme } from 'utils/theme'
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

const ICON_SIZE = 10

export const CarouselElement = (p: CarouselElementProps) => (
  <Box>
    <Box marginBottom="m" alignItems="center">
      <Box marginHorizontal="m" marginTop="m" marginBottom="xs" height={65} width={62}>
        <Avatar
          src={p.photo}
          userDetails={{ userColor: p.userColor, firstName: p.firstName, lastName: p.lastName }}
        />
        {p.isOnHoliday && <OnHolidayTag variant="small" background="dashboardBackground" />}
      </Box>
      <Box width={90} height={26} alignItems="center" justifyContent="center">
        <Text variant="lightGreyRegular" color="black" lineHeight={14}>
          {p.firstName}
        </Text>
        <Text variant="lightGreyRegular" color="black" lineHeight={14}>
          {p.lastName}
        </Text>
      </Box>
      <Box flexDirection="row" alignItems="center" justifyContent="center" width={90} height={20}>
        {p.isOnHoliday ? (
          <IconSuitcase width={ICON_SIZE} height={ICON_SIZE} color={theme.colors.tertiary} />
        ) : (
          <IconPlane width={ICON_SIZE} height={ICON_SIZE} color={theme.colors.textBlue} />
        )}
        <Text variant="holidayDate" color={p.isOnHoliday ? 'tertiary' : 'textBlue'} marginLeft="xs">
          {p.dayToBeDisplayed}
        </Text>
      </Box>
    </Box>
  </Box>
)
