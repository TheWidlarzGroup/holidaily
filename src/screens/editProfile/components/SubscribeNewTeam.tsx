import React, { FC, useState } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { UserProfileNavigationProps } from 'navigation/types'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import { TeamsType } from 'utils/mocks/teamsMocks'
import { useUserDetailsContext } from '../helpers/UserDetailsContext'
import { SearchTeams } from './TeamSubscriptions/SearchTeams'
import { SaveSubscriptions } from './TeamSubscriptions/SaveSubscriptions'

type SubscribeNewTeamProps = UserProfileNavigationProps<'SubscribeTeam'>
type ParsedTeamsType = TeamsType & { isSelected?: boolean }

export const SubscribeNewTeam: FC<SubscribeNewTeamProps> = () => {
  const styles = useStyles()
  const [subscribedTeams, setSubscribedTeams] = useState<ParsedTeamsType[]>([])
  const { userTeams } = useUserDetailsContext()

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
            setSubscribedTeams={setSubscribedTeams}
            subscribedTeams={subscribedTeams}
            userTeams={userTeams}
          />
          <SaveSubscriptions subscribedTeams={subscribedTeams} disabled={!subscribedTeams.length} />
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
