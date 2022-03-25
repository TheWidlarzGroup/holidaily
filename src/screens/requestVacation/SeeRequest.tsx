import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box } from 'utils/theme'
import { RequestVacationHeader } from './components/RequestVacationHeader'

export const SeeRequest = () => (
  <Box bg="white" flex={1}>
    <RequestVacationHeader isSent />
  </Box>
)
