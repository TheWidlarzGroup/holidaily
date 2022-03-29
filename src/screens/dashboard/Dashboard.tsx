import React, { useCallback, useRef, useState } from 'react'

import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { MateHolidaysData } from 'types/holidaysDataTypes'
import { TeamElement } from 'screens/dashboard/components/TeamElement'
import { DashboardNavigationType } from 'navigation/types'
import { useNavigation } from '@react-navigation/native'
import { SortableList } from 'screens/dashboard/dragAndDrop/SortableList'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Team } from 'mock-api/models/Organization'
import { BottomSheetModalComponent } from 'components/BottomSheetModalComponent'
import { DashboardTeamMember } from './DashboardTeamMember'
import { useGetOrganization } from '../../reactQuery/queries/useOrganizationQuery'

const emptyMateUser = {
  id: '',
  firstName: '',
  lastName: '',
  photo: '',
  occupation: undefined,
  holidays: {
    id: 1,
    isOnHoliday: false,
    dayStart: '',
    dayEnd: '',
    sickLeave: false,
    description: undefined,
  },
}

export const Dashboard = () => {
  const [user, setUser] = useState<MateHolidaysData>(emptyMateUser)

  const modalRef = useRef<BottomSheetModal>(null)
  const openModal = useCallback(() => modalRef.current?.present(), [])
  const closeModal = useCallback(() => modalRef.current?.dismiss(), [])

  const openUserModal = (user: MateHolidaysData) => {
    setUser(user)
    openModal()
  }

  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToTeamDetails = (team: Team) =>
    navigation.navigate('DashboardTeam', { ...team, openUserModal })

  const { data } = useGetOrganization()
  if (!data) return null

  return (
    <>
      <SafeAreaWrapper isDefaultBgColor isTabNavigation edges={['left', 'right', 'bottom']}>
        <DashboardHeader />
        <SortableList openUserModal={openUserModal}>
          {data.teams.map((team: Team) => (
            <TeamElement
              {...team}
              key={team.id}
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
