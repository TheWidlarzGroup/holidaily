import React, { FC, useCallback } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

import { DrawerNavigationType } from 'navigation/types'
import { Box, Text } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { DrawerBackArrow } from 'components/DrawerBackArrow'

export const Settings: FC = () => {
  const navigation = useNavigation<DrawerNavigationType<'Settings'>>()

  const handleGoBack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'Dashboard',
    })
  }, [navigation])

  return (
    <SafeAreaWrapper>
      <DrawerBackArrow goBack={handleGoBack} />

      <Box margin="xl">
        <Text variant="title1">Welcome in Settings</Text>
      </Box>
    </SafeAreaWrapper>
  )
}
