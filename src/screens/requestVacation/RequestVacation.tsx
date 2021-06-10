import React, { FC, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { FirstStepRequestVacation } from './components/FirstStepRequestVacation'
import { SecondStepRequestVacation } from './components/SecondStepRequestVacation'
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
      <Box margin="l">
        {step === 0 && (
          <FirstStepRequestVacation
            nextStep={() => setStep(1)}
            changeRequestData={changeRequestData}
          />
        )}
        {step === 1 && <SecondStepRequestVacation />}
      </Box>
    </SafeAreaWrapper>
  )
}
