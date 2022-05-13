import React, { FC, useMemo, useState } from 'react'
import { Box, Text } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { OtherMateElement } from 'screens/dashboard/components/OtherMateElement'
import { TeamSection } from 'screens/dashboard/components/TeamSection'
import { TeamHeader } from 'screens/dashboard/components/TeamHeader'
import { sortByEndDate, sortByStartDate } from 'utils/sortByDate'
import { User } from 'mockApi/models'
import { SwipeableModal } from 'components/SwipeableModal'
import { useUserContext } from 'hooks/useUserContext'
import { DashboardTeamMember } from './DashboardTeamMember'

type DashboardTeamProps = DashboardNavigationProps<'DashboardTeam'>

export const DashboardTeam: FC<DashboardTeamProps> = ({ route }) => {
  const { params } = route
  const { t } = useTranslation('dashboard')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalUser, setModalUser] = useState<User>()
  const openModal = (user: User) => {
    setModalUser(user)
    setIsModalVisible(true)
  }
  const { user } = useUserContext()

  const { matesOnHoliday, matesWithPlannedHolidays, matesWithNoPlannedHolidays } = useMemo(() => {
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
      (mate) => !mate.isOnHoliday && mate.requests[0].startDate
    )
    matesWithPlannedHolidays = matesWithPlannedHolidays.filter(
      (user) => user.requests[0].endDate > new Date().toISOString()
    )
    matesWithPlannedHolidays.sort(sortByStartDate)

    const matesWithNoPlannedHolidays = mates.filter(
      (mate) => !mate.isOnHoliday && !mate.requests[0].startDate
    )
    return { matesOnHoliday, matesWithPlannedHolidays, matesWithNoPlannedHolidays }
  }, [params?.users, user])

  return (
    <>
      <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
        <TeamHeader title={params.name} />
        {/* TODO: refactor to use SectionList */}
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
            {matesWithNoPlannedHolidays.length > 0 && (
              <>
                <Text variant="lightGreyRegular" color="headerGrey" marginTop="l">
                  {t('othersTeamMembers').toUpperCase()}
                </Text>
                <Box flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
                  {matesWithNoPlannedHolidays.map((mate) => (
                    <OtherMateElement key={mate.id} {...mate} />
                  ))}
                </Box>
              </>
            )}
          </Box>
        </ScrollView>
      </SafeAreaWrapper>
      {modalUser && (
        <SwipeableModal isOpen={isModalVisible} onHide={() => setIsModalVisible(false)}>
          <DashboardTeamMember closeModal={() => setIsModalVisible(false)} user={modalUser} />
        </SwipeableModal>
      )}
    </>
  )
}
