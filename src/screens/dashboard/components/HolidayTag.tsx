import React from 'react'
import { Box, Theme, useTheme } from 'utils/theme'

import IconPalm from 'assets/icons/icon-palm.svg'
import IconPill from 'assets/icons/icon-pill.svg'

type HolidayTagProps = {
  isSick?: boolean
  hideBorder?: true
  hideBorderColor?: true
  isBorderBackgroundGrey?: true
}

export const HolidayTag = ({
  isSick,
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

  switch (true) {
    case !isSick:
      border = 'primaryOpaque'
      tagBackground = 'primary'
      break
    case isSick:
      border = 'quarternaryOpaque'
      tagBackground = 'quarternary'
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
          {isSick ? (
            <IconPill color={theme.colors.alwaysWhite} width={PILL_SIZE} height={PILL_SIZE} />
          ) : (
            <IconPalm color={theme.colors.alwaysWhite} width={PALM_SIZE} height={PALM_SIZE} />
          )}
        </Box>
      </Box>
    </Box>
  )
}

const CONTAINER_SIZE = 30
const TAG_SIZE = 24
const PALM_SIZE = 16
const PILL_SIZE = 13.7

const containerStyles = {
  width: CONTAINER_SIZE,
  height: CONTAINER_SIZE,
  borderRadius: CONTAINER_SIZE / 2,
  top: -CONTAINER_SIZE / 3,
  right: -CONTAINER_SIZE / 3,
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
