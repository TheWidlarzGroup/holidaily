import { useNavigation } from '@react-navigation/native'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { AppNavigationType } from 'navigation/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RequestVacationData, useRequestVacationContext } from '../contexts/RequestVacationContext'

export const RequestSentModal = ({ hideModal }: { hideModal: F0 }) => {
  const ctx = useRequestVacationContext()
  const { navigate } = useNavigation()

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
      hideModal={hideModal}
      onAccept={hideModal}
      onDismiss={hideModal}
      onDecline={onSeeRequestPress}
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
