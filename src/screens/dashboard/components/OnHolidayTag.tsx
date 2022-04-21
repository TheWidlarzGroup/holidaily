import React from 'react'
import { Box, useTheme } from 'utils/theme'

import IconPalm from 'assets/icons/icon-palm.svg'

type OnHolidayTagProps = {
  variant: 'small' | 'large'
  background: 'white' | 'grey'
}

export const OnHolidayTag = (props: OnHolidayTagProps) => {
  const { variant, background } = props
  const theme = useTheme()
  const size = variant === 'small' ? 36 : 51
  const styles = {
    width: size,
    height: size,
    borderRadius: size / 2,
    top: -size / 3,
    left: -size / 3,
    borderWidth: 4,
  }
  const iconWidth = variant === 'small' ? 17.41 : 29
  const iconHeight = variant === 'small' ? 18.01 : 31
  return (
    <Box
      bg="tertiary"
      borderColor={background === 'white' ? 'white' : 'disabledText'}
      alignItems="center"
      position="absolute"
      justifyContent="center"
      style={{ ...styles }}>
      <IconPalm color={theme.colors.black} width={iconWidth} height={iconHeight} />
    </Box>
  )
}
