import React from 'react'
import { Box } from 'utils/theme'
import { RequestVacationBar } from 'components/RequestVacationBar'
import { RequestVacationHeaderText } from './RequestVacationHeaderText'
import { useRequestVacationContext } from '../contexts/RequestVacationContext'

export const RequestVacationHeader = () => {
  const { step, setStep } = useRequestVacationContext()

  return (
    <Box paddingBottom="m" marginTop="-l">
      <RequestVacationHeaderText step={step} setStep={setStep} />
      <RequestVacationBar currentScreen={step ? 'Summary' : 'Form'} />
    </Box>
  )
}
