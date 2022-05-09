import React, { useEffect, useState } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { User } from 'mock-api/models/mirageTypes'
import { SwipeableModal } from 'components/SwipeableModal'
import { TeamsModal } from 'screens/welcome/components/TeamsModal'
import { getItem, setItem } from 'utils/localStorage'
import { useBooleanState } from 'hooks/useBooleanState'
import { DashboardTeamMember } from './DashboardTeamMember'
import { SortableTeams } from './components/SortableTeams'

export const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalUser, setModalUser] = useState<User>()
  const openModal = (user: User) => {
    setModalUser(user)
    setIsModalVisible(true)
  }

  const [isSuccessModalVisible, { setFalse: closeSuccessModal, setTrue: openSuccessModal }] =
    useBooleanState(false)
  useEffect(() => {
    const openModalOnFirstAppLaunch = async () => {
      const seenTeamsModal = await getItem('seenTeamsModal')
      if (seenTeamsModal === 'false') return
      setTimeout(async () => {
        openSuccessModal()
        await setItem('seenTeamsModal', 'false')
      }, 2000)
    }
    openModalOnFirstAppLaunch()
  }, [openSuccessModal])
  return (
    <>
      <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
        <DashboardHeader />
        <SortableTeams openUserModal={openModal} />
      </SafeAreaWrapper>
      {modalUser && (
        <SwipeableModal isOpen={isModalVisible} onHide={() => setIsModalVisible(false)}>
          <DashboardTeamMember closeModal={() => setIsModalVisible(false)} user={modalUser} />
        </SwipeableModal>
      )}
      <SwipeableModal isOpen={isSuccessModalVisible} onHide={closeSuccessModal}>
        <TeamsModal closeModal={closeSuccessModal} />
      </SwipeableModal>
    </>
  )
}
