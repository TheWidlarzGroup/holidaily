import React, { useCallback } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AdminPanelRoutes, DrawerNavigationType } from 'navigation/types'
import { Box } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { CustomButton } from 'components/CustomButton'
import { StackNavigationProp } from '@react-navigation/stack'

export const AdminPanel = () => {
  const drawerNavigation = useNavigation<DrawerNavigationType<'Settings'>>()
  const adminNavigation = useNavigation<StackNavigationProp<AdminPanelRoutes>>()

  const handleGoBack = useCallback(() => {
    drawerNavigation.navigate('Home')
  }, [drawerNavigation])

  const { t } = useTranslation(['navigation'])

  return (
    <SafeAreaWrapper>
      <DrawerBackArrow goBack={handleGoBack} title={t('navigation:adminPanel')} />
      <Box marginHorizontal="m" flex={1}>
        <CustomButton
          label="Day's off requests"
          onPress={() => adminNavigation.navigate('Requests')}
        />
      </Box>
    </SafeAreaWrapper>
  )
}
