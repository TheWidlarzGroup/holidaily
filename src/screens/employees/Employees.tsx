import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationType } from 'navigation/types'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { ModalProvider } from 'contexts/ModalProvider'
import { CustomButton } from 'components/CustomButton'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { FilterBox } from './components/FilterBox'
import { EmployeeBox } from './components/EmployeeBox'

export const Employees = () => {
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()
  const { t } = useTranslation('adminPanel')

  const handleGoBack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'DashboardNavigation',
      params: {
        screen: 'Dashboard',
      },
    })
  }, [navigation])

  const navigateToInviteMembers = () => {
    navigation.navigate('DrawerNavigator', {
      screen: 'InviteMembers',
    })
  }

  return (
    <ModalProvider>
      <SafeAreaWrapper>
        <DrawerBackArrow goBack={handleGoBack} title={t('employees')} />
        <CustomButton
          label={t('invite')}
          variant="primary"
          width={120}
          height={47}
          icon={'plus'}
          marginLeft={'auto'}
          marginBottom={10}
          onPress={navigateToInviteMembers}
        />
        <FilterBox />
        <ScrollView bounces={false}>
          <Box marginHorizontal="s" marginBottom="s">
            <Text variant="lightGreyRegular">{t('pendingEmployees').toUpperCase()}</Text>
            <EmployeeBox />
          </Box>
          <Box marginHorizontal="s" marginBottom="s">
            <Text variant="lightGreyRegular">{t('joinedEmployees').toUpperCase()}</Text>
            <EmployeeBox />
            <EmployeeBox />
            <EmployeeBox />
          </Box>
          <Box marginHorizontal="s" marginBottom="s">
            <Text variant="lightGreyRegular">{t('formerEmployees').toUpperCase()}</Text>
            <Text variant="regularGrey16" marginTop="xm">
              {t('noFormer')}
            </Text>
          </Box>
        </ScrollView>
      </SafeAreaWrapper>
    </ModalProvider>
  )
}
