import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { TouchableOpacity } from 'react-native'
import IconPlus from 'assets/icons/icon-plus-small.svg'
import { useUserContext } from 'hooks/useUserContext'
import { TeamsType } from 'utils/mocks/teamsMocks'
import { UserProfileType } from 'navigation/types'

export const JoinFirstTeam = () => {
  const { t } = useTranslation('dashboard')
  const { navigate } = useNavigation<UserProfileType<'EditProfile'>>()
  const { user } = useUserContext()
  const [teams, setTeams] = useState<TeamsType[]>(
    user?.teams.map((t) => ({ teamName: t.name, id: t.id })) ?? []
  )
  const addTeams = (newTeams: TeamsType[]) => setTeams([...teams, ...newTeams])

  const onSubscribeTeam = () =>
    navigate('ProfileNavigation', {
      screen: 'SubscribeTeam',
      params: {
        userTeams: teams,
        addSubscriptions: (teams) => {
          addTeams(teams)
        },
      },
    })

  return (
    <Box
      margin="xm"
      backgroundColor="specialBrighterOpaque"
      borderRadius="lmin"
      padding="m"
      flexDirection="row"
      justifyContent="space-between">
      <Text variant="textBoldSM" marginRight="l" lineHeight={20}>
        {t('joinFirstTeam')}
      </Text>
      <TouchableOpacity onPress={onSubscribeTeam}>
        <Box
          width={40}
          height={40}
          backgroundColor="special"
          borderRadius="l"
          justifyContent="center"
          alignItems="center">
          <IconPlus />
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
