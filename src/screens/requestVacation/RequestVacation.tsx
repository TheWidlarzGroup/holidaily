import React, { FC, useEffect } from 'react'

import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { StatusBar } from 'react-native'

export const RequestVacation: FC = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content')
    return () => {
      StatusBar.setBarStyle('dark-content')
    }
  }, [])

  return (
    <SafeAreaWrapper>
      <Box margin="xl">
        <Text variant="title1">Request your vacation date</Text>
      </Box>
    </SafeAreaWrapper>
  )
}
