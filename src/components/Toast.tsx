import { BoxProps } from '@shopify/restyle'
import React from 'react'
import { exhaustiveTypeCheck } from 'utils/exhautiveTypeCheck'
import { Box, Theme } from 'utils/theme'

type ToastProps = {
  variant: 'success'
  text: 'string'
} & BoxProps<Theme>

export const Toast = ({ variant, text, ...styleProps }: ToastProps) => {
  const getStyle = (): BoxProps<Theme> => {
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

  return <Box {...getStyle()} {...styleProps}></Box>
}
