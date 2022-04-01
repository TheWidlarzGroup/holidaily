import React, { useCallback, useEffect, useRef, useState } from 'react'

import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { TeamElement } from 'screens/dashboard/components/TeamElement'
import { DashboardNavigationType } from 'navigation/types'
import { useNavigation } from '@react-navigation/native'
import { SortableList } from 'screens/dashboard/dragAndDrop/SortableList'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Team, User } from 'mock-api/models/mirageTypes'
import { BottomSheetModalComponent } from 'components/BottomSheetModalComponent'
import { emptyUser } from 'contexts/UserProvider'
import { useTeamsContext } from 'hooks/usePostsContext'
import { LoadingModal } from 'components/LoadingModal'
import { DashboardTeamMember } from './DashboardTeamMember'
import { useGetOrganization } from '../../data-access/queries/useOrganizationData'

export const Dashboard = () => {
  const [user, setUser] = useState<User>(emptyUser)

  const { data } = useGetOrganization()
  const { teams, updateTeams } = useTeamsContext()

  useEffect(() => {
    if (data) {
      updateTeams(data.teams)
    }
  }, [data, updateTeams])

  const modalRef = useRef<BottomSheetModal>(null)
  const openModal = useCallback(() => modalRef.current?.present(), [])
  const closeModal = useCallback(() => modalRef.current?.dismiss(), [])

  const openUserModal = (user: User) => {
    setUser(user)
    openModal()
  }

  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToTeamDetails = (team: Team) =>
    navigation.navigate('DashboardTeam', { ...team, openUserModal })

  if (!teams) return <LoadingModal show />

  return (
    <>
      <SafeAreaWrapper isDefaultBgColor isTabNavigation edges={['left', 'right', 'bottom']}>
        <DashboardHeader />
        <SortableList openUserModal={openUserModal}>
          {teams?.map((team: Team) => (
            <TeamElement
              {...team}
              key={team.id}
              navigateToTeamScreen={() => navigateToTeamDetails(team)}
            />
          ))}
        </SortableList>
      </SafeAreaWrapper>
      <BottomSheetModalComponent snapPoints={['90%']} modalRef={modalRef}>
        <DashboardTeamMember closeModal={closeModal} user={user} />
      </BottomSheetModalComponent>
    </>
  )
}
