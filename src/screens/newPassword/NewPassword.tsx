import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import { Box, Text, theme } from 'utils/theme/index'
import { colors } from 'utils/theme/colors'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { passwordRegex } from 'utils/regexes/passwordRegex'
import { RecoveryPasswordBar } from 'components/RecoveryPasswordBar'
import { isIos } from 'utils/isIos'
import { checkIfPasswordsMatch } from 'utils/checkIfPasswordsMatch'
import { PasswordUpdatedModal } from './components/PasswordUpdatedModal'
import useBooleanState from 'hooks/useBooleanState'

export const NewPassword: FC = () => {
  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const { t } = useTranslation(['recoveryCode', 'password'])
  const { control, handleSubmit, errors, getValues } = useForm()

  const handleUpdatePassword = () => {
    const password = getValues('password')
    const passwordConfirmation = getValues('confirmPassword')
    const passwordsAreEqual = checkIfPasswordsMatch(password, passwordConfirmation)
    passwordsAreEqual && showModal()
  }

  return (
    <KeyboardAvoidingView behavior={isIos() ? 'padding' : 'height'} style={styles.keyboardAvoiding}>
      <SafeAreaView style={styles.container}>
        <RecoveryPasswordBar currentScreen="NewPassword" />
        <Box flex={0.3} justifyContent="center">
          <Text variant="title1">{t('recoveryCodeTitle')}</Text>
          <Text variant="body1" marginTop="s" marginHorizontal="l">
            {t('enterNewPassword')}
          </Text>
        </Box>
        <Box marginHorizontal="l" marginTop="l">
          <Box marginBottom="m">
            <FormInput
              control={control}
              errors={errors}
              name="password"
              inputLabel={t('password:password')}
              validationPattern={passwordRegex}
              errorMessage={t('password:incorrectPassword')}
              required
            />
          </Box>
          <Box>
            <FormInput
              control={control}
              errors={errors}
              name="confirmPassword"
              inputLabel={t('password:confirmNewPassword')}
              validationPattern={passwordRegex}
              errorMessage={t('password:incorrectPassword')}
              required
            />
          </Box>
        </Box>
        <Box flex={0.4} justifyContent="center" marginHorizontal="xxl">
          <CustomButton
            label={t('updateButton')}
            variant="primary"
            onPress={handleSubmit(handleUpdatePassword)}
          />
        </Box>
        <PasswordUpdatedModal isVisible={isModalVisible} hideModal={hideModal} />
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
  leftBar: {
    marginRight: theme.spacing.s,
  },
})
