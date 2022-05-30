import React from 'react'
import { BaseOpacity, useTheme } from 'utils/theme'
import IconPlus from 'assets/icons/icon-plus.svg'

type AddMoreProps = {
  onPress?: F0
}

export const AddMore = ({ onPress }: AddMoreProps) => {
  const theme = useTheme()

  return (
    <BaseOpacity
      onPress={onPress}
      flexDirection="row"
      alignSelf="flex-start"
      alignItems="center"
      marginTop="s"
      bg="special"
      padding="xm"
      borderRadius="full">
      <IconPlus color={theme.colors.alwaysWhite} width={14} height={14} />
    </BaseOpacity>
  )
}
