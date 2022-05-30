import React from 'react'
import { Box, Theme, useTheme } from 'utils/theme'
import SpinnerIcon from 'assets/icons/icon-spinner.svg'
import CheckIcon from 'assets/icons/icon-check.svg'
import ClockIcon from 'assets/icons/icon-past-request-clock.svg'
import CrossIcon from 'assets/icons/icon-close.svg'
import { BoxProps } from '@shopify/restyle'
import Svg, { SvgProps } from 'react-native-svg'
import { exhaustiveTypeCheck } from 'utils/functions'

export type IconStatus = 'success' | 'error' | 'pending' | 'past'

type CircleStatusIconProps = {
  status: IconStatus
} & BoxProps<Theme>

type WrappedIconProps = {
  Icon: Svg
  bg: BoxProps<Theme>['bg']
}

export const CircleStatusIcon = ({ status, ...styleProps }: CircleStatusIconProps) => {
  const WrappedIcon = mkWrappedIcon(styleProps ?? {})
  switch (status) {
    case 'error':
      return <WrappedIcon Icon={CrossIcon} bg="errorRed" />
    case 'success':
      return <WrappedIcon Icon={CheckIcon} bg="approvedGreen" />
    case 'past':
      return <WrappedIcon Icon={ClockIcon} bg="greyDark" />
    case 'pending':
      return <WrappedIcon Icon={SpinnerIcon} bg="primary" />
    default:
      exhaustiveTypeCheck(status, `Unknown status: ${status}`)
      return null
  }
}

const mkWrappedIcon =
  (styleProps: BoxProps<Theme>) =>
  ({ Icon, bg }: WrappedIconProps) => {
    const theme = useTheme()
    const iconStyle: SvgProps['style'] = { maxHeight: '50%' }
    const iconWrapperStyle = {
      ...iconWrapperBaseStyle,
      ...(styleProps ?? {}),
    }
    const iconProps = {
      color: theme.colors.alwaysWhite,
      style: iconStyle,
    }
    return (
      <Box bg={bg} {...iconWrapperStyle}>
        <Icon {...iconProps} />
      </Box>
    )
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
