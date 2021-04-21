import React, { FC, useCallback, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native'
import { AuthNavigationType } from 'navigation/types'
import { useTranslation } from 'react-i18next'

import useBooleanState from 'hooks/useBooleanState'
import { useConfirmAccount } from 'hooks/useConfirmAccount'
import { colors } from 'utils/theme/colors'
import { createAlert } from 'utils/createAlert'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useUserContext } from 'hooks/useUserContext'
import { PendingAccountConfirmationModal } from '../signupEmail/components/PendingAccountConfirmationModal'

type RouteProps = {
  key: string
  name: string
  params: {
    token: string
  }
}

export const ConfirmedAccount: FC = () => {
  const {
    user: { email },
  } = useUserContext()
  const { handleConfirmAccount, isLoading, isSuccess, confirmErrorMessage } = useConfirmAccount()
  const [isModalVisible, { setTrue: showModal, setFalse: hideModal }] = useBooleanState(false)
  const { params } = useRoute<RouteProps>()
  const { t } = useTranslation('mutationsErrors')
  const navigation = useNavigation<AuthNavigationType<'ConfirmedAccount'>>()

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login')
  }, [navigation])

  useEffect(() => {
    if (params) {
      const { token } = params
      handleConfirmAccount({ email, token })
    }
  }, [params])

  useEffect(() => {
    if (confirmErrorMessage !== t('invalidToken')) {
      createAlert('Confirm Error', confirmErrorMessage, navigateToLogin)
    } else if (confirmErrorMessage && confirmErrorMessage !== t('invalidToken')) {
      createAlert('Confirm Error', confirmErrorMessage, showModal)
    }
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
