import React, { ReactElement } from 'react'
import { Box, Text, Theme, theme } from 'utils/theme'
import IconPlane from 'assets/icons/icon-plane.svg'
import IconSuitcase from 'assets/icons/icon-suitcase.svg'
import IconPill from 'assets/icons/icon-pill.svg'
import { HolidayTag } from 'screens/dashboard/components/HolidayTag'
import { Avatar } from 'components/Avatar'

export type CarouselElementProps = {
  isOnHoliday: boolean
  firstName: string
  lastName: string
  dayToBeDisplayed: string
  userColor: string
  photo?: string | null
  isSickTime?: boolean
}

const ICON_SIZE = 10

export const CarouselElement = (p: CarouselElementProps) => {
  let icon: ReactElement = <Box />
  let textColor: keyof Theme['colors'] = 'tertiary'

  switch (true) {
    case p.isOnHoliday && !p.isSickTime:
      textColor = 'tertiary'
      icon = (
        <IconSuitcase
          width={ICON_SIZE}
          height={ICON_SIZE}
          color={theme.colors.tertiary}
          style={{ transform: [{ translateY: -2 }] }}
        />
      )
      break
    case !p.isOnHoliday:
      textColor = 'textBlue'
      icon = (
        <IconPlane
          width={ICON_SIZE}
          height={ICON_SIZE}
          color={theme.colors.textBlue}
          style={{ transform: [{ translateY: -1 }] }}
        />
      )
      break
    case p.isOnHoliday && p.isSickTime:
      textColor = 'quarternary'
      icon = (
        <IconPill
          width={ICON_SIZE}
          height={ICON_SIZE}
          color={theme.colors.quarternary}
          style={{ transform: [{ translateY: -1 }] }}
        />
      )
      break
    default:
      break
  }
  return (
    <Box>
      <Box marginBottom="m" alignItems="center">
        <Box marginHorizontal="m" marginTop="m" marginBottom="xs" height={65} width={62}>
          <Avatar
            size="l"
            src={p.photo}
            userDetails={{ userColor: p.userColor, firstName: p.firstName, lastName: p.lastName }}
          />
          {p.isOnHoliday && (
            <HolidayTag isSick={p.isSickTime} hideBorderColor isBorderBackgroundGrey />
          )}
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
          {icon}
          <Text variant="holidayDate" color={textColor} marginLeft="xs">
            {p.dayToBeDisplayed}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
