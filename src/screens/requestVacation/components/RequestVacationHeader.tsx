import React from 'react'
import { Box } from 'utils/theme'
import { keys } from 'utils/manipulation'
import { RequestVacationBar } from 'components/RequestVacationBar'
import { ModalHandleIndicator } from 'components/ModalHandleIndicator'
import { RequestVacationHeaderText } from './RequestVacationHeaderText'
import { useRequestVacationContext } from '../contexts/RequestVacationContext'

export const RequestVacationHeader = () => {
  const { step, setStep, startDate, sickTime, requestData } = useRequestVacationContext()
  const requestDataChanged = keys(requestData).some((key) => !!requestData[key].length)
  const isDirty = sickTime || !!startDate || requestDataChanged
  return (
    <Box paddingBottom="m" paddingTop="m">
      <ModalHandleIndicator />
      <RequestVacationHeaderText step={step} setStep={setStep} stepBackNeedsConfirm={isDirty} />
      <RequestVacationBar currentScreen={step ? 'Summary' : 'Form'} />
    </Box>
  )
}
