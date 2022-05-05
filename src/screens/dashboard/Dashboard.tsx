import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { User } from 'mock-api/models/mirageTypes'
import { LoadingModal } from 'components/LoadingModal'
import { useUserContext } from 'hooks/useUserContext'
import { SwipeableModal } from 'components/SwipeableModal'
import { TeamsModal } from 'screens/welcome/components/TeamsModal'
import { BottomSheetModalComponent } from 'components/BottomSheetModalComponent'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { getItem, setItem } from 'utils/localStorage'
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
  const organizationModalRef = useRef<BottomSheetModal>(null)
  const openOrganizationModal = useCallback(() => organizationModalRef.current?.present(), [])
  const closeOrganizationModal = useCallback(() => organizationModalRef.current?.dismiss(), [])

  useEffect(() => {
    const openModalOnFirstAppLaunch = async () => {
      const seenTeamsModal = await getItem('seenTeamsModal')
      if (seenTeamsModal === 'false') return
      setTimeout(async () => {
        openOrganizationModal()
        await setItem('seenTeamsModal', 'false')
      }, 2000)
    }
    openModalOnFirstAppLaunch()
  }, [openOrganizationModal])

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
      <BottomSheetModalComponent snapPoints={['90%']} modalRef={organizationModalRef}>
        <TeamsModal closeModal={closeOrganizationModal} />
      </BottomSheetModalComponent>
    </>
  )
}
