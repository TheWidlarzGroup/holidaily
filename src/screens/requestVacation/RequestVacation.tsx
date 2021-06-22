import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { Box } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { RequestVacationBar } from 'components/RequestVacationBar'
import { FormRequestVacation } from './components/FormRequestVacation'
import { SummaryRequestVacation } from './components/SummaryRequestVacation'
import { HeaderRequestVacation } from './components/HeaderRequestVacation'
import { ModalNavigationProps } from 'navigation/types'

export type RequestDataTypes = {
  description: string
  sickTime: boolean
}
type ChangeRequestDataCallbackType = (currentData: RequestDataTypes) => RequestDataTypes

type RequestVacationProps = ModalNavigationProps<'RequestVacation'>

export const RequestVacation = ({ route }: RequestVacationProps) => {
  const [step, setStep] = useState(0)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [description, setDescription] = useState('')
  const [sickTime, setSickTime] = useState(false)

  useEffect(() => {
    StatusBar.setBarStyle('light-content')
    return () => {
      StatusBar.setBarStyle('dark-content')
    }
  }, [])

  const changeRequestData = (callback: ChangeRequestDataCallbackType) => {
    const newData = callback({ description, sickTime })
    setDescription(newData.description)
    setSickTime(newData.sickTime)
  }

  useEffect(() => {
    const { params } = route
    if (params?.start) setStartDate(new Date(params.start))
    if (params?.end) setEndDate(new Date(params.end))
  }, [route.params])

  return (
    <Box flex={1}>
      <HeaderRequestVacation />
      <RequestVacationBar currentScreen={step ? 'Summary' : 'Form'} />
      <Box margin="l" flex={1}>
        {step === 0 && (
          <FormRequestVacation
            nextStep={() => setStep(1)}
            changeRequestData={changeRequestData}
            date={{ start: startDate, end: endDate }}
          />
        )}
        {step === 1 && (
          <SummaryRequestVacation
            description={description}
            sickTime={sickTime}
            startDate={startDate}
            endDate={endDate}
          />
        )}
      </Box>
    </Box>
  )
}
