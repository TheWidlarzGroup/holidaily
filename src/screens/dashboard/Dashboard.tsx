import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { ScrollView } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { DashboardCarousel } from 'screens/dashboard/components/DashboardCarousel'
import { ValidationOfGroupDayOff, USER_GROUPS_DAYS_OFF } from 'screens/dashboard/temporaryData'
import { TeamElement } from 'screens/dashboard/components/TeamElement'

export const Dashboard: FC = () => {
  const { t } = useTranslation('dashboard')
  const teamsList: ValidationOfGroupDayOff[] = USER_GROUPS_DAYS_OFF

  return (
    <SafeAreaWrapper isDefaultBgColor>
      <DashboardHeader />
      <ScrollView>
        <DashboardCarousel />
        <Box marginTop="l">
          <Text variant="header" marginHorizontal="m">
            {t('teamsList').toUpperCase()}
          </Text>
          <Box m="s" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            {teamsList.map((team) => (
              <TeamElement {...team} key={team.groupId} />
            ))}
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaWrapper>
  )
}
