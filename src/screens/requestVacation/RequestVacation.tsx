import React, { FC, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { Box } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { FormRequestVacation } from './components/FormRequestVacation'
import { SummaryRequestVacation } from './components/SummaryRequestVacation'
import { HeaderRequestVacation } from './components/HeaderRequestVacation'
import { RequestVacationBar } from 'components/RequestVacationBar'

export type requestDataTypes = {
  date: undefined
  description: string
  sickTime: boolean
}

export const RequestVacation: FC = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content')
    return () => {
      StatusBar.setBarStyle('dark-content')
    }
  }, [])

  const [step, setStep] = useState(0)
  const [date, setDate] = useState()
  const [description, setDescription] = useState('')
  const [sickTime, setSickTime] = useState(false)

  const changeRequestData = (callback: (currentData: requestDataTypes) => requestDataTypes) => {
    const newData = callback({ date, description, sickTime })
    setDate(newData.date)
    setDescription(newData.description)
    setSickTime(newData.sickTime)
  }

  return (
    <SafeAreaWrapper>
      <HeaderRequestVacation />
      <RequestVacationBar currentScreen={step ? 'Summary' : 'Form'} />
      <Box margin="l" flex={1}>
        {step === 0 && (
          <FormRequestVacation nextStep={() => setStep(1)} changeRequestData={changeRequestData} />
        )}
        {step === 1 && <SummaryRequestVacation description={description} sickTime={sickTime} />}
      </Box>
    </SafeAreaWrapper>
  )
}
