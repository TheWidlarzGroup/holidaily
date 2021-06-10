import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { MateElement } from './components/MateElement'
import { OtherMateElement } from 'screens/dashboard/components/OtherMateElement'

export const DashboardTeam: FC = () => {
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
          paddingVertical="xl"
          backgroundColor="disabledText"
          borderBottomRightRadius="lmin"
          borderBottomLeftRadius="lmin">
          <Text variant="header">{params.groupName}</Text>
        </Box>
        <Box marginHorizontal="m" paddingBottom="xxxl">
          <Text variant="lightGreyRegular" color="tertiary" marginTop="l">
            {t('outOfWorkNow').toUpperCase()}
          </Text>
          {matesOnHoliday.map((mate) => (
            <MateElement key={mate.id} {...mate} />
          ))}
          <Text variant="lightGreyRegular" color="headerGrey" marginTop="l">
            {t('outOfWorkSoon').toUpperCase()}
          </Text>
          {matesWithPlannedHolidays.map((mate) => (
            <MateElement key={mate.id} {...mate} />
          ))}
          <Text variant="lightGreyRegular" color="headerGrey" marginTop="l">
            {t('othersTeamMembers').toUpperCase()}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {matesWithNoPlannedHolidays.map((mate) => (
              <OtherMateElement key={mate.id} {...mate} />
            ))}
          </ScrollView>
        </Box>
      </ScrollView>
    </SafeAreaWrapper>
  )
}
