import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Box, Text, theme } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'
import { RecoveryCodeInput } from 'components/RecoveryCodeInput'
import { RecoveryPasswordBar } from 'components/RecoveryPasswordBar'
import { useBooleanState } from 'hooks/useBooleanState'
import { Container } from 'components/Container'
import { useUserContext } from 'hooks/useUserContext'
import { useValidatePasswordResetCode } from 'legacy/api-hooks/useValidatePasswordResetCode'
import Clipboard from '@react-native-clipboard/clipboard'
import { AuthNavigationType } from 'navigation/types'
import { useInitializePasswordReset } from 'legacy/api-hooks/useInitializePasswordReset'
import { ForgotPasswordErrorModal } from '../forgotPassword/components/ForgotPasswordErrorModal'

type RouteProps = {
  key: string
  name: string
  params: {
    code: string
  }
}

export const RecoveryCode: FC = () => {
  const {
    handleValidatePasswordResetCode,
    isLoading,
    validatePasswordResetCodeErrorMessage,
    isSuccess,
  } = useValidatePasswordResetCode()
  const { handleInitializePasswordReset, isLoading: isLoadingResend } = useInitializePasswordReset()

  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const [recoveryCode, setRecoveryCode] = useState('')
  const [copiedCode, setCopiedCode] = useState('')
  const { t } = useTranslation('recoveryCode')
  const { params } = useRoute<RouteProps>()
  const { user } = useUserContext()
  const navigation = useNavigation<AuthNavigationType<'RecoveryCode'>>()

  useEffect(() => {
    if (params) {
      const { code } = params
      setCopiedCode(code)
    }
  }, [params])

  useEffect(() => {
    setCopiedCode('')
    if (!copiedCode && recoveryCode.length === 6) {
      handleValidatePasswordResetCode({ code: recoveryCode, email: user?.email ? user.email : '' })
    }
  }, [recoveryCode, copiedCode, user?.email, handleValidatePasswordResetCode])

  const onCodePaste = async () => {
    const text = await Clipboard.getString()
    if (text) {
      setRecoveryCode(text)
    }
  }

  const handleResendCode = () => {
    handleInitializePasswordReset({ email: user?.email ? user.email : '' })
  }

  useEffect(() => {
    if (validatePasswordResetCodeErrorMessage) {
      showModal()
    }
  }, [validatePasswordResetCodeErrorMessage, showModal])

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('NewPassword', {
        code: recoveryCode,
        email: user?.email ? user.email : '',
      })
    }
  }, [isSuccess, navigation, recoveryCode, user?.email])

  return (
    <Container>
      <RecoveryPasswordBar currentScreen="RecoveryCode" />
      <Box justifyContent="center" marginTop="xxl">
        <Text variant="title1">{t('recoveryCodeTitle')}</Text>
        <Text variant="body1" marginTop="s" marginHorizontal="l">
          {t('recoveryCodeSubTitle')}
        </Text>
      </Box>
      <Box marginHorizontal="xl" flex={1}>
        <RecoveryCodeInput cellCount={6} setValue={setRecoveryCode} value={recoveryCode} />
      </Box>
      <Box justifyContent="flex-end" marginHorizontal="xxl">
        <CustomButton
          label={t('resendCode')}
          variant="secondary"
          marginBottom={theme.spacing.m}
          onPress={handleResendCode}
          loading={isLoadingResend}
        />
        <CustomButton
          label={t('paste')}
          variant="primary"
          onPress={onCodePaste}
          loading={isLoading}
        />
      </Box>
      <ForgotPasswordErrorModal
        isVisible={isModalVisible}
        hideModal={hideModal}
        subTitle="errorRecoveryCodeSubTitle"
      />
    </Container>
  )
}
