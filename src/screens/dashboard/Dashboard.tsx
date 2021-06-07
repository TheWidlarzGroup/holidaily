import React, { FC } from 'react'
import { Box, Text, theme } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { useTranslation } from 'react-i18next'
import { DashboardCarousel } from 'screens/dashboard/components/DashboardCarousel'
import { ValidationOfGroupDayOff, userGroupsDaysOff } from 'screens/dashboard/temporaryData'
import IconPalm from 'assets/icons/icon-palm.svg'
import IconProfile from 'assets/icons/icon-profile.svg'
import { StyleSheet, ScrollView } from 'react-native'
import { colors } from 'utils/theme/colors'

export const Dashboard: FC = () => {
  const { t } = useTranslation(['dashboard'])
  const teamsList: ValidationOfGroupDayOff[] = userGroupsDaysOff
  return (
    <SafeAreaWrapper isDefaultBgColor>
      <DashboardHeader />
      <ScrollView>
        <DashboardCarousel />
        <Box style={{ marginTop: theme.spacing.l }}>
          <Text variant="header" style={{ marginHorizontal: theme.spacing.m }}>
            {t('teamsList').toUpperCase()}
          </Text>
          <Box style={styles.teamsComtainer}>
            {teamsList.map((team) => (
              <Box key={team.groupId} style={styles.teamComtainer}>
                <Box style={styles.teamHeader}>
                  <Text variant="label1">{team.groupName}</Text>
                  <Box style={styles.counter}>
                    <IconPalm width={16} height={16} />
                    <Text variant="label1" style={{ marginLeft: theme.spacing.xs }}>
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
                <Box style={styles.members}>
                  <IconProfile />
                  <IconProfile />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaWrapper>
  )
}

const styles = StyleSheet.create({
  teamsComtainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: theme.spacing.s,
  },
  teamComtainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    flexBasis: '48%',
    marginBottom: theme.spacing.xm,
    padding: theme.spacing.s,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  members: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.xm,
  },
})
