import React, { useCallback } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { getFormattedPeriod } from 'utils/dates'
import { useRequestActions } from 'hooks/useRequestActions'
import { ModalProvider, useModalContext } from 'contexts/ModalProvider'
import IconCalendar from 'assets/icons/icon-calendar-orange-small.svg'
import IconPill from 'assets/icons/icon-pill-orange.svg'
import { AdminPanelRequestsRoutes, AppNavigationType } from 'navigation/types'
import { OrganizationRequestTypes } from 'types/useOrganizationRequestsTypes'
import { Message } from 'screens/requestVacation/components/additionals/Message'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { RequestStatusIcon } from './RequestStatusIcon'
import { RequestButtons } from './RequestButtons'
import { REQUEST_STATUS } from '../helpers'

export type RequestViewProps = {
  request: OrganizationRequestTypes
}

export const RequestView = () => {
  const { t } = useTranslation('adminPanel')
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()
  const { approveRequest, rejectRequest } = useRequestActions()
  const { showModal, hideModal } = useModalContext()

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])
  const { params } = useRoute<RouteProp<AdminPanelRequestsRoutes, 'RequestView'>>()
  const { request } = params

  const nameToDisplay =
    request.user.firstName || params.request.user.lastName
      ? `${request.user.firstName} ${request.user.lastName}`
      : request.user.email

  const handleApproveRequest = () => {
    // const onAccept = () => {
    //   // approveRequest(request.id)
    // showModal(<ChangesSavedModal isVisible content={t('requestApproved')} hideModal={hideModal} />)
    // }

    showModal(
      <ConfirmationModal
        isVisible
        hideModal={hideModal}
        onAccept={() => {}}
        onDecline={hideModal}
        header={t('approveRequestQuestion')}
        content={t('changeBlockedLaterMessage')}
      />
    )
  }

  const handleRejectRequest = () => {
    // rejectRequest(request.id)
    // showModal(<ChangesSavedModal isVisible content={t('requestDeclined')} hideModal={hideModal} />)

    showModal(
      <ConfirmationModal
        isVisible
        hideModal={hideModal}
        onAccept={() => {}}
        onDecline={hideModal}
        header={t('declineRequestQuestion')}
        content={t('changeBlockedLaterMessage')}
      />
    )
  }

  return (
    <ModalProvider>
      <SafeAreaWrapper>
        <DrawerBackArrow goBack={handleGoBack} title={nameToDisplay} />
        <Box marginTop="xl" marginHorizontal="lplus" flex={1}>
          <Text variant="heading4" numberOfLines={2} marginLeft="s">
            {request.description}
          </Text>
          <Box flexDirection="row" alignItems="center" marginTop="m" marginLeft="s">
            <IconCalendar />
            <Text variant="bold16Calendar" marginLeft="m">
              {request.range}
              {/* TODO change here to geFormattedPeriod when BE ready */}
            </Text>
          </Box>
          {request.sickTime && (
            <Box flexDirection="row" alignItems="center" marginTop="ml" marginLeft="s">
              <IconPill />
              <Text marginLeft="ml" variant="bold16">
                {t('sickTimeOff')}
              </Text>
            </Box>
          )}
          {!!request.message && (
            <Box marginTop="m">
              <Message onPressMessage={() => {}} messageContent={request.message} />
            </Box>
          )}
        </Box>
        {request.status === REQUEST_STATUS.PENDING ? (
          <RequestButtons onApprove={handleApproveRequest} onReject={handleRejectRequest} />
        ) : (
          <RequestStatusIcon status={request.status} />
        )}
      </SafeAreaWrapper>
    </ModalProvider>
  )
}
