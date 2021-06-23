import React, { useState } from 'react'

import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { USER_GROUPS_DAYS_OFF } from 'screens/dashboard/helpers/temporaryData'
import { ValidationOfGroupDayOff } from 'types/holidaysDataTypes'
import { TeamElement } from 'screens/dashboard/components/TeamElement'
import { DashboardNavigationType } from 'navigation/types'
import { useNavigation } from '@react-navigation/native'
import { SortableList } from 'screens/dashboard/dragAndDrop/SortableList'

export const Dashboard = () => {
  const [sortable, setSortable] = useState(false)

  const teamsList: ValidationOfGroupDayOff[] = USER_GROUPS_DAYS_OFF

  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToTeamDetails = (team: ValidationOfGroupDayOff) =>
    navigation.navigate('DashboardTeam', { ...team })

  return (
    <SafeAreaWrapper isDefaultBgColor isTabNavigation edges={['left', 'right', 'bottom']}>
      <DashboardHeader />
      <SortableList editing={sortable} onDragEnd={() => setSortable(false)}>
        {teamsList.map((team) => (
          <TeamElement
            {...team}
            key={team.groupId}
            onLongPress={() => setSortable(true)}
            navigateToTeamScreen={() => navigateToTeamDetails(team)}
          />
        ))}
      </SortableList>
    </SafeAreaWrapper>
  )
}
