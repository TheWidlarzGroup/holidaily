import React, { FC, useMemo, useState } from 'react'
import { Box, Text } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { LayoutChangeEvent, ScrollView } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { OtherMateElement } from 'screens/dashboard/components/OtherMateElement'
import { TeamSection } from 'screens/dashboard/components/TeamSection'
import { TeamHeader } from 'screens/dashboard/components/TeamHeader'
import { sortByEndDate, sortByStartDate } from 'utils/sortByDate'
import { User } from 'mockApi/models'
import { SwipeableModalRegular } from 'components/SwipeableModalRegular'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { Analytics } from 'services/analytics'
import { DashboardTeamMember } from './DashboardTeamMember'

type DashboardTeamProps = DashboardNavigationProps<'DASHBOARD_TEAM'>

export const DashboardTeam: FC<DashboardTeamProps> = ({ route }) => {
  const { params } = route
  const { t } = useTranslation('dashboard')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [teamMemberHeight, setTeamMemberHeight] = useState(0)
  const [modalHeight, setModalHeight] = useState(0)
  const [modalUser, setModalUser] = useState<User>()
  const openModal = (user: User) => {
    setModalUser(user)
    setIsModalVisible(true)
    Analytics().track('DASHBOARD_TEAM_OPENED', { teamName: params.name })
  }
  const { user } = useUserContext()

  const { matesOnHoliday, matesWithPlannedHolidays, mates } = useMemo(() => {
    let mates: User[] = []
    // Comment: Demo user has teams but he is not a member of these teams in UserProvider.
    // So developer has to remember to add him wherever he needs to show him in teams.
    if (params?.users && user) mates = [...params.users, user]
    else if (params?.users) mates = params.users

    let matesOnHoliday = mates.filter((mate) => mate.isOnHoliday)
    matesOnHoliday = matesOnHoliday.filter(
      (user) => user.requests[0].endDate > new Date().toISOString()
    )
    matesOnHoliday.sort(sortByEndDate)

    let matesWithPlannedHolidays = mates.filter(
      (mate) => !mate.isOnHoliday && mate.requests[0]?.startDate
    )
    matesWithPlannedHolidays = matesWithPlannedHolidays.filter(
      (user) => user.requests[0].endDate > new Date().toISOString()
    )
    matesWithPlannedHolidays.sort(sortByStartDate)

    return { matesOnHoliday, matesWithPlannedHolidays, mates }
  }, [params?.users, user])

  const getTeamMemberContainerHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setTeamMemberHeight(height)
  }

  const getModalHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setModalHeight(height)
  }

  return (
    <>
      <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
        <TeamHeader title={params.name} />
        {/* TODO: refactor to use SectionList */}
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Box paddingHorizontal="m" paddingBottom="xxxl">
            {matesOnHoliday.length > 0 && (
              <TeamSection openUserModal={openModal} matesArray={matesOnHoliday} isOutOfOffice />
            )}
            {matesWithPlannedHolidays.length > 0 && (
              <TeamSection
                openUserModal={openModal}
                matesArray={matesWithPlannedHolidays}
                isOutOfOffice={false}
              />
            )}

            <Text variant="lightGreyRegular" color="headerGrey" marginTop="l">
              {t('allTeamMembers').toUpperCase()} ({mates.length})
            </Text>
            <Box flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
              {mates.map((mate) => (
                <OtherMateElement key={mate.id} mate={mate} openUserModal={openModal} />
              ))}
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaWrapper>
      {modalUser && (
        <SwipeableModalRegular
          onLayout={getModalHeight}
          useScrollView={teamMemberHeight > modalHeight}
          hasIndicator
          isOpen={isModalVisible}
          onHide={() => setIsModalVisible(false)}>
          <DashboardTeamMember user={modalUser} onLayout={getTeamMemberContainerHeight} />
        </SwipeableModalRegular>
      )}
    </>
  )
}
