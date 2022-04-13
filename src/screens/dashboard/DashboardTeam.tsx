import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { OtherMateElement } from 'screens/dashboard/components/OtherMateElement'
import { TeamSection } from 'screens/dashboard/components/TeamSection'
import { TeamHeader } from 'screens/dashboard/components/TeamHeader'
import { sortByEndDate, sortByStartDate } from 'utils/sortByDate'

type DashboardTeamProps = DashboardNavigationProps<'DashboardTeam'>

export const DashboardTeam: FC<DashboardTeamProps> = ({ route }) => {
  const { params } = route
  const { t } = useTranslation('dashboard')

  let matesOnHoliday = params && params?.users?.filter((mate) => mate.isOnHoliday)
  matesOnHoliday = matesOnHoliday.filter(
    (user) => user.requests[0].endDate > new Date().toISOString()
  )
  matesOnHoliday.sort(sortByEndDate)

  let matesWithPlannedHolidays = params?.users?.filter(
    (mate) => !mate.isOnHoliday && mate.requests[0].startDate
  )
  matesWithPlannedHolidays = matesWithPlannedHolidays.filter(
    (user) => user.requests[0].endDate > new Date().toISOString()
  )
  matesWithPlannedHolidays.sort(sortByStartDate)

  const matesWithNoPlannedHolidays = params?.users?.filter(
    (mate) => !mate.isOnHoliday && !mate.requests[0].startDate
  )

  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
      <TeamHeader title={params.name} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="m" paddingBottom="xxl">
          {matesOnHoliday.length > 0 && (
            <TeamSection
              openUserModal={params.openUserModal}
              matesArray={matesOnHoliday}
              isOutOfOffice
            />
          )}
          {matesWithPlannedHolidays.length > 0 && (
            <TeamSection
              openUserModal={params.openUserModal}
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
  )
}
