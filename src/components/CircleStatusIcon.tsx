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
  iconProps?: SvgProps
  source?: string
} & BoxProps<Theme>

type WrappedIconProps = {
  Icon: Svg
  bg: BoxProps<Theme>['bg']
}

export const CircleStatusIcon = ({
  status,
  iconProps,
  source,
  ...styleProps
}: CircleStatusIconProps) => {
  const pendingBgColor = source === 'SEE_REQUEST' ? 'special' : 'primary'
  const WrappedIcon = mkWrappedIcon(styleProps ?? {}, iconProps ?? {})
  switch (status) {
    case 'error':
      return <WrappedIcon Icon={CrossIcon} bg="errorBrighter" />
    case 'success':
      return <WrappedIcon Icon={CheckIcon} bg="approvedGreen" />
    case 'past':
      return <WrappedIcon Icon={ClockIcon} bg="headerGrey" />
    case 'pending':
      return <WrappedIcon Icon={SpinnerIcon} bg={pendingBgColor} />
    default:
      exhaustiveTypeCheck(status, `Unknown status: ${status}`)
      return null
  }
}

const mkWrappedIcon =
  (styleProps: BoxProps<Theme>, customIconProps: SvgProps) =>
  ({ Icon, bg }: WrappedIconProps) => {
    const theme = useTheme()
    const iconStyle: SvgProps['style'] = { maxHeight: '50%' }
    const iconWrapperStyle = {
      ...iconWrapperBaseStyle,
      ...(styleProps ?? {}),
    }
    const iconBaseProps = {
      color: theme.colors.alwaysWhite,
      style: iconStyle,
    }
    const iconProps = {
      ...iconBaseProps,
      ...customIconProps,
    }
    return (
      <Box marginLeft="xm" bg={bg} {...iconWrapperStyle}>
        <Icon {...iconProps} />
      </Box>
    )
  }

const iconWrapperBaseStyle: BoxProps<Theme> = {
  height: 24,
  width: 24,
  aspectRatio: 1,
  borderRadius: 'full',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 'm',
}
