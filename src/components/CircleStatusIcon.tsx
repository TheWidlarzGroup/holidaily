import React from 'react'
import { Box, Theme, useTheme } from 'utils/theme'
import SpinnerIcon from 'assets/icons/icon-spinner.svg'
import CheckIcon from 'assets/icons/icon-check.svg'
import ClockIcon from 'assets/icons/icon-past-request-clock.svg'
import CrossIcon from 'assets/icons/icon-close.svg'
import { BoxProps } from '@shopify/restyle'
import { SvgProps } from 'react-native-svg'
import { exhaustiveTypeCheck } from 'utils/functions'

export type IconStatus = 'success' | 'error' | 'pending' | 'past'

type CircleStatusIconProps = {
  status: IconStatus
} & BoxProps<Theme>

export const CircleStatusIcon = ({ status, ...styleProps }: CircleStatusIconProps) => {
  const theme = useTheme()
  const iconWrapperStyle = {
    ...iconWrapperBaseStyle,
    ...styleProps,
  }
  const iconStyle: SvgProps['style'] = { maxHeight: '60%' }
  const iconProps = {
    color: theme.colors.alwaysWhite,
    style: iconStyle,
  }
  switch (status) {
    case 'error':
      return (
        <Box {...iconWrapperStyle} bg="errorRed">
          <CrossIcon {...iconProps} />
        </Box>
      )
    case 'success':
      return (
        <Box {...iconWrapperStyle} bg="approvedGreen">
          <CheckIcon {...iconProps} />
        </Box>
      )
    case 'past':
      return (
        <Box {...iconWrapperStyle} bg="greyDark">
          <ClockIcon {...iconProps} />
        </Box>
      )
    case 'pending':
      return (
        <Box {...iconWrapperStyle} bg="primary">
          <SpinnerIcon {...iconProps} />
        </Box>
      )
    default:
      exhaustiveTypeCheck(status, `Unknown status: ${status}`)
      return null
  }
}

const iconWrapperBaseStyle: BoxProps<Theme> = {
  height: 36,
  width: 36,
  aspectRatio: 1,
  borderRadius: 'full',
  bg: 'primary',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 'm',
}
