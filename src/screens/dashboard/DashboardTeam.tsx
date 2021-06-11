import React from 'react'
import { Box, Text } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { OtherMateElement } from 'screens/dashboard/components/OtherMateElement'
import { TeamSection } from 'screens/dashboard/components/TeamSection'

export const DashboardTeam = () => {
  const { params } = useRoute<DashboardNavigationProps<'DashboardTeam'>>()
  const { t } = useTranslation('dashboard')

  const matesOnHoliday = params.users.filter(
    (mate) => mate.holidays && mate.holidays.isOnHoliday === true
  )
  const matesWithPlannedHolidays = params.users.filter(
    (mate) => mate.holidays && mate.holidays.isOnHoliday === false
  )
  const matesWithNoPlannedHolidays = params.users.filter(
    (mate) => mate.holidays.isOnHoliday === undefined
  )

  return (
    <SafeAreaWrapper>
      <ScrollView>
        <Box
          paddingVertical="m"
          backgroundColor="disabledText"
          borderBottomRightRadius="lmin"
          borderBottomLeftRadius="lmin">
          <Text variant="header">{params.groupName}</Text>
        </Box>
        <Box marginHorizontal="m" paddingBottom="xxxl">
          {matesOnHoliday.length > 0 && <TeamSection matesArray={matesOnHoliday} isOutOfOffiece />}
          {matesWithPlannedHolidays.length > 0 && (
            <TeamSection matesArray={matesWithPlannedHolidays} isOutOfOffiece={false} />
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
