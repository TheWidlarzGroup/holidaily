import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ModalNavigationProps, AppNavigationType } from 'navigation/types'
import { useBooleanState } from 'hooks/useBooleanState'
import { useSoftInputMode, SoftInputModes } from 'hooks/useSoftInputMode'
import { useSetStatusBarStyle } from 'hooks/useSetStatusBarStyle'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { useModalContext } from 'contexts/ModalProvider'
import { keys } from 'utils/manipulation'
import { AttachmentType } from 'types/holidaysDataTypes'
import { useTranslation } from 'react-i18next'
import { SwipeableScreen } from 'navigation/SwipeableScreen'
import { RequestVacationHeader } from './components/RequestVacationHeader'
import {
  RequestVacationProvider,
  useRequestVacationContext,
} from './contexts/RequestVacationContext'
import { RequestVacationSteps } from './components/RequestVacationSteps'
import { BadStateController } from './components/BadStateController'
import { RequestSentModal } from './components/RequestSentModal'

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
  const [requestSent, { setTrue: markRequestAsSent }] = useBooleanState(false)
  const { markSickTime, setEndDate, setStartDate, ...ctx } = useRequestVacationContext()
  const wasSubmitEventTriggered = useRef(false)
  const { goBack, navigate } = useNavigation<AppNavigationType<'REQUEST_VACATION'>>()
  useSoftInputMode(SoftInputModes.ADJUST_RESIZE)
  useSetStatusBarStyle(userSettings)
  const { showModal, hideModal } = useModalContext()
  const changeRequestData = (callback: ChangeRequestDataCallbackType) => {
    const newData = callback(ctx.requestData)
    ctx.setRequestData((oldData) => ({ ...oldData, ...newData }))
  }
  const removeAttachment = (id: string) => {
    ctx.setRequestData((old) => ({
      ...old,
      photos: old.photos.filter((p) => p.id !== id),
      files: old.files.filter((f) => f.id !== id),
    }))
  }
  const { t } = useTranslation('requestVacation')
  useEffect(() => {
    if (!requestSent || wasSubmitEventTriggered.current) return
    wasSubmitEventTriggered.current = true
    goBack()
    showModal(<RequestSentModal navigate={navigate} />)
  }, [requestSent, goBack, navigate, hideModal, showModal])

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
      confirmLeave={isDirty && !requestSent}
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
        showSentModal={markRequestAsSent}
      />
      <BadStateController />
    </SwipeableScreen>
  )
}

const WrappedRequestVacation = (p: RequestVacationProps) => (
  <RequestVacationProvider>
    <RequestVacation {...p} />
  </RequestVacationProvider>
)

export { WrappedRequestVacation as RequestVacation }
