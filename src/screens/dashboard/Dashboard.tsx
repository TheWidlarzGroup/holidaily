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
import { useTeamsContext } from 'hooks/useTeamsContext'
import { LoadingModal } from 'components/LoadingModal'
import { BackHandler } from 'react-native'
import { DashboardTeamMember } from './DashboardTeamMember'

export const Dashboard = () => {
  const [user, setUser] = useState<User>(emptyUser)

  const { teams } = useTeamsContext()

  const modalRef = useRef<BottomSheetModal>(null)
  const openModal = useCallback(() => modalRef.current?.present(), [])
  const closeModal = useCallback(() => modalRef.current?.dismiss(), [])

  useEffect(() => {
    const backAction = () => {
      modalRef.current?.close()
      return true
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => backHandler.remove()
  }, [])

  const openUserModal = (user: User) => {
    setUser(user)
    openModal()
  }

  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToTeamDetails = (team: Team) =>
    navigation.navigate('DashboardTeam', { ...team, openUserModal })

  if (!teams || teams.length < 1) return <LoadingModal show />

  return (
    <>
      <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
        <DashboardHeader />
        <SortableList openUserModal={openUserModal}>
          {teams?.map((team: Team) => (
            <TeamElement
              {...team}
              key={team.name}
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
