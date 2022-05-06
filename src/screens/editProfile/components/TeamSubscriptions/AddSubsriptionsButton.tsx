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
      style={p.userTeams.length > 0 ? { right: 24 } : { left: 30 }}
      onPress={p.onSubscribeTeam}
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top={32}
      height={44}
      width={44}
      borderRadius="full"
      backgroundColor="lightGrey">
      <IconAdd color={theme.colors.headerGrey} />
    </BaseOpacity>
  )
}
