import React, { useMemo, useState } from 'react'
import { ParsedTeamType } from 'utils/mocks/teamsMocks'
import { useUserContext } from 'hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { SaveSubscriptions } from './TeamSubscriptions/SaveSubscriptions'
import { SearchTeams } from './TeamSubscriptions/SearchTeams'

type SubscribeNewTeamProps = { closeModal: F0 }

export const SubscribeNewTeam = ({ closeModal }: SubscribeNewTeamProps) => {
  const { t } = useTranslation('userProfile')
  const [selectedTeams, setSelectedTeams] = useState<ParsedTeamType[]>([])
  const { user } = useUserContext()
  const teams = useMemo(() => {
    if (!user?.teams) return []
    return user.teams.map((t) => ({ teamName: t.name, id: t.id }))
  }, [user?.teams])
  if (!user) return <LoadingModal show />

  return (
    <Box>
      <Text variant="displayBoldSM">{t('joinTeams')}</Text>
      <SearchTeams
        setSelectedTeams={setSelectedTeams}
        selectedTeams={selectedTeams}
        userTeams={teams}
      />
      <SaveSubscriptions
        selectedTeams={selectedTeams}
        disabled={!selectedTeams.length}
        closeModal={closeModal}
      />
    </Box>
  )
}
