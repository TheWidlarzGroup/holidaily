import React, { useEffect } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { TeamsModal } from 'screens/welcome/components/TeamsModal'
import { getItem, setItem } from 'utils/localStorage'
import { SwipeableModal } from 'components/SwipeableModal'
import { useBooleanState } from 'hooks/useBooleanState'
import { SortableTeams } from './components/SortableTeams'

export const Dashboard = () => {
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
        <SortableTeams />
      </SafeAreaWrapper>
      <SwipeableModal isOpen={isSuccessModalVisible} onHide={closeSuccessModal}>
        <TeamsModal closeModal={closeSuccessModal} />
      </SwipeableModal>
    </>
  )
}
