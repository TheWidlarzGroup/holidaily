import React, { useState } from 'react'
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

  const [screenState, setScreenState] = useState('idle')

  useAsyncEffect(async () => {
    const seenTeamsModal = await getItem('seenTeamsModal')
    if (seenTeamsModal === 'true') {
      setScreenState('seen')
      return
    }
    requestAnimationFrame(openSuccessModal)
    setItem('seenTeamsModal', 'true')
  }, [openSuccessModal])

  const handleModalClose = () => {
    closeSuccessModal()
    setScreenState('seen')
  }

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <DashboardHeader />
      {screenState !== 'seen' ? null : <SortableTeams />}
      <SwipeableModalRegular
        hasIndicator
        style={teamsModalStyle}
        isOpen={isSuccessModalVisible}
        onHide={closeSuccessModal}>
        <TeamsModal closeModal={handleModalClose} />
      </SwipeableModalRegular>
    </SafeAreaWrapper>
  )
}

const teamsModalStyle: ModalProps['style'] = {
  margin: 0,
  marginTop: isScreenHeightShort ? 20 : 110,
}
