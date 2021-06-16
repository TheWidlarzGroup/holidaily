import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { OtherMateElement } from 'screens/dashboard/components/OtherMateElement'
import { TeamSection } from 'screens/dashboard/components/TeamSection'
import { RequiredMateHolidaysData } from 'types/holidaysDataTypes'

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
    <SafeAreaWrapper isDefaultBgColor>
      <Box backgroundColor="white" flexGrow={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box
            paddingVertical="lplus"
            backgroundColor="disabledText"
            borderBottomRightRadius="lmin"
            borderBottomLeftRadius="lmin">
            <Text variant="header">{params.groupName}</Text>
          </Box>
          <Box paddingHorizontal="m" backgroundColor="white" flexGrow={1} paddingBottom="xxl">
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
      </Box>
    </SafeAreaWrapper>
  )
}
