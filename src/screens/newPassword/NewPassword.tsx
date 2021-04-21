import React, { FC, useRef, useEffect } from 'react'
import { TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import { Box, Text } from 'utils/theme/index'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { passwordRegex } from 'utils/regexes/passwordRegex'
import { RecoveryPasswordBar } from 'components/RecoveryPasswordBar'
import { checkIfPasswordsMatch } from 'utils/checkIfPasswordsMatch'
import useBooleanState from 'hooks/useBooleanState'
import { Container } from 'components/Container'
import { PasswordUpdatedModal } from './components/PasswordUpdatedModal'

export const NewPassword: FC = () => {
  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const [
    arePasswordsEqual,
    { setFalse: setPasswordsAreNotEqual, setTrue: setArePasswordsEqual },
  ] = useBooleanState(true)
  const { t } = useTranslation(['recoveryCode', 'password'])
  const { control, handleSubmit, errors, watch } = useForm()
  const passwordConfirmationRef = useRef<TextInput>(null)

  useEffect(() => {
    const { password, confirmPassword } = watch(['password', 'confirmPassword'])
    const passwordsAreEqual = checkIfPasswordsMatch(password, confirmPassword)

    !passwordsAreEqual ? setPasswordsAreNotEqual() : setArePasswordsEqual()
  }, [watch('password'), watch('confirmPassword')])

  const handleUpdatePassword = () => arePasswordsEqual && showModal()

  const onSubmitEditing = () => {
    passwordConfirmationRef?.current?.focus()
  }

  return (
    <Container>
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
            isError={!!errors.password || !arePasswordsEqual}
            errors={errors}
            name="password"
            inputLabel={t('password:password')}
            validationPattern={passwordRegex}
            errorMessage={t('password:incorrectPassword')}
            screenName="NewPassword"
            passwordsAreEqual={arePasswordsEqual}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={false}
            required
            isPasswordIconVisible
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
            required
            isPasswordIconVisible
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
    </Container>
  )
}
