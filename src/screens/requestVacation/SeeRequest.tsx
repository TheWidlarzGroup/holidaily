import React from 'react'
import { Box } from 'utils/theme'
import { RequestVacationHeader } from './components/RequestVacationHeader'

export const SeeRequest = () => (
  <Box bg="white" flex={1}>
    <RequestVacationHeader isSent />
  </Box>
)
