import { ConfirmationModal } from 'components/ConfirmationModal'
import { useModalContext } from 'contexts/ModalProvider'
import { AppNavigationType } from 'navigation/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  RequestVacationData,
  RequestVacationProvider,
  useRequestVacationContext,
} from '../contexts/RequestVacationContext'

type RequestSentModalProps = {
  navigate: AppNavigationType<'REQUEST_VACATION'>['navigate']
}

export const RequestSentModal = ({ navigate }: RequestSentModalProps) => {
  const { hideModal } = useModalContext()
  return (
    <RequestVacationProvider>
      <RequestSentModalContent hideModal={hideModal} navigate={navigate} />
    </RequestVacationProvider>
  )
}

const RequestSentModalContent = ({
  hideModal,
  navigate,
}: RequestSentModalProps & { hideModal: F0 }) => {
  const ctx = useRequestVacationContext()

  const onSeeRequestPress = () => {
    navigateToDetails(navigate, ctx)
    hideModal()
  }
  const { t } = useTranslation('requestVacation')
  return (
    <ConfirmationModal
      isVisible
      header={t('sent')}
      content={t('sentDescription')}
      acceptBtnText={t('ok')}
      declineBtnText={t('seeRequest')}
      hideModal={hideModal}
      onAccept={hideModal}
      onDismiss={hideModal}
      onDecline={onSeeRequestPress}
      statusIcon="success"
    />
  )
}

const navigateToDetails = (
  navigate: AppNavigationType<'REQUEST_VACATION'>['navigate'],
  ctx: RequestVacationData
) =>
  navigate('DRAWER_NAVIGATOR', {
    screen: 'Home',
    params: {
      screen: 'Stats',
      params: {
        screen: 'SEE_REQUEST',
        params: {
          ...ctx.requestData,
          startDate: (ctx.startDate ?? new Date()).toISOString(),
          endDate: (ctx.endDate ?? ctx.startDate ?? new Date()).toISOString(),
          isSickTime: ctx.sickTime,
          status: ctx.sickTime ? 'accepted' : 'pending',
        },
      },
    },
  })
