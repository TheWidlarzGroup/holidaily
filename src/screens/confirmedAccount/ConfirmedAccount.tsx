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
import { useTranslation, TFunction } from 'react-i18next'

type RouteProps = {
  key: string
  name: string
  params: {
    token: string
  }
}

const customErrorMessage = (translate: TFunction<'mutationsErrors'>, errorMessage: string) => {
  if (errorMessage?.startsWith('already_confirmed')) {
    return translate('alreadyConfirmed')
  }
  if (errorMessage?.startsWith('invalid_token')) {
    return translate('invalidToken')
  }
  return translate('default')
}

export const ConfirmedAccount: FC = () => {
  const [isConfirmError, setIsConfirmError] = useState('')
  const { handleConfirmAccount, isLoading, isSuccess } = useConfirmAccount()
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
      handleConfirmAccount({ email: 'mateki0@interia.pl', token }).catch((err) =>
        setIsConfirmError(customErrorMessage(t, err.message))
      )
    }
  }, [params])

  useEffect(() => {
    if (isConfirmError === t('invalidToken')) {
      createAlert('Confirm Error', isConfirmError, showModal)
    } else {
      isConfirmError && createAlert('Confirm Error', isConfirmError, navigateToLogin)
    }
  }, [isConfirmError])

  useEffect(() => {
    isSuccess && showModal()
  }, [isSuccess])

  if (isLoading) {
    return <ActivityIndicator color={colors.primary} />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PendingAccountConfirmationModal
        isVisible={isModalVisible}
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
