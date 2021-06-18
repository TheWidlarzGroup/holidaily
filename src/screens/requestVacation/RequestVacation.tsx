import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { Box } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { RequestVacationBar } from 'components/RequestVacationBar'
import { FormRequestVacation } from './components/FormRequestVacation'
import { SummaryRequestVacation } from './components/SummaryRequestVacation'
import { HeaderRequestVacation } from './components/HeaderRequestVacation'

export type RequestDataTypes = {
  date: undefined
  description: string
  sickTime: boolean
}

type ChangeRequestDataCallbackType = (currentData: RequestDataTypes) => RequestDataTypes

export const RequestVacation = () => {
  const [step, setStep] = useState(0)
  const [date, setDate] = useState()
  const [description, setDescription] = useState('')
  const [sickTime, setSickTime] = useState(false)

  useEffect(() => {
    StatusBar.setBarStyle('light-content')
    return () => {
      StatusBar.setBarStyle('dark-content')
    }
  }, [])

  const changeRequestData = (callback: ChangeRequestDataCallbackType) => {
    const newData = callback({ date, description, sickTime })
    setDate(newData.date)
    setDescription(newData.description)
    setSickTime(newData.sickTime)
  }

  return (
    <Box flex={1}>
      <HeaderRequestVacation />
      <RequestVacationBar currentScreen={step ? 'Summary' : 'Form'} />
      <Box margin="l" flex={1}>
        {step === 0 && (
          <FormRequestVacation nextStep={() => setStep(1)} changeRequestData={changeRequestData} />
        )}
        {step === 1 && <SummaryRequestVacation description={description} sickTime={sickTime} />}
      </Box>
    </Box>
  )
}
