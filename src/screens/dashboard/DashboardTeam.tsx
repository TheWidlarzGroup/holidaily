import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { OtherMateElement } from 'screens/dashboard/components/OtherMateElement'
import { TeamSection } from 'screens/dashboard/components/TeamSection'
import { RequiredMateHolidaysData } from 'types/holidaysDataTypes'
import { TeamHeader } from 'screens/dashboard/components/TeamHeader'

type DashboardTeamProps = DashboardNavigationProps<'DashboardTeam'>

export const DashboardTeam: FC<DashboardTeamProps> = ({ route }) => {
  const { params } = route
  const { t } = useTranslation('dashboard')

  const matesOnHoliday =
    params &&
    (params?.users?.filter((mate) => mate.holidays.isOnHoliday) as RequiredMateHolidaysData[])
  const matesWithPlannedHolidays = params?.users?.filter(
    (mate) => !mate.holidays.isOnHoliday && mate.holidays.dayStart
  ) as RequiredMateHolidaysData[]
  const matesWithNoPlannedHolidays = params?.users?.filter(
    (mate) => !mate.holidays.isOnHoliday && !mate.holidays.dayStart
  )

  return (
    <SafeAreaWrapper isTabNavigation edges={['left', 'right', 'bottom']}>
      <TeamHeader title={params.groupName} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="m" paddingBottom="xxl">
          {matesOnHoliday.length > 0 && <TeamSection matesArray={matesOnHoliday} isOutOfOffice />}
          {matesWithPlannedHolidays.length > 0 && (
            <TeamSection matesArray={matesWithPlannedHolidays} isOutOfOffice={false} />
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
