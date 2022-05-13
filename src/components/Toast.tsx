import { BoxProps } from '@shopify/restyle'
import React from 'react'
import { exhaustiveTypeCheck } from 'utils/functions'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'
import { CircleStatusIcon, IconStatus } from './CircleStatusIcon'

type ToastProps = {
  variant: 'success'
  text: string
} & BoxProps<Theme>

const getVariantStyle = (variant: ToastProps['variant']): BoxProps<Theme> => {
  switch (variant) {
    case 'success': {
      return {
        bg: 'successToastBg',
        borderColor: 'successToastBorder',
        borderWidth: 1,
      }
    }
    default:
      exhaustiveTypeCheck(variant, `Unknown Toast variant: ${variant}`)
      return {}
  }
}
export const Toast = ({ variant, text, ...styleProps }: ToastProps) => {
  const styles = useStyles()
  const iconStatus: IconStatus = variant

  return (
    <Box style={styles.container}>
      <Box
        borderRadius="l1min"
        paddingVertical="ml"
        paddingHorizontal="xm"
        alignItems="center"
        flexDirection="row"
        {...getVariantStyle(variant)}
        {...styleProps}>
        <CircleStatusIcon width={25} status={iconStatus} />
        <Text variant="textSM">{text}</Text>
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  container: {
    position: 'absolute',
    top: 12,
    paddingHorizontal: theme.spacing.m,
    width: '100%',
    zIndex: theme.zIndices['20'],
  },
}))
