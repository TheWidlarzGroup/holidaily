import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { ModalNavigationProps, ModalNavigationType } from 'navigation/types'
import { mkUseStyles, Theme } from 'utils/theme'
import { useBooleanState } from 'hooks/useBooleanState'
import { useSoftInputMode, SoftInputModes } from 'hooks/useSoftInputMode'
import { AttachmentType } from 'types/holidaysDataTypes'
import { RequestSent } from './components/RequestSent'
import { RequestVacationHeader } from './components/RequestVacationHeader'
import {
  RequestVacationProvider,
  useRequestVacationContext,
} from './contexts/RequestVacationContext'
import { RequestVacationSteps } from './components/RequestVacationSteps'
import { BadStateController } from './components/BadStateController'

export type RequestDataTypes = {
  description: string
  message: string
  photos: AttachmentType[]
  files: (AttachmentType & { name: string })[]
}
type ChangeRequestDataCallbackType = (currentData: RequestDataTypes) => RequestDataTypes
type RequestVacationProps = ModalNavigationProps<'RequestVacation'>

const RequestVacation = ({ route }: RequestVacationProps) => {
  const { markSickTime, setEndDate, setStartDate, ...ctx } = useRequestVacationContext()
  const [isSentModalVisible, { setTrue: showSentModal, setFalse: hideSentModal }] =
    useBooleanState(false)
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
    const newData = callback(ctx.requestData)
    ctx.setRequestData((oldData) => ({ ...oldData, ...newData }))
  }

  const reset = () => {
    hideSentModal()
    ctx.setStep(0)
    setStartDate(undefined)
    setEndDate(undefined)
    ctx.setRequestData(emptyRequest)
    ctx.cancelSickTime()
  }

  const removeAttachment = (id: string) => {
    ctx.setRequestData((old) => ({
      ...old,
      photos: old.photos.filter((p) => p.id !== id),
      files: old.files.filter((f) => f.id !== id),
    }))
  }
  const onPressSee = () => {
    hideSentModal()
    navigation.navigate('DrawerNavigator', {
      screen: 'Home',
      params: {
        screen: 'Stats',
        params: {
          screen: 'SeeRequest',
          params: {
            ...ctx.requestData,
            endDate: (ctx.endDate ?? new Date()).toISOString(),
            startDate: (ctx.startDate ?? new Date()).toISOString(),
            isSickTime: ctx.sickTime,
            status: 'pending',
          },
        },
      },
    })
  }

  useEffect(() => {
    const { params } = route

    if (params?.start) setStartDate(new Date(params.start))
    if (params?.end) setEndDate(new Date(params.end))
    if (params?.action === 'sickday') {
      markSickTime()
      const tomorow = new Date()
      tomorow.setDate(tomorow.getDate() + 1)
      setStartDate(tomorow)
      setEndDate(tomorow)
    }
  }, [route, route.params, markSickTime, setEndDate, setStartDate])
  return (
    <SafeAreaView style={styles.container}>
      <RequestVacationHeader />
      <RequestVacationSteps
        changeRequestData={changeRequestData}
        removeAttachment={removeAttachment}
        showSentModal={showSentModal}
      />
      <RequestSent
        isVisible={isSentModalVisible}
        onPressSee={onPressSee}
        onPressAnother={reset}
        onPressOk={() => {
          hideSentModal()
          navigation.navigate('Home')
        }}
      />
      {!isSentModalVisible && <BadStateController />}
    </SafeAreaView>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: 0,
  },
}))

const emptyRequest = {
  description: '',
  message: '',
  photos: [],
  files: [],
}
const WrappedRequestVacation = (p: RequestVacationProps) => (
  <RequestVacationProvider>
    <RequestVacation {...p} />
  </RequestVacationProvider>
)

export { WrappedRequestVacation as RequestVacation }
