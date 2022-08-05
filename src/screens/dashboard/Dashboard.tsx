import React from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { TeamsModal } from 'screens/welcome/components/TeamsModal'
import { getItem, setItem } from 'utils/localStorage'
import { isScreenHeightShort } from 'utils/deviceSizes'
import { useBooleanState } from 'hooks/useBooleanState'
import { useAsyncEffect } from 'hooks/useAsyncEffect'
import { ModalProps } from 'react-native-modal'
import { SwipeableModalRegular } from 'components/SwipeableModalRegular'
import { SortableTeams } from './components/SortableTeams'

export const Dashboard = () => {
  const [isSuccessModalVisible, { setFalse: closeSuccessModal, setTrue: openSuccessModal }] =
    useBooleanState(false)

  useAsyncEffect(async () => {
    const seenTeamsModal = await getItem('seenTeamsModal')
    if (seenTeamsModal === 'true') return
    requestAnimationFrame(openSuccessModal)
    setItem('seenTeamsModal', 'true')
  }, [openSuccessModal])

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <DashboardHeader />
      <SortableTeams />
      <SwipeableModalRegular
        hasIndicator
        style={teamsModalStyle}
        isOpen={isSuccessModalVisible}
        onHide={closeSuccessModal}>
        <TeamsModal closeModal={closeSuccessModal} />
      </SwipeableModalRegular>
    </SafeAreaWrapper>
  )
}

const teamsModalStyle: ModalProps['style'] = {
  margin: 0,
  marginTop: isScreenHeightShort ? 20 : 110,
}
