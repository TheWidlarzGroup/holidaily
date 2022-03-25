import React from 'react'
import { Box } from 'utils/theme'
import { RequestVacationBar } from 'components/RequestVacationBar'
import { ModalHeader } from 'components/ModalHeader'
import { RequestVacationHeaderText } from './RequestVacationHeaderText'
import { useRequestVacationContext } from '../contexts/RequestVacationContext'

export const RequestVacationHeader = ({ isSent }: { isSent?: true }) => {
  const { step, setStep } = useRequestVacationContext()
  return isSent ? (
    <ModalHeader>
      <RequestVacationHeaderText isSent />
    </ModalHeader>
  ) : (
    <Box paddingBottom="m">
      <RequestVacationHeaderText step={step} setStep={setStep} />
      <RequestVacationBar currentScreen={step ? 'Summary' : 'Form'} />
    </Box>
  )
}
