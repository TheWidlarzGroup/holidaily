import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationType } from 'navigation/types'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { useFetchEmployees } from 'hooks/useFetchEmployees'
import { ModalProvider } from 'contexts/ModalProvider'
import { CustomButton } from 'components/CustomButton'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { FilterBox } from '../../components/FilterBox'
import { EmployeeBox } from './components/EmployeeBox'

export const Employees = () => {
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()
  const { t } = useTranslation('adminPanel')
  const { employees } = useFetchEmployees()
  const employeesNoAdmin = employees.filter(({ role }) => role.toUpperCase() !== 'ADMIN')

  const handleGoBack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'DashboardNavigation',
      params: {
        screen: 'Dashboard',
      },
    })
  }, [navigation])

  const navigateToInviteMembers = () => {
    navigation.navigate('AdminPanelEmployeesNavigation', {
      screen: 'InviteMembers',
    })
  }

  const renderItem = useCallback(({ item }) => <EmployeeBox {...item} />, [])
  const onSearch = () => {}
  const onFilter = () => {}

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
        <FilterBox onSearch={onSearch} onFilter={onFilter} />
        <Box>
          {/* TODO: implement pending & former when BE ready */}
          <Box marginHorizontal="m" marginBottom="s">
            <Text variant="lightGreyRegular">{t('joinedEmployees').toUpperCase()}</Text>
            {employeesNoAdmin.length > 0 ? (
              <FlatList
                data={employeesNoAdmin}
                keyExtractor={({ id }) => id}
                renderItem={renderItem}
                bounces={false}
              />
            ) : (
              <Text variant="regularGrey16" marginTop="xm">
                {t('noJoined')}
              </Text>
            )}
          </Box>
          <Box marginHorizontal="m" marginBottom="s">
            <Text variant="lightGreyRegular">{t('formerEmployees').toUpperCase()}</Text>
            <Text variant="regularGrey16" marginTop="xm">
              {t('noFormer')}
            </Text>
          </Box>
        </Box>
      </SafeAreaWrapper>
    </ModalProvider>
  )
}
