import React from 'react'
import { BaseOpacity, Box, Theme, useTheme } from 'utils/theme'
import IconEdit from 'assets/icons/icon-edit.svg'
import { BoxProps } from '@shopify/restyle'

export const InputEditIcon = ({
  onPress,
  ...styleProps
}: { onPress: F0 | undefined } & BoxProps<Theme>) => {
  const theme = useTheme()
  return (
    <Box
      position="absolute"
      right={0}
      top={-5}
      backgroundColor="lightGrey"
      borderRadius="full"
      width={49}
      height={49}
      borderWidth={4}
      borderColor="whiteDarken"
      justifyContent="center"
      alignItems="center"
      {...styleProps}>
      <BaseOpacity onPress={() => onPress?.()} activeOpacity={0.2}>
        <IconEdit color={theme.colors.headerGrey} />
      </BaseOpacity>
    </Box>
  )
}
