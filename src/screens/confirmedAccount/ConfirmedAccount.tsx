import React, { FC, useCallback, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppNavigationType } from 'navigation/types'

import useBooleanState from '../../hooks/useBooleanState'
import { PendingAccountConfirmationModal } from '../signupEmail/components/PendingAccountConfirmationModal'
import { useConfirmAccount } from 'hooks/useConfirmAccount'
import { colors } from 'utils/theme/colors'
import { createAlert } from 'utils/createAlert'

type RouteProps = {
  key: string
  name: string
  params: {
    token: string
  }
}

export const ConfirmedAccount: FC = () => {
  const { handleConfirmAccount, isLoading, isSuccess, isConfirmError } = useConfirmAccount()
  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const { params } = useRoute<RouteProps>()

  const navigation = useNavigation<AppNavigationType<'ConfirmedAccount'>>()

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login')
  }, [navigation])

  useEffect(() => {
    if (params) {
      const { token } = params
      console.log(token)
      handleConfirmAccount({ email: 'smtpliblearning@gmail.com', token })
    }
  }, [])

  useEffect(() => {
    if (isConfirmError?.isError) createAlert('Login Error', isConfirmError.message, navigateToLogin)
  }, [isConfirmError])

  if (isLoading) {
    return <ActivityIndicator color={colors.primary} />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PendingAccountConfirmationModal
        isVisible={!isConfirmError}
        isConfirmed={isSuccess}
        hideModal={hideModal}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
})
