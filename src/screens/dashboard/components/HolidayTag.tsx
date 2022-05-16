import React, { ReactElement } from 'react'
import { Box, Theme, useTheme } from 'utils/theme'

import IconPalm from 'assets/icons/icon-palm.svg'
import IconPill from 'assets/icons/icon-pill.svg'
import IconPlane from 'assets/icons/icon-plane.svg'

type HolidayTagProps = {
  isSick?: boolean
  isSoonOnHoliday?: boolean
  hideBorder?: true
  hideBorderColor?: true
  isBorderBackgroundGrey?: true
}

export const HolidayTag = ({
  isSick,
  isSoonOnHoliday,
  hideBorder,
  hideBorderColor,
  isBorderBackgroundGrey,
}: HolidayTagProps) => {
  const theme = useTheme()

  let border: keyof Theme['colors'] = 'white'
  let tagBackground: keyof Theme['colors'] = 'white'
  const borderBackground: keyof Theme['colors'] = isBorderBackgroundGrey
    ? 'dashboardBackground'
    : 'white'
  let icon: ReactElement = <Box />

  switch (true) {
    case !isSick && !isSoonOnHoliday:
      border = 'primaryOpaque'
      tagBackground = 'tertiary'
      icon = <IconPalm color={theme.colors.alwaysWhite} width={PALM_SIZE} height={PALM_SIZE} />
      break
    case isSick:
      border = 'quarternaryOpaque'
      tagBackground = 'quarternary'
      icon = <IconPill color={theme.colors.alwaysWhite} width={PILL_SIZE} height={PILL_SIZE} />
      break
    case isSoonOnHoliday:
      border = 'lightBlue'
      tagBackground = 'textBlue'
      icon = <IconPlane color={theme.colors.alwaysWhite} width={PLANE_SIZE} height={PLANE_SIZE} />
      break
    default:
      break
  }

  return (
    <Box
      backgroundColor={hideBorder ? 'transparent' : borderBackground}
      position="absolute"
      alignItems="center"
      justifyContent="center"
      style={containerStyles}>
      <Box
        backgroundColor={hideBorderColor ? 'transparent' : border}
        alignItems="center"
        justifyContent="center"
        style={borderContainerStyles}>
        <Box bg={tagBackground} alignItems="center" justifyContent="center" style={tagStyles}>
          {icon}
        </Box>
      </Box>
    </Box>
  )
}

const CONTAINER_SIZE = 30
const TAG_SIZE = 24
const PALM_SIZE = 16
const PILL_SIZE = 14
const PLANE_SIZE = 13

const containerStyles = {
  width: CONTAINER_SIZE,
  height: CONTAINER_SIZE,
  borderRadius: CONTAINER_SIZE / 2,
  top: -CONTAINER_SIZE / 5,
  right: -CONTAINER_SIZE / 5,
}
const borderContainerStyles = {
  width: CONTAINER_SIZE,
  height: CONTAINER_SIZE,
  borderRadius: CONTAINER_SIZE / 2,
}
const tagStyles = {
  width: TAG_SIZE,
  height: TAG_SIZE,
  borderRadius: TAG_SIZE / 2,
}
