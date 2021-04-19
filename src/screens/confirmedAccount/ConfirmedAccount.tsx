import React, { FC, useCallback, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppNavigationType } from 'navigation/types'

import useBooleanState from '../../hooks/useBooleanState'
import { PendingAccountConfirmationModal } from '../signupEmail/components/PendingAccountConfirmationModal'
import { useConfirmAccount } from 'hooks/useConfirmAccount'
import { colors } from 'utils/theme/colors'
import { createAlert } from 'utils/createAlert'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'

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

  const navigation = useNavigation<AppNavigationType<'ConfirmedAccount'>>()

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
    if (confirmErrorMessage === t('invalidToken')) {
      createAlert('Confirm Error', confirmErrorMessage, showModal)
    } else {
      confirmErrorMessage && createAlert('Confirm Error', confirmErrorMessage, navigateToLogin)
    }
  }, [confirmErrorMessage])

  if (isLoading) {
    return <ActivityIndicator color={colors.primary} />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PendingAccountConfirmationModal
        isVisible={isModalVisible}
        isConfirmed={isSuccess}
        hideModal={hideModal}
        showModal={showModal}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
})
