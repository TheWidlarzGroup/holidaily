import React, { useState } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { TeamElement } from 'screens/dashboard/components/TeamElement'
import { DashboardNavigationType } from 'navigation/types'
import { useNavigation } from '@react-navigation/native'
import { SortableList } from 'screens/dashboard/dragAndDrop/SortableList'
import { Team, User } from 'mock-api/models/mirageTypes'
import { LoadingModal } from 'components/LoadingModal'
import { useUserContext } from 'hooks/useUserContext'
import { SwipeableModal } from 'components/SwipeableModal'
import { useModalContext } from 'contexts/ModalProvider'
import { DashboardTeamMember } from './DashboardTeamMember'

export const Dashboard = () => {
  const { showModal, hideModal } = useModalContext()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const openModal = (user: User) => {
    setIsModalVisible(true)
    showModal(
      <SwipeableModal isOpen={isModalVisible} hide={hideModal}>
        <DashboardTeamMember closeModal={() => setIsModalVisible(false)} user={user} />
      </SwipeableModal>
    )
  }
  const { user } = useUserContext()
  console.log('rerender')
  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToTeamDetails = (team: Team) =>
    navigation.navigate('DashboardTeam', { ...team, openUserModal: openModal })
  if (!user?.teams) return <LoadingModal show />
  return (
    <>
      <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
        <DashboardHeader />
        <SortableList openUserModal={openModal}>
          {(user.teams ?? []).map((team: Team) => (
            <TeamElement
              {...team}
              key={team.name}
              navigateToTeamScreen={() => navigateToTeamDetails(team)}
            />
          ))}
        </SortableList>
      </SafeAreaWrapper>
    </>
  )
}
