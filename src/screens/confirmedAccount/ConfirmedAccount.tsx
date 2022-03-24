import React, { useCallback, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native'
import { AuthNavigationType } from 'navigation/types'
import { useTranslation } from 'react-i18next'

import { useBooleanState } from 'hooks/useBooleanState'
import { useConfirmAccount } from 'hooks/legacy-api-hooks/useConfirmAccount'
import { colors } from 'utils/theme/colors'
import { createAlert } from 'utils/createAlert'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { PendingAccountConfirmationModal } from '../signupEmail/components/PendingAccountConfirmationModal'

type RouteProps = {
  key: string
  name: string
  params: {
    token: string
  }
}

export const ConfirmedAccount = () => {
  const { handleConfirmAccount, isLoading, isSuccess, confirmErrorMessage } = useConfirmAccount()
  const [isModalVisible, { setTrue: showModal, setFalse: hideModal }] = useBooleanState(false)
  const { params } = useRoute<RouteProps>()
  const { t } = useTranslation('mutationsErrors')
  const navigation = useNavigation<AuthNavigationType<'ConfirmedAccount'>>()

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login')
  }, [navigation])

  useEffect(() => {
    if (!params?.token) return
    handleConfirmAccount({ token: params.token })
  }, [params.token, handleConfirmAccount])

  useEffect(() => {
    if (confirmErrorMessage && confirmErrorMessage !== t('invalidToken')) {
      createAlert('Confirm Error', confirmErrorMessage, navigateToLogin)
    } else if (confirmErrorMessage && confirmErrorMessage !== t('invalidToken')) {
      createAlert('Confirm Error', confirmErrorMessage, showModal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmErrorMessage])

  if (isLoading) {
    return <ActivityIndicator color={colors.primary} />
  }

  return (
    <SafeAreaWrapper>
      <PendingAccountConfirmationModal
        isVisible={isModalVisible}
        isConfirmed={isSuccess}
        hideModal={hideModal}
        showModal={showModal}
      />
    </SafeAreaWrapper>
  )
}
