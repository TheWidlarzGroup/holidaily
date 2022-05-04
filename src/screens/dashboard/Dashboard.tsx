import React, { useState } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { User } from 'mock-api/models/mirageTypes'
import { LoadingModal } from 'components/LoadingModal'
import { useUserContext } from 'hooks/useUserContext'
import { SwipeableModal } from 'components/SwipeableModal'
import { DashboardTeamMember } from './DashboardTeamMember'
import { SortableTeams } from './components/SortableTeams'

export const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [modalUser, setModalUser] = useState<User>()
  const openModal = (user: User) => {
    setModalUser(user)
    setIsModalVisible(true)
  }
  const { user } = useUserContext()

  if (!user?.teams) return <LoadingModal show />
  return (
    <>
      <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
        <DashboardHeader />
        <SortableTeams openUserModal={openModal} teams={user.teams} />
      </SafeAreaWrapper>
      {modalUser && (
        <SwipeableModal isOpen={isModalVisible} onHide={() => setIsModalVisible(false)}>
          <DashboardTeamMember closeModal={() => setIsModalVisible(false)} user={modalUser} />
        </SwipeableModal>
      )}
    </>
  )
}
