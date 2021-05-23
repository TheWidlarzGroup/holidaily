import React, { FC, useCallback, useEffect, useRef } from 'react'
import { StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Box, Text } from 'utils/theme/index'
import { isIos } from 'utils/layout'
import { minTwoWordsRegex, minOneSignRegex, emailRegex, passwordRegex } from 'utils/regex'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { useSignup } from 'hooks/useSignup'
import { createAlert } from 'utils/createAlert'
import { useBooleanState } from 'hooks/useBooleanState'
import { PendingAccountConfirmationModal } from './components/PendingAccountConfirmationModal'

export const SignupEmail: FC = () => {
  const { handleSignup, isLoading, signupErrorMessage, isSuccess } = useSignup()
  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const { control, handleSubmit, errors } = useForm()
  const { t } = useTranslation('signupEmail')
  const inputsRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)]

  const onSubmitEditing = (index: number) => {
    inputsRefs[index]?.current?.focus()
  }

  useEffect(() => {
    if (signupErrorMessage) createAlert('Signup Error', signupErrorMessage)
  }, [signupErrorMessage])

  useEffect(() => {
    if (isSuccess) showModal()
  }, [isSuccess, showModal])

  useFocusEffect(useCallback(() => hideModal(), [hideModal]))

  return (
    <SafeAreaWrapper>
      <Box flex={0.2} justifyContent="center">
        <Text variant="title1">{t('signupEmailTitle')}</Text>
      </Box>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} style={styles.keyboardAvoiding}>
        <Box marginHorizontal="l">
          <Box>
            <FormInput
              control={control}
              isError={!!errors.nameSurname}
              errors={errors}
              name="nameSurname"
              inputLabel={t('nameSurname')}
              validationPattern={minTwoWordsRegex}
              errorMessage={t('nameSurnameErrMsg')}
              onSubmitEditing={() => onSubmitEditing(0)}
              blurOnSubmit={false}
            />
          </Box>
          <Box>
            <FormInput
              control={control}
              isError={!!errors.companyName}
              errors={errors}
              name="companyName"
              inputLabel={t('companyName')}
              validationPattern={minOneSignRegex}
              errorMessage={t('nameSurnameErrMsg')}
              onSubmitEditing={() => onSubmitEditing(1)}
              blurOnSubmit={false}
              ref={inputsRefs[0]}
            />
          </Box>
          <Box>
            <FormInput
              control={control}
              isError={!!errors.email}
              errors={errors}
              name="email"
              inputLabel={t('email')}
              validationPattern={emailRegex}
              errorMessage={t('invalidEmailErr')}
              onSubmitEditing={() => onSubmitEditing(2)}
              keyboardType="email-address"
              autoCompleteType="email"
              blurOnSubmit={false}
              ref={inputsRefs[1]}
            />
          </Box>
          <Box>
            <FormInput
              control={control}
              isError={!!errors.password}
              errors={errors}
              name="password"
              inputLabel={t('password')}
              validationPattern={passwordRegex}
              errorMessage={t('nameSurnameErrMsg')}
              ref={inputsRefs[2]}
              signupPasswordHint={t('passwordHint')}
              isPasswordIconVisible
            />
          </Box>
          <Box marginTop="xxl">
            <Text variant="lightGreyBold" textAlign="center">
              {t('privacyPolicy')}
            </Text>
          </Box>
          <Box justifyContent="center" marginHorizontal="xxl" marginTop="m">
            <CustomButton
              variant="primary"
              label={t('signUpBtn')}
              onPress={handleSubmit(handleSignup)}
              loading={isLoading}
            />
          </Box>
        </Box>
      </KeyboardAvoidingView>
      <PendingAccountConfirmationModal isVisible={isModalVisible} hideModal={hideModal} />
    </SafeAreaWrapper>
  )
}

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
})
