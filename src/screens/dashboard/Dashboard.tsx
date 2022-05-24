import React, { useCallback, useEffect } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { TeamsModal } from 'screens/welcome/components/TeamsModal'
import { getItem, setItem } from 'utils/localStorage'
import { isScreenHeightShort } from 'utils/deviceSizes'
import { useBooleanState } from 'hooks/useBooleanState'
import { ModalProps } from 'react-native-modal'
import { sleep } from 'utils/sleep'
import { SwipeableModalRegular } from 'components/SwipeableModalRegular'
import { useFocusEffect } from '@react-navigation/native'
import { Analytics } from 'services/analytics'
import { SortableTeams } from './components/SortableTeams'

export const Dashboard = () => {
  const [isSuccessModalVisible, { setFalse: closeSuccessModal, setTrue: openSuccessModal }] =
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

  useFocusEffect(useCallback(() => () => Analytics().track('DASHBOARD_VIEWED'), []))

  return (
    <>
      <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
        <DashboardHeader />
        <SortableTeams />
      </SafeAreaWrapper>
      <SwipeableModalRegular
        hasIndicator
        style={teamsModalStyle}
        isOpen={isSuccessModalVisible}
        onHide={closeSuccessModal}>
        <TeamsModal closeModal={closeSuccessModal} />
      </SwipeableModalRegular>
    </>
  )
}

const teamsModalStyle: ModalProps['style'] = {
  margin: 0,
  marginTop: isScreenHeightShort ? 20 : 110,
}
