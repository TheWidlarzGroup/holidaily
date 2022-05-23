import React from 'react'
import { Team } from 'mockApi/models'
import { useTheme, BaseOpacity } from 'utils/theme'
import IconAdd from 'assets/icons/icon-add.svg'

type AddSubscriptionsButtonProps = {
  userTeams: Team[]
  onSubscribeTeam: F0
}

export const AddSubscriptionsButton = (p: AddSubscriptionsButtonProps) => {
  const theme = useTheme()
  return (
    <BaseOpacity
      onPress={p.onSubscribeTeam}
      justifyContent="center"
      position="absolute"
      bottom={theme.spacing.xs}
      right={theme.spacing.m}
      alignItems="center"
      height={44}
      width={44}
      borderRadius="full"
      backgroundColor="lightGrey">
      <IconAdd color={theme.colors.headerGrey} />
    </BaseOpacity>
  )
}
