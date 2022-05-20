import React, { useEffect } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { TeamsModal } from 'screens/welcome/components/TeamsModal'
import { getItem, setItem } from 'utils/localStorage'
import { isScreenHeightShort } from 'utils/deviceSizes'
import { SwipeableModal } from 'components/SwipeableModal'
import { useBooleanState } from 'hooks/useBooleanState'
import { ModalProps } from 'react-native-modal'
import { sleep } from 'utils/sleep'
import { SwipeableModalRegular } from 'components/SwipeableModalRegular'
import { SubscribeNewTeam } from 'screens/editProfile/components/SubscribeNewTeam'
import { SortableTeams } from './components/SortableTeams'

export const Dashboard = () => {
  const [isSuccessModalVisible, { setFalse: closeSuccessModal, setTrue: openSuccessModal }] =
    useBooleanState(false)
  const [isSubscribeModalVisible, { setFalse: closeSubscribeModal, setTrue: openSubscribeModal }] =
    useBooleanState(false)
  useEffect(() => {
    const openModalOnFirstAppLaunch = async () => {
      const seenTeamsModal = await getItem('seenTeamsModal')
      if (seenTeamsModal === 'false') return
      // Comment: Modal just flickers in instead of sliding from the bottom without sleep. setImmediate doesn't fix the issue.
      await sleep(1)
      openSuccessModal()
      setItem('seenTeamsModal', 'false')
    }
    openModalOnFirstAppLaunch()
  }, [openSuccessModal])

  return (
    <>
      <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
        <DashboardHeader />
        <SortableTeams openModal={openSubscribeModal} />
      </SafeAreaWrapper>
      <SwipeableModal
        style={teamsModalStyle}
        isOpen={isSuccessModalVisible}
        onHide={closeSuccessModal}>
        <TeamsModal closeModal={closeSuccessModal} />
      </SwipeableModal>
      <SwipeableModalRegular
        hasIndicator
        isOpen={isSubscribeModalVisible}
        onHide={closeSubscribeModal}>
        <SubscribeNewTeam closeModal={closeSubscribeModal} />
      </SwipeableModalRegular>
    </>
  )
}

const teamsModalStyle: ModalProps['style'] = {
  margin: 0,
  marginTop: isScreenHeightShort ? 20 : 110,
}
