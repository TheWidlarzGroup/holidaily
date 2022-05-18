import React, { useEffect } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { TeamsModal } from 'screens/welcome/components/TeamsModal'
import { getItem, setItem } from 'utils/localStorage'
import { isScreenHeightShort } from 'utils/deviceSizes'
import { SwipeableModal } from 'components/SwipeableModal'
import { useBooleanState } from 'hooks/useBooleanState'
import { SortableTeams } from './components/SortableTeams'

export const Dashboard = () => {
  const [isSuccessModalVisible, { setFalse: closeSuccessModal, setTrue: openSuccessModal }] =
    useBooleanState(false)
  useEffect(() => {
    let timeout: number
    const openModalOnFirstAppLaunch = async () => {
      const seenTeamsModal = await getItem('seenTeamsModal')
      if (seenTeamsModal === 'false') return
      // Comment: Modal just flickers in instead of sliding from the bottom without setTimeout. setImmediate doesn't fix the issue.
      timeout = setTimeout(() => {
        openSuccessModal()
        setItem('seenTeamsModal', 'false')
      }, 1)
    }
    openModalOnFirstAppLaunch()
    return () => clearTimeout(timeout)
  }, [openSuccessModal])

  return (
    <>
      <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
        <DashboardHeader />
        <SortableTeams />
      </SafeAreaWrapper>
      <SwipeableModal
        style={teamsModalStyle}
        isOpen={isSuccessModalVisible}
        onHide={closeSuccessModal}>
        <TeamsModal closeModal={closeSuccessModal} />
      </SwipeableModal>
    </>
  )
}

const teamsModalStyle = {
  margin: 0,
  marginTop: isScreenHeightShort ? 20 : 110,
}
