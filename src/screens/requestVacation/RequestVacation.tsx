import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { ModalNavigationProps, ModalNavigationType } from 'navigation/types'
import { RequestVacationBar } from 'components/RequestVacationBar'
import { Box, mkUseStyles } from 'utils/theme'
import { useBooleanState } from 'hooks/useBooleanState'
import { useSoftInputMode, SoftInputModes } from 'hooks/useSoftInputMode'
import { AttachmentType } from 'types/holidaysDataTypes'
import { FormRequestVacation } from './components/FormRequestVacation'
import { SummaryRequestVacation } from './components/SummaryRequestVacation'
import { HeaderRequestVacation } from './components/HeaderRequestVacation'
import { RequestSent } from './components/RequestSent'

export type RequestDataTypes = {
  description: string
  message: string
  photos: AttachmentType[]
  files: (AttachmentType & { name: string })[]
}

type ChangeRequestDataCallbackType = (currentData: RequestDataTypes) => RequestDataTypes

type RequestVacationProps = ModalNavigationProps<'RequestVacation'>

export const RequestVacation = ({ route }: RequestVacationProps) => {
  const [step, setStep] = useState(0)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [requestData, setRequestData] = useState<RequestDataTypes>(emptyRequest)
  const [sickTime, { setTrue: setSickTime, setFalse: unsetSickTime, toggle: toggleSickTime }] =
    useBooleanState(false)
  const [isSentModalVisible, { setTrue: showSentModal, setFalse: hideSentModal }] =
    useBooleanState(false)
  const [isSent, { setTrue: markAsSent, setFalse: markAsNotSent }] = useBooleanState(false)
  const navigation = useNavigation<ModalNavigationType<'RequestVacation'>>()
  const styles = useStyles()
  useSoftInputMode(SoftInputModes.ADJUST_RESIZE)

  useEffect(() => {
    StatusBar.setBarStyle('light-content')
    return () => {
      StatusBar.setBarStyle('dark-content')
    }
  }, [])

  const changeRequestData = (callback: ChangeRequestDataCallbackType) => {
    const newData = callback(requestData)
    setRequestData((oldData) => ({ ...oldData, ...newData }))
    markAsNotSent()
  }

  const reset = () => {
    hideSentModal()
    setStep(0)
    setStartDate(undefined)
    setEndDate(undefined)
    setRequestData(emptyRequest)
    unsetSickTime()
  }

  const removeAttachment = (id: string) => {
    setRequestData((old) => ({
      ...old,
      photos: old.photos.filter((p) => p.id !== id),
      files: old.files.filter((f) => f.id !== id),
    }))
  }

  useEffect(() => {
    const { params } = route
    markAsNotSent()
    if (params?.start) setStartDate(new Date(params.start))
    if (params?.end) setEndDate(new Date(params.end))
    if (params?.action === 'sickday') {
      setSickTime()
      const tomorow = new Date()
      tomorow.setDate(tomorow.getDate() + 1)
      setStartDate(tomorow)
      setEndDate(tomorow)
    }
  }, [route, route.params, setSickTime, markAsNotSent])

  return (
    <SafeAreaView style={styles.container}>
      <Box paddingBottom="m">
        <HeaderRequestVacation step={step} setStep={setStep} />
        <RequestVacationBar currentScreen={step ? 'Summary' : 'Form'} />
      </Box>
      {step === 0 && (
        <FormRequestVacation
          nextStep={() => setStep(1)}
          sickTime={sickTime}
          toggleSickTime={toggleSickTime}
          changeRequestData={changeRequestData}
          date={{ start: startDate, end: endDate }}
          message={requestData.message}
          photos={requestData.photos}
          files={requestData.files}
          removeAttachment={removeAttachment}
        />
      )}
      {step === 1 && (
        <SummaryRequestVacation
          description={requestData.description}
          isSick={sickTime}
          startDate={startDate}
          endDate={endDate}
          message={requestData.message}
          onNextPressed={showSentModal}
          attachments={[...requestData.photos, ...requestData.files]}
          hideNext={isSent}
        />
      )}

      <RequestSent
        isVisible={isSentModalVisible}
        onPressSee={() => {
          hideSentModal()
          markAsSent()
        }}
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

const emptyRequest = {
  description: '',
  message: '',
  photos: [],
  files: [],
}
