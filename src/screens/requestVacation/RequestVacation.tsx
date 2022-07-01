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
import { Analytics } from 'services/analytics'
import { RequestVacationHeader } from './components/RequestVacationHeader'
import {
  RequestVacationData,
  RequestVacationProvider,
  useRequestVacationContext,
} from './contexts/RequestVacationContext'
import { RequestVacationSteps } from './components/RequestVacationSteps'
import { BadStateController } from './components/BadStateController'
import { RequestSentModal } from './components/RequestSentModal'
import { ValidationModal } from './components/ValidationModal'

export type RequestDataTypes = {
  description: string
  message: string
  photos: AttachmentType[]
  files: (AttachmentType & { name: string })[]
}
type ChangeRequestDataCallbackType = F1<RequestDataTypes, RequestDataTypes>
type RequestVacationProps = ModalNavigationProps<'REQUEST_VACATION'>

const RequestVacation = ({ route }: RequestVacationProps) => {
  const { userSettings } = useUserSettingsContext()
  const [requestSent, { setTrue: markRequestAsSent }] = useBooleanState(false)
  const { markSickTime, setEndDate, setStartDate, setCreatedAt, ...ctx } =
    useRequestVacationContext()
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
    sendAnalytics(ctx)
    showModal(<RequestSentModal navigate={navigate} ctx={ctx} />)
  }, [requestSent, goBack, navigate, hideModal, showModal, ctx])

  useEffect(() => {
    const { params } = route

    if (params?.start) {
      const newStartDate = new Date(params.start)
      setStartDate(newStartDate)
      Analytics().track('REQUEST_START_DATE_CHANGED', { startDate: String(newStartDate) })
    }
    if (params?.end) {
      const newEndDate = new Date(params.end)
      setEndDate(new Date(params.end))
      Analytics().track('REQUEST_END_DATE_CHANGED', { endDate: String(newEndDate) })
    }
    if (params?.action === 'sickday') {
      markSickTime()
      Analytics().track('REQUEST_SICK_TIME_PRESSED')
      const tomorow = new Date()
      tomorow.setDate(tomorow.getDate() + 1)
      setStartDate(tomorow)
      setEndDate(tomorow)
    }
  }, [route, route.params, markSickTime, setEndDate, setStartDate, setCreatedAt])

  const requestDataChanged = keys(ctx.requestData).some((key) => !!ctx.requestData[key].length)
  const isDirty = ctx.sickTime || !!ctx.startDate || requestDataChanged

  return (
    <SwipeableScreen
      swipeWithIndicator
      extraStyle={{ paddingTop: 6 }}
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
      <ValidationModal />
    </SwipeableScreen>
  )
}

const sendAnalytics = (ctx: RequestVacationData) => {
  Analytics().track('REQUEST_VACATION_ADD', {
    description: ctx.requestData.description,
    filesCount: ctx.requestData.files.length,
    photosCount: ctx.requestData.photos.length,
    message: ctx.requestData.message,
    startDate: String(ctx.startDate),
    endDate: String(ctx.endDate),
    createdAt: String(ctx.createdAt),
    isSick: ctx.sickTime,
  })
}

const WrappedRequestVacation = (p: RequestVacationProps) => (
  <RequestVacationProvider>
    <RequestVacation {...p} />
  </RequestVacationProvider>
)

export { WrappedRequestVacation as RequestVacation }
