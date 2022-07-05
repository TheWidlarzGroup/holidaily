import React, { ReactElement } from 'react'
import { Box, Text, Theme, useTheme } from 'utils/theme'
import IconPlane from 'assets/icons/icon-plane.svg'
import IconSuitcase from 'assets/icons/icon-suitcase.svg'
import IconPill from 'assets/icons/icon-pill.svg'
import { HolidayTag } from 'screens/dashboard/components/HolidayTag'
import { Avatar } from 'components/Avatar'
import { TextProps } from '@shopify/restyle'
import { SvgProps } from 'react-native-svg'

export type CarouselElementProps = {
  isOnHoliday: boolean
  firstName: string
  lastName: string
  dayToBeDisplayed: string
  userColor: string
  photo?: string | null
  isSickTime?: boolean
}

type AppearanceKey = 'onDayOffNow' | 'onSicktimeNow' | 'futureDayOff'
type Appearance = {
  textColor: TextProps<Theme>['color']
  icon: ReactElement<SvgProps>
}
const ICON_SIZE = 10

const commonIconProps: SvgProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
  style: { transform: [{ translateY: -2 }] },
}

const mkAppearanceDictionary = (theme: Theme): Readonly<Record<AppearanceKey, Appearance>> => ({
  onDayOffNow: {
    textColor: 'tertiary',
    icon: <IconSuitcase {...commonIconProps} color={theme.colors.tertiary} />,
  },
  onSicktimeNow: {
    textColor: 'quarternary',
    icon: <IconPill {...commonIconProps} color={theme.colors.quarternary} />,
  },
  futureDayOff: {
    textColor: 'textBlue',
    icon: <IconPlane {...commonIconProps} color={theme.colors.textBlue} />,
  },
})

export const CarouselElement = (p: CarouselElementProps) => {
  const theme = useTheme()
  const appearanceDictionary = mkAppearanceDictionary(theme)
  let status: keyof typeof appearanceDictionary
  if (p.isOnHoliday && p.isSickTime) status = 'onSicktimeNow'
  else if (p.isOnHoliday) status = 'onDayOffNow'
  else status = 'futureDayOff'
  const { textColor, icon } = appearanceDictionary[status]

  console.log('here 2')
  return (
    <Box marginBottom="m" alignItems="center" flexGrow={1}>
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
  )
}
