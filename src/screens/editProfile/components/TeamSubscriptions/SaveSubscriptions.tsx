import { useNavigation } from '@react-navigation/native'
import { CustomButton } from 'components/CustomButton'
import { LoadingModal } from 'components/LoadingModal'
import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import { useUserContext } from 'hooks/useUserContext'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ParsedTeamType } from 'utils/mocks/teamsMocks'
import { Box } from 'utils/theme'

type SaveSubscriptionsProps = {
  disabled?: boolean
  selectedTeams: ParsedTeamType[]
}

export const SaveSubscriptions = (p: SaveSubscriptionsProps) => {
  const { t } = useTranslation('userProfile')
  const { goBack } = useNavigation()
  const { data: organization } = useGetOrganization()
  const { user, updateUser } = useUserContext()
  const submitSubscriptions = () => {
    if (!organization || !user) return
    const teams = organization.teams.filter((orgTeam) =>
      p.selectedTeams.some((selectedTeam) => selectedTeam.teamName === orgTeam.name)
    )
    updateUser({ teams: [...teams, ...user.teams] })
    goBack()
  }
  if (!user || !organization) return <LoadingModal show />
  return (
    <Box position="absolute" bottom={16} alignSelf="center">
      <CustomButton
        label={t('join')}
        variant="primary"
        onPress={submitSubscriptions}
        disabled={p.disabled}
      />
    </Box>
  )
}
