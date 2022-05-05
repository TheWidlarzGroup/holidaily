import { useNavigation } from '@react-navigation/native'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { CustomButton } from 'components/CustomButton'
import { LoadingModal } from 'components/LoadingModal'
import { useModalContext } from 'contexts/ModalProvider'
import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import { useUserContext } from 'hooks/useUserContext'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ParsedTeamType } from 'utils/mocks/teamsMocks'
import { Box } from 'utils/theme'

type SaveSubscriptionsProps = {
  disabled?: boolean
  setSubscriptions?: F1<ParsedTeamType[]>
  selectedTeams: ParsedTeamType[]
}

export const SaveSubscriptions = (p: SaveSubscriptionsProps) => {
  const { t } = useTranslation('userProfile')
  const { showModal, hideModal } = useModalContext()
  const { goBack } = useNavigation()
  const { data: organization } = useGetOrganization()
  const { user, updateUser } = useUserContext()
  const submitSubscriptions = () => {
    if (!organization || !user) return
    const teams = organization.teams.filter((orgTeam) =>
      p.selectedTeams.some((selectedTeam) => selectedTeam.teamName === orgTeam.name)
    )
    updateUser({ teams: [...teams, ...user.teams] })
    showModal(
      <ChangesSavedModal
        isVisible
        content={p.selectedTeams.length > 1 ? t('newTeamsConfirmation') : t('newTeamConfirmation')}
        hideModal={hideModal}
      />
    )
    p.setSubscriptions?.(p.selectedTeams)
    goBack()
  }
  if (!user || !organization) return <LoadingModal show />
  return (
    <Box position="absolute" bottom={16} alignSelf="center">
      <CustomButton
        label={t('subscribe')}
        variant="primary"
        onPress={submitSubscriptions}
        width={221}
        height={53}
        disabled={p.disabled}
      />
    </Box>
  )
}
