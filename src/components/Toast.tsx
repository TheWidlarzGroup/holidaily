import { BoxProps } from '@shopify/restyle'
import React from 'react'
import { exhaustiveTypeCheck } from 'utils/exhautiveTypeCheck'
import { Box, Text, Theme, useTheme } from 'utils/theme'
import { CircleStatusIcon, IconStatus } from './CircleStatusIcon'

type ToastProps = {
  variant: 'success'
  text: string
} & BoxProps<Theme>

export const Toast = ({ variant, text, ...styleProps }: ToastProps) => {
  const theme = useTheme()
  const containerStyle = {
    position: 'absolute',
    top: 12,
    paddingHorizontal: theme.spacing.m,
    width: '100%',
    zIndex: theme.zIndices['20'],
  } as const
  const iconStatus: IconStatus = variant
  const getVariantStyle = (): BoxProps<Theme> => {
    switch (variant) {
      case 'success': {
        return {
          bg: 'successToastBg',
          borderColor: 'successToastBorder',
          borderWidth: 1,
        }
      }
      default:
        exhaustiveTypeCheck(variant)
        return {}
    }
  }

  return (
    <Box style={containerStyle}>
      <Box
        borderRadius="l1min"
        paddingVertical="ml"
        paddingHorizontal="xm"
        alignItems="center"
        flexDirection="row"
        {...getVariantStyle()}
        {...styleProps}>
        <CircleStatusIcon width={25} status={iconStatus} />
        <Text variant="textSM">{text}</Text>
      </Box>
    </Box>
  )
}
