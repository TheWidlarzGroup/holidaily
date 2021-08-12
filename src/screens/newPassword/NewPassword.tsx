import React, { FC, useRef, useEffect } from 'react'
import { TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Box, Text } from 'utils/theme/index'
import { passwordRegex } from 'utils/regex'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { RecoveryPasswordBar } from 'components/RecoveryPasswordBar'
import { checkIfPasswordsMatch } from 'utils/checkIfPasswordsMatch'
import { useBooleanState } from 'hooks/useBooleanState'
import { Container } from 'components/Container'
import { useResetPassword } from 'hooks/useResetPassword'
import { useRoute } from '@react-navigation/native'
import { PasswordUpdatedModal } from './components/PasswordUpdatedModal'

type NewPasswordRouteProps = {
  key: string
  name: string
  params: { code: string; email: string }
}

export const NewPassword: FC = () => {
  const { handleResetPassword, isLoading, isSuccess } = useResetPassword()
  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const [arePasswordsEqual, { setFalse: setPasswordsAreNotEqual, setTrue: setArePasswordsEqual }] =
    useBooleanState(true)
  const { t } = useTranslation(['recoveryCode', 'password'])
  const { control, handleSubmit, errors, watch } = useForm()
  const passwordConfirmationRef = useRef<TextInput>(null)
  const { params } = useRoute<NewPasswordRouteProps>()

  const { password, confirmPassword } = watch(['password', 'confirmPassword'])

  useEffect(() => {
    const passwordsAreEqual = checkIfPasswordsMatch(password, confirmPassword)

    if (!passwordsAreEqual) {
      setPasswordsAreNotEqual()
    } else {
      setArePasswordsEqual()
    }
  }, [password, confirmPassword, setArePasswordsEqual, setPasswordsAreNotEqual, watch])

  const handleUpdatePassword = () => {
    if (arePasswordsEqual) {
      handleResetPassword({
        code: params.code,
        email: params.email,
        newPassword: password,
        newPasswordConfirmation: confirmPassword,
      })
    }
  }
  useEffect(() => {
    if (isSuccess) {
      showModal()
    }
  }, [isSuccess, showModal])

  const onSubmitEditing = () => {
    passwordConfirmationRef?.current?.focus()
  }

  return (
    <Container>
      <RecoveryPasswordBar currentScreen="NewPassword" />
      <Box justifyContent="center" marginTop="xxl">
        <Text variant="title1">{t('recoveryCodeTitle')}</Text>
        <Text variant="body1" marginTop="s" marginHorizontal="l">
          {t('enterNewPassword')}
        </Text>
      </Box>
      <Box marginHorizontal="l" marginTop="xl" flex={1}>
        <Box marginBottom="m">
          <FormInput
            control={control}
            isError={!!errors.password || !arePasswordsEqual}
            errors={errors}
            name="password"
            inputLabel={t('password:newPassword')}
            validationPattern={passwordRegex}
            errorMessage={t('password:incorrectPassword')}
            screenName="NewPassword"
            passwordsAreEqual={arePasswordsEqual}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={false}
            isPasswordIconVisible
            textContentType={'oneTimeCode'}
          />
        </Box>
        <Box>
          <FormInput
            control={control}
            isError={!!errors.confirmPassword || !arePasswordsEqual}
            errors={errors}
            name="confirmPassword"
            inputLabel={t('password:confirmNewPassword')}
            validationPattern={passwordRegex}
            errorMessage={t('password:incorrectPassword')}
            screenName="NewPassword"
            passwordsAreEqual={arePasswordsEqual}
            ref={passwordConfirmationRef}
            isPasswordIconVisible
            textContentType={'oneTimeCode'}
          />
        </Box>
      </Box>
      <Box justifyContent="center" marginHorizontal="xxl">
        <CustomButton
          label={t('updateButton')}
          variant="primary"
          onPress={handleSubmit(handleUpdatePassword)}
          loading={isLoading}
        />
      </Box>
      <PasswordUpdatedModal isVisible={isModalVisible} hideModal={hideModal} />
    </Container>
  )
}
