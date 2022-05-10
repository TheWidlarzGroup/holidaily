import React from 'react'
import { Box, Theme, useTheme } from 'utils/theme'

import IconPalm from 'assets/icons/icon-palm.svg'

type OnHolidayTagProps = {
  variant: 'small' | 'large'
  background: 'white' | 'grey' | 'dashboardBackground'
}

export const OnHolidayTag = (p: OnHolidayTagProps) => {
  const theme = useTheme()
  const size = p.variant === 'small' ? 36 : 51
  const styles = {
    width: size,
    height: size,
    borderRadius: size / 2,
    top: -size / 3,
    right: -size / 3,
    borderWidth: 4,
  }
  const iconWidth = p.variant === 'small' ? 17.41 : 29
  const iconHeight = p.variant === 'small' ? 18.01 : 31
  let borderColor: keyof Theme['colors'] = p.background
  if (borderColor === 'grey') borderColor = 'disabledText'
  return (
    <Box
      bg="tertiary"
      borderColor={borderColor}
      alignItems="center"
      position="absolute"
      justifyContent="center"
      style={{ ...styles }}>
      <IconPalm color={theme.colors.alwaysWhite} width={iconWidth} height={iconHeight} />
    </Box>
  )
}
