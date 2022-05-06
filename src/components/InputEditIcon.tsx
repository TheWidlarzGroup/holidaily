import React from 'react'
import { BaseOpacity, Box, useTheme } from 'utils/theme'
import IconEdit from 'assets/icons/icon-edit.svg'

export const InputEditIcon = ({ onPress }: { onPress: F0 | undefined }) => {
  const theme = useTheme()
  return (
    <Box
      position="absolute"
      right={0}
      top={16}
      backgroundColor="lightGrey"
      borderRadius="full"
      width={49}
      height={49}
      borderWidth={4}
      borderColor="white"
      justifyContent="center"
      alignItems="center">
      <BaseOpacity onPress={() => onPress?.()} activeOpacity={0.2}>
        <IconEdit color={theme.colors.headerGrey} />
      </BaseOpacity>
    </Box>
  )
}
