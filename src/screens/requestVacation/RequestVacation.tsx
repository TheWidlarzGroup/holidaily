import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { ModalNavigationProps, ModalNavigationType } from 'navigation/types'
import { RequestVacationBar } from 'components/RequestVacationBar'
import { Box, mkUseStyles } from 'utils/theme'
import { useBooleanState } from 'hooks/useBooleanState'
import { FormRequestVacation } from './components/FormRequestVacation'
import { SummaryRequestVacation } from './components/SummaryRequestVacation'
import { HeaderRequestVacation } from './components/HeaderRequestVacation'
import { RequestSent } from './components/RequestSent'

export type RequestDataTypes = {
  description: string
  sickTime: boolean
  message: string
}
type ChangeRequestDataCallbackType = (currentData: RequestDataTypes) => RequestDataTypes

type RequestVacationProps = ModalNavigationProps<'RequestVacation'>

export const RequestVacation = ({ route }: RequestVacationProps) => {
  const [step, setStep] = useState(0)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [description, setDescription] = useState('')
  const [sickTime, setSickTime] = useState(false)
  const [message, setMessage] = useState('')
  const [sentModal, { setTrue: showSentModal, setFalse: hideSentModal }] = useBooleanState(false)
  const navigation = useNavigation<ModalNavigationType<'RequestVacation'>>()
  const styles = useStyles()

  useEffect(() => {
    StatusBar.setBarStyle('light-content')
    return () => {
      StatusBar.setBarStyle('dark-content')
    }
  }, [])

  const changeRequestData = (callback: ChangeRequestDataCallbackType) => {
    const newData = callback({ description, sickTime, message })
    setDescription(newData.description)
    setSickTime(newData.sickTime)
    setMessage(newData.message)
  }

  const reset = () => {
    hideSentModal()
    setStep(0)
    setStartDate(undefined)
    setEndDate(undefined)
    setDescription('')
    setSickTime(false)
    setMessage('')
  }

  useEffect(() => {
    const { params } = route
    if (params?.start) setStartDate(new Date(params.start))
    if (params?.end) setEndDate(new Date(params.end))
  }, [route, route.params])

  return (
    <SafeAreaView style={styles.container}>
      <Box paddingBottom="m">
        <HeaderRequestVacation />
        <RequestVacationBar currentScreen={step ? 'Summary' : 'Form'} />
      </Box>
      {step === 0 && (
        <FormRequestVacation
          nextStep={() => setStep(1)}
          changeRequestData={changeRequestData}
          date={{ start: startDate, end: endDate }}
          message={message}
        />
      )}
      {step === 1 && (
        <SummaryRequestVacation
          description={description}
          sickTime={sickTime}
          startDate={startDate}
          endDate={endDate}
          message={message}
          onNextPressed={showSentModal}
        />
      )}

      <RequestSent
        isVisible={sentModal}
        onPressSee={() => {}}
        onPressAnother={reset}
        onPressOk={() => {
          hideSentModal()
          navigation.navigate('Home')
        }}
      />
    </SafeAreaView>
  )
}

const useStyles = mkUseStyles(() => ({
  container: {
    flex: 1,
  },
}))
