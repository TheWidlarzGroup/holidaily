import React, { useEffect, useMemo, useState } from 'react'
import { Box, Text } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { LayoutChangeEvent } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { OtherMateElement } from 'screens/dashboard/components/OtherMateElement'
import { TeamSection } from 'screens/dashboard/components/TeamSection'
import { TeamHeader } from 'screens/dashboard/components/TeamHeader'
import { sortByEndDate, sortByStartDate } from 'utils/sortByDate'
import { Team, User } from 'mockApi/models'
import { SwipeableModalRegular, SwipeableModalRegularProps } from 'components/SwipeableModalRegular'
import { Analytics } from 'services/analytics'
import { SWIPEABLE_MODAL_HEIGHT } from 'components/SwipeableModal'
import { GestureRecognizer } from 'utils/GestureRecognizer'
import { useNavigation } from '@react-navigation/native'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { DashboardTeamMember } from './DashboardTeamMember'

type DashboardTeamProps = DashboardNavigationProps<'DASHBOARD_TEAM'>

export const DashboardTeam = ({ route }: DashboardTeamProps) => {
  const { params } = route
  const { t } = useTranslation('dashboard')
  const { goBack } = useNavigation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalUser, setModalUser] = useState<User>()
  const { user } = useUserContext()
  const [team, setTeam] = useState<Team>()

  useEffect(() => {
    // Comment: Demo user has teams but he is not a member of these teams in UserProvider.
    // So developer has to remember to add him wherever he needs to show him in teams.
    const teams: Team[] = (user?.teams ?? []).map((team) => {
      if (user) return { ...team, users: [...team.users, user] }
      return team
    })
    const findTeam = teams.find((team) => team.id === params.teamId)
    if (findTeam) setTeam(findTeam)
  }, [params.teamId, user, user?.teams])

  const openModal = (user: User) => {
    setModalUser(user)
    setIsModalVisible(true)
    Analytics().track('DASHBOARD_TEAM_OPENED', { teamName: team?.name || '' })
  }

  const { matesOnHoliday, matesWithPlannedHolidays, mates } = useMemo(() => {
    let mates: User[] = team?.users ?? []
    mates = mates.map((mate) => ({
      ...mate,
      requests: mate.requests.filter((req) => req.status !== 'past'),
    }))

    const matesOnHoliday = mates.filter((mate) => mate.isOnHoliday)
    matesOnHoliday.sort(sortByEndDate)

    const matesWithPlannedHolidays = mates.filter(
      (mate) => !mate.isOnHoliday && mate.requests[0]?.startDate
    )
    matesWithPlannedHolidays.sort(sortByStartDate)

    return { matesOnHoliday, matesWithPlannedHolidays, mates }
  }, [team?.users])

  if (!team) return null

  return (
    <>
      <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
        <TeamHeader title={team.name} />
        <GestureRecognizer onSwipeRight={goBack} androidOnly>
          <ScrollView showsVerticalScrollIndicator={false}>
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
        </GestureRecognizer>
      </SafeAreaWrapper>
      {modalUser && (
        <TeamMemberModal
          onHide={() => setIsModalVisible(false)}
          isOpen={isModalVisible}
          modalUser={modalUser}
        />
      )}
    </>
  )
}

type TeamMemberProps = Pick<SwipeableModalRegularProps, 'isOpen' | 'onHide'> & { modalUser: User }

export const TeamMemberModal = ({ onHide, isOpen, modalUser }: TeamMemberProps) => {
  const [teamMemberHeight, setTeamMemberHeight] = useState(0)
  const getTeamMemberContainerHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    requestAnimationFrame(() => setTeamMemberHeight(height))
  }

  return (
    <SwipeableModalRegular
      useScrollView={teamMemberHeight > SWIPEABLE_MODAL_HEIGHT}
      hasIndicator
      isOpen={isOpen}
      onHide={onHide}
      addTopOffset>
      <DashboardTeamMember user={modalUser} onLayout={getTeamMemberContainerHeight} />
    </SwipeableModalRegular>
  )
}
