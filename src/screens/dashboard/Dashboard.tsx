import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { ScrollView } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { DashboardCarousel } from 'screens/dashboard/components/DashboardCarousel'
import { ValidationOfGroupDayOff, USER_GROUPS_DAYS_OFF } from 'screens/dashboard/temporaryData'
import IconPalm from 'assets/icons/icon-palm.svg'
import IconProfile from 'assets/icons/icon-profile.svg'

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
              <Box
                key={team.groupId}
                bg="white"
                borderRadius="m"
                marginBottom="xm"
                padding="s"
                flexBasis="48%">
                <Box flexDirection="row" justifyContent="space-between">
                  <Text variant="label1">{team.groupName}</Text>
                  <Box flexDirection="row" alignItems="center">
                    <IconPalm width={16} height={16} />
                    <Text variant="label1" marginLeft="s">
                      {team.users.reduce(
                        (acc, curr) =>
                          !curr.holidays || (curr.holidays && !curr.holidays.isOnHoliday)
                            ? acc
                            : acc + 1,
                        0
                      )}
                    </Text>
                  </Box>
                </Box>
                <Box marginTop="xm" flexDirection="row" justifyContent="space-around">
                  <IconProfile width={62} height={62} />
                  <IconProfile width={62} height={62} />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaWrapper>
  )
}
