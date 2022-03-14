import React, { FC, useCallback } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'

import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AppNavigationType } from 'navigation/types'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useFetchAvailablePto } from 'hooks/useFetchAvailablePto'
import { LoadingModal } from 'components/LoadingModal'

export const Budget: FC = () => {
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()

  const { isLoading } = useFetchAvailablePto()

  const handleGoBack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'DashboardNavigation',
      params: {
        screen: 'Dashboard',
      },
    })
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  return (
    <SafeAreaWrapper>
      <DrawerBackArrow goBack={handleGoBack} />
      <Box margin="xl">
        <Text variant="title1">Welcome in Budget</Text>
      </Box>
      <LoadingModal show={isLoading} />
    </SafeAreaWrapper>
  )
}
