import React, { FC, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

import { AppNavigationType } from 'navigation/types'
import { Box, Text, theme } from 'utils/theme/index'
import { colors } from 'utils/theme/colors'
import { CustomButton } from 'components/CustomButton'
import { RecoveryCodeInput } from 'components/RecoveryCodeInput'
import { RecoveryPasswordBar } from 'components/RecoveryPasswordBar'
import useBooleanState from 'hooks/useBooleanState'
import { ForgotPasswordErrorModal } from '../forgotPassword/components/ForgotPasswordErrorModal'
import { useEffect } from 'react'
import { isIos } from 'utils/isIos'

export const RecoveryCode: FC = () => {
  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const [recoveryCode, setRecoveryCode] = useState('')
  const { t } = useTranslation('recoveryCode')

  const navigation = useNavigation<AppNavigationType<'RecoveryCode'>>()

  useEffect(() => {
    if (recoveryCode.length === 6 && recoveryCode !== '123456') {
      showModal()
    } else if (recoveryCode === '123456') {
      navigation.navigate('NewPassword')
    }
  }, [recoveryCode])

  return (
    <KeyboardAvoidingView behavior={isIos() ? 'padding' : 'height'} style={styles.keyboardAvoiding}>
      <SafeAreaView style={styles.container}>
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
        <Box flex={0.3} justifyContent="center" marginHorizontal="xxl">
          <CustomButton label={t('paste')} variant="primary" marginBottom={theme.spacing.m} />
          <CustomButton label={t('resendCode')} variant="secondary" />
        </Box>
        <ForgotPasswordErrorModal
          isVisible={isModalVisible}
          hideModal={hideModal}
          subTitle="errorRecoveryCodeSubTitle"
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
})
