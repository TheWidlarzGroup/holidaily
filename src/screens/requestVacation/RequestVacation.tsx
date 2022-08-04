import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationType, ModalNavigationProps } from 'navigation/types'
import { useBooleanState } from 'hooks/useBooleanState'
import { SoftInputModes, useSoftInputMode } from 'hooks/useSoftInputMode'
import { useSetStatusBarStyle } from 'hooks/useSetStatusBarStyle'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { useModalContext } from 'contexts/ModalProvider'
import { keys } from 'utils/manipulation'
import { useTranslation } from 'react-i18next'
import { SwipeableScreen } from 'navigation/SwipeableScreen'
import { Analytics } from 'services/analytics'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useCreateDayOffRequest } from 'dataAccess/mutations/useCreateDayoffRequest'
import { AttachmentDataType } from 'mockApi/models'
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
import { SubmitButton } from './components/SubmitButton'

export type RequestDataTypes = {
  description: string
  message: string
  photos: AttachmentDataType[]
  files: (AttachmentDataType & { name: string })[]
}
type ChangeRequestDataCallbackType = F1<RequestDataTypes, RequestDataTypes>
type RequestVacationProps = ModalNavigationProps<'REQUEST_VACATION'>

const RequestVacation = ({ route }: RequestVacationProps) => {
  const { t } = useTranslation('requestVacation')
  const { userSettings } = useUserSettingsContext()
  const { showModal } = useModalContext()
  const { mutate, isLoading } = useCreateDayOffRequest()
  const [requestSent, { setTrue: markRequestAsSent }] = useBooleanState(false)
  const wasSubmitEventTriggered = useRef(false)
  const { goBack, navigate } = useNavigation<AppNavigationType<'REQUEST_VACATION'>>()
  const {
    setEndDate,
    setStartDate,
    setCreatedAt,
    setStep,
    setIsFormEmpty,
    setRequestData,
    ...ctx
  } = useRequestVacationContext()
  useSoftInputMode(SoftInputModes.ADJUST_RESIZE)
  useSetStatusBarStyle(userSettings)
  const changeRequestData = (callback: ChangeRequestDataCallbackType) => {
    const newData = callback(requestData)
    setRequestData((oldData) => ({ ...oldData, ...newData }))
  }
  const removeAttachment = (id: string) => {
    setRequestData((old) => ({
      ...old,
      photos: old.photos.filter((p) => p.id !== id),
      files: old.files.filter((f) => f.id !== id),
    }))
  }
  useEffect(() => {
    if (!requestSent || wasSubmitEventTriggered.current) return
    wasSubmitEventTriggered.current = true
    goBack()
    sendAnalytics(ctx)
    showModal(<RequestSentModal navigate={navigate} ctx={ctx} />)
  }, [ctx, goBack, navigate, requestSent, setStep, showModal])

  const { markSickTime, startDate, endDate, requestData, createdAt, sickTime, step } = ctx

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
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      setStartDate(tomorrow)
      setEndDate(tomorrow)
    }
  }, [route, route.params, markSickTime, setEndDate, setStartDate, setCreatedAt])

  const requestDataChanged = keys(requestData).some((key) => !!requestData[key].length)
  const isDirty = sickTime || !!startDate || requestDataChanged

  const handleSubmitValidation = () => {
    if (!startDate) setIsFormEmpty(true)
  }

  const onSubmit = () => {
    if (step === 0) return setStep(1)
    if (!startDate || !endDate) return
    const reqCreatedAt = createdAt || new Date()
    mutate(
      {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        createdAt: reqCreatedAt.toISOString(),
        description: requestData.description || t('outOfOffice'),
        isSickTime: sickTime,
        message: requestData.message || '',
        attachments: [...requestData.photos, ...requestData.files],
      },
      { onSuccess: markRequestAsSent }
    )
  }

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid>
      <SwipeableScreen
        swipeWithIndicator
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
        <SubmitButton
          onPress={onSubmit}
          handleValidation={handleSubmitValidation}
          isDisabled={!startDate}
          isLoading={isLoading}
          step={step}
        />
        <ValidationModal />
      </SwipeableScreen>
    </KeyboardAwareScrollView>
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
