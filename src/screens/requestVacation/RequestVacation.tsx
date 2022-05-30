import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ModalNavigationProps, AppNavigationType } from 'navigation/types'
import { useBooleanState } from 'hooks/useBooleanState'
import { useSoftInputMode, SoftInputModes } from 'hooks/useSoftInputMode'
import { useSetStatusBarStyle } from 'hooks/useSetStatusBarStyle'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { keys } from 'utils/manipulation'
import { AttachmentType } from 'types/holidaysDataTypes'
import { useTranslation } from 'react-i18next'
import { SwipeableScreen } from 'navigation/SwipeableScreen'
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
type RequestVacationProps = ModalNavigationProps<'REQUEST_VACATION'>

const RequestVacation = ({ route }: RequestVacationProps) => {
  const { userSettings } = useUserSettingsContext()
  const { markSickTime, setEndDate, setStartDate, ...ctx } = useRequestVacationContext()
  const [isSentModalVisible, { setTrue: showSentModal, setFalse: hideSentModal }] =
    useBooleanState(false)
  const navigation = useNavigation<AppNavigationType<'REQUEST_VACATION'>>()
  useSoftInputMode(SoftInputModes.ADJUST_RESIZE)
  useSetStatusBarStyle(userSettings)

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
    navigation.navigate('DRAWER_NAVIGATOR', {
      screen: 'Home',
      params: {
        screen: 'Stats',
        params: {
          screen: 'SEE_REQUEST',
          params: {
            ...ctx.requestData,
            endDate: (ctx.endDate ?? new Date()).toISOString(),
            startDate: (ctx.startDate ?? new Date()).toISOString(),
            isSickTime: ctx.sickTime,
            status: ctx.sickTime ? 'accepted' : 'pending',
          },
        },
      },
    })
  }
  const { t } = useTranslation('requestVacation')
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

  const requestDataChanged = keys(ctx.requestData).some((key) => !!ctx.requestData[key].length)
  const isDirty = ctx.sickTime || !!ctx.startDate || requestDataChanged

  return (
    <SwipeableScreen
      bg="dashboardBackground"
      confirmLeave={isDirty}
      confirmLeaveOptions={{
        acceptBtnText: t('discardRequestYes'),
        declineBtnText: t('discardRequestNo'),
        header: t('discardRequestHeader'),
        content: t('discardRequestContent'),
      }}>
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
          navigation.navigate('DRAWER_NAVIGATOR')
        }}
      />
      {!isSentModalVisible && <BadStateController />}
    </SwipeableScreen>
  )
}

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
