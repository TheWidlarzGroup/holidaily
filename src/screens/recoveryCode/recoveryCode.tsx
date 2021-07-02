import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRoute } from '@react-navigation/native'

import { Box, Text, theme } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'
import { RecoveryCodeInput } from 'components/RecoveryCodeInput'
import { RecoveryPasswordBar } from 'components/RecoveryPasswordBar'
import { useBooleanState } from 'hooks/useBooleanState'
import { Container } from 'components/Container'
import { useUserContext } from 'hooks/useUserContext'
import { useValidatePasswordResetCode } from 'hooks/useValidatePasswordResetCode'
import { ForgotPasswordErrorModal } from '../forgotPassword/components/ForgotPasswordErrorModal'

type RouteProps = {
  key: string
  name: string
  params: {
    code: string
  }
}

export const RecoveryCode: FC = () => {
  const { handleValidatePasswordResetCode, isLoading, validatePasswordResetCodeErrorMessage } =
    useValidatePasswordResetCode()
  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const [recoveryCode, setRecoveryCode] = useState('')
  const [copiedCode, setCopiedCode] = useState('')
  const { t } = useTranslation('recoveryCode')
  const { params } = useRoute<RouteProps>()
  const { user } = useUserContext()

  useEffect(() => {
    if (params) {
      const { code } = params
      setCopiedCode(code)
    }
  }, [params])

  useEffect(() => {
    setCopiedCode('')
    if (!copiedCode && recoveryCode.length === 6) {
      handleValidatePasswordResetCode({ code: recoveryCode, email: 'user.email' })
    }
  }, [recoveryCode, copiedCode, user.email, handleValidatePasswordResetCode])

  const onValidatePasswordResetCode = () => {
    setRecoveryCode(copiedCode)
    handleValidatePasswordResetCode({ code: copiedCode, email: user.email })
  }

  useEffect(() => {
    if (validatePasswordResetCodeErrorMessage) {
      showModal()
    }
  }, [validatePasswordResetCodeErrorMessage, showModal])

  return (
    <Container>
      <RecoveryPasswordBar currentScreen="RecoveryCode" />
      <Box flex={0.2} justifyContent="center">
        <Text variant="title1">{t('recoveryCodeTitle')}</Text>
        <Text variant="body1" marginTop="s" marginHorizontal="l">
          {t('recoveryCodeSubTitle')}
        </Text>
      </Box>
      <Box flex={0.2} marginHorizontal="xl">
        <RecoveryCodeInput cellCount={6} setValue={setRecoveryCode} value={recoveryCode} />
      </Box>
      <Box flex={0.5} justifyContent="flex-end" marginHorizontal="xxl">
        <CustomButton label={t('resendCode')} variant="secondary" marginBottom={theme.spacing.m} />
        <CustomButton
          label={t('paste')}
          variant="primary"
          onPress={onValidatePasswordResetCode}
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
