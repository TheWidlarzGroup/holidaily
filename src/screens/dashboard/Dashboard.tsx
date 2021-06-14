import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { ScrollView } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { USER_GROUPS_DAYS_OFF } from 'screens/dashboard/helpers/temporaryData'
import { ValidationOfGroupDayOff } from 'types/holidaysDataTypes'
import { TeamElement } from 'screens/dashboard/components/TeamElement'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { dataToBeDisplayed, ValidationOfDataToBeDisplayed } from 'screens/dashboard/helpers/helper'
import { useUserContext } from 'hooks/useUserContext'
import { USER_DATA } from 'utils/mocks/userMocks'

export const Dashboard: FC = () => {
  const { t, i18n } = useTranslation('dashboard')
  const { updateUser } = useUserContext()
  const teamsList: ValidationOfGroupDayOff[] = USER_GROUPS_DAYS_OFF
  const companyHolidaysData: ValidationOfDataToBeDisplayed[] = dataToBeDisplayed(i18n.language)

  useEffect(() => {
    updateUser(USER_DATA)
  }, [updateUser])

  return (
    <SafeAreaWrapper isDefaultBgColor>
      <DashboardHeader />
      <ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {companyHolidaysData.map((item) => (
            <CarouselElement
              key={item.id}
              isOnHoliday={item.isOnHoliday}
              firstName={item.user.firstName}
              lastName={item.user.lastName}
              dayToBeDisplayed={item.dayToBeDisplayed}
            />
          ))}
        </ScrollView>
        <Box marginTop="l">
          <Text variant="lightGreyRegular" color="headerGrey" marginHorizontal="m">
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
