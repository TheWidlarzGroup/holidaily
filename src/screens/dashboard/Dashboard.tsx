import React, { useCallback, useEffect, useRef } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { TeamsModal } from 'screens/welcome/components/TeamsModal'
import { BottomSheetModalComponent } from 'components/BottomSheetModalComponent'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { getItem, setItem } from 'utils/localStorage'
import { SortableTeams } from './components/SortableTeams'

export const Dashboard = () => {
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
  return (
    <>
      <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
        <DashboardHeader />
        <SortableTeams />
      </SafeAreaWrapper>

      <BottomSheetModalComponent snapPoints={['90%']} modalRef={organizationModalRef}>
        <TeamsModal closeModal={closeOrganizationModal} />
      </BottomSheetModalComponent>
    </>
  )
}
