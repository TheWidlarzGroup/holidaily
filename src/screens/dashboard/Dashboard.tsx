import React, { useCallback, useRef, useState } from 'react'

import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { USER_GROUPS_DAYS_OFF } from 'screens/dashboard/helpers/temporaryData'
import { ValidationOfGroupDayOff, MateHolidaysData } from 'types/holidaysDataTypes'
import { TeamElement } from 'screens/dashboard/components/TeamElement'
import { DashboardNavigationType } from 'navigation/types'
import { useNavigation } from '@react-navigation/native'
import { SortableList } from 'screens/dashboard/dragAndDrop/SortableList'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { BottomSheetModalComponent } from 'components/BottomSheetModalComponent'
import { DashboardTeamMember } from './DashboardTeamMember'

export const Dashboard = () => {
  const teamsList: ValidationOfGroupDayOff[] = USER_GROUPS_DAYS_OFF

  const [user, setUser] = useState<MateHolidaysData>({} as MateHolidaysData)

  const modalRef = useRef<BottomSheetModal>(null)
  const openModal = useCallback(() => modalRef.current?.present(), [])
  const closeModal = useCallback(() => modalRef.current?.dismiss(), [])

  const openUserModal = (user: MateHolidaysData) => {
    openModal()
    setUser(user)
  }

  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToTeamDetails = (team: ValidationOfGroupDayOff) =>
    navigation.navigate('DashboardTeam', { ...team, openUserModal })

  return (
    <>
      <SafeAreaWrapper isDefaultBgColor isTabNavigation edges={['left', 'right', 'bottom']}>
        <DashboardHeader />
        <SortableList openUserModal={openUserModal}>
          {teamsList.map((team) => (
            <TeamElement
              {...team}
              key={team.groupId}
              navigateToTeamScreen={() => navigateToTeamDetails(team)}
            />
          ))}
        </SortableList>
      </SafeAreaWrapper>
      <BottomSheetModalComponent snapPoints={['90%']} modalRef={modalRef}>
        <DashboardTeamMember closeModal={closeModal} user={user} />
      </BottomSheetModalComponent>
    </>
  )
}
