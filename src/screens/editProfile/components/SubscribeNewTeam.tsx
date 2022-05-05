import React, { useMemo, useState } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { UserProfileNavigationProps } from 'navigation/types'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import { ParsedTeamType } from 'utils/mocks/teamsMocks'
import { useUserContext } from 'hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { SearchTeams } from './TeamSubscriptions/SearchTeams'
import { SaveSubscriptions } from './TeamSubscriptions/SaveSubscriptions'

type SubscribeNewTeamProps = UserProfileNavigationProps<'SubscribeTeam'>

export const SubscribeNewTeam = ({ route: { params: p } }: SubscribeNewTeamProps) => {
  const styles = useStyles()
  const [selectedTeams, setSelectedTeams] = useState<ParsedTeamType[]>([])
  const { user } = useUserContext()
  const teams = useMemo(() => {
    if (!user?.teams) return []
    return user.teams.map((t) => ({ teamName: t.name, id: t.id }))
  }, [user?.teams])
  if (!user) return <LoadingModal show />

  return (
    <SafeAreaWrapper>
      <Box flex={1} backgroundColor="modalBackdrop">
        <Box
          flex={1}
          backgroundColor="disabledText"
          marginTop="xm"
          borderTopRightRadius="lmin"
          borderTopLeftRadius="lmin"
          padding="l"
          style={styles.shadow}>
          <SearchTeams
            setSelectedTeams={setSelectedTeams}
            selectedTeams={selectedTeams}
            userTeams={teams}
          />
          <SaveSubscriptions
            setSubscriptions={p.addSubscriptions}
            selectedTeams={selectedTeams}
            disabled={!selectedTeams.length}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: theme.colors.black,
    shadowRadius: 10,
    elevation: 10,
  },
  backBtn: {
    position: 'absolute',
    left: 15,
    top: 17,
    zIndex: theme.zIndices['5'],
  },
}))
