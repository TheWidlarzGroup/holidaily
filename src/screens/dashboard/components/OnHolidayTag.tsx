import React, { FC } from 'react'
import { Box } from 'utils/theme'

import IconPalm from 'assets/icons/icon-palm.svg'

type OnHolidayTagProps = {
  variant: 'small' | 'large'
}

export const OnHolidayTag: FC<OnHolidayTagProps> = ({ variant }) => {
  const size = variant === 'small' ? 36 : 42
  const styles = {
    width: size,
    height: size,
    borderRadius: size / 2,
    top: -size / 3,
    left: -size / 3,
    borderWidth: 4,
  }
  return (
    <Box
      bg="tertiary"
      borderColor="disabledText"
      alignItems="center"
      position="absolute"
      justifyContent="center"
      style={{ ...styles }}>
      <IconPalm />
    </Box>
  )
}
