import React, { useMemo, useState } from 'react'
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
import { SwipeableModalRegular, SwipeableModalRegularProps } from 'components/SwipeableModalRegular'
import { Analytics } from 'services/analytics'
import { SWIPEABLE_MODAL_HEIGHT } from 'components/SwipeableModal'
import { DashboardTeamMember } from './DashboardTeamMember'

type DashboardTeamProps = DashboardNavigationProps<'DASHBOARD_TEAM'>

export const DashboardTeam = ({ route }: DashboardTeamProps) => {
  const { params } = route
  const { t } = useTranslation('dashboard')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalUser, setModalUser] = useState<User>()
  const openModal = (user: User) => {
    setModalUser(user)
    setIsModalVisible(true)
    Analytics().track('DASHBOARD_TEAM_OPENED', { teamName: params.name })
  }

  const { matesOnHoliday, matesWithPlannedHolidays, mates } = useMemo(() => {
    const mates: User[] = params?.users ?? []

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
  }, [params?.users])

  return (
    <>
      <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
        <TeamHeader title={params.name} />
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
