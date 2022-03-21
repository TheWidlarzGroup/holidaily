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
}
type ChangeRequestDataCallbackType = (currentData: RequestDataTypes) => RequestDataTypes

type RequestVacationProps = ModalNavigationProps<'RequestVacation'>

export const RequestVacation = ({ route }: RequestVacationProps) => {
  const [step, setStep] = useState(0)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [description, setDescription] = useState('')
  const [sickTime, { setTrue: setSickTime, setFalse: unsetSickTime, toggle: toggleSickTime }] =
    useBooleanState(false)
  const [message, setMessage] = useState('')
  const [photos, setPhotos] = useState<{ id: string; uri: string }[]>([])
  const [sentModal, { setTrue: showSentModal, setFalse: hideSentModal }] = useBooleanState(false)
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
    const newData = callback({ description, message, photos })
    setDescription(newData.description)
    setMessage(newData.message)
    setPhotos(newData.photos)
  }

  const reset = () => {
    hideSentModal()
    setStep(0)
    setStartDate(undefined)
    setEndDate(undefined)
    setDescription('')
    unsetSickTime()
    setMessage('')
    setPhotos([])
  }

  const removePhoto = (id: string) => setPhotos(photos.filter((p) => p.id !== id))

  useEffect(() => {
    const { params } = route
    if (params?.start) setStartDate(new Date(params.start))
    if (params?.end) setEndDate(new Date(params.end))
    if (params?.action === 'sickday') {
      setSickTime()
      const tomorow = new Date()
      tomorow.setDate(tomorow.getDate() + 1)
      setStartDate(tomorow)
      setEndDate(tomorow)
    }
  }, [route, route.params, setSickTime])

  return (
    <SafeAreaView style={styles.container}>
      <Box paddingBottom="m">
        <HeaderRequestVacation />
        <RequestVacationBar currentScreen={step ? 'Summary' : 'Form'} />
      </Box>
      {step === 0 && (
        <FormRequestVacation
          nextStep={() => setStep(1)}
          sickTime={sickTime}
          toggleSickTime={toggleSickTime}
          changeRequestData={changeRequestData}
          date={{ start: startDate, end: endDate }}
          message={message}
          photos={photos}
          removePhoto={removePhoto}
        />
      )}
      {step === 1 && (
        <SummaryRequestVacation
          description={description}
          isSick={sickTime}
          startDate={startDate}
          endDate={endDate}
          message={message}
          onNextPressed={showSentModal}
          photos={photos}
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
