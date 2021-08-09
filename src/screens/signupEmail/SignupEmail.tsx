import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Box, mkUseStyles, Text, theme, Theme } from 'utils/theme/index'
import { shadow } from 'utils/theme/shadows'
import { minOneSignRegex, emailRegex, passwordRegex, minOneWordRegex } from 'utils/regex'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { useCreateOrganization } from 'hooks/useCreateOrganization'
import { createAlert } from 'utils/createAlert'
import { useBooleanState } from 'hooks/useBooleanState'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { PendingAccountConfirmationModal } from './components/PendingAccountConfirmationModal'

const BOTTOM_TAB_HEIGHT = 146

export const SignupEmail = () => {
  const { handleSignup, isLoading, signupErrorMessage, isSuccess } = useCreateOrganization()
  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const [bottomTabHeight, setBottomTabHeight] = useState(BOTTOM_TAB_HEIGHT)
  const { control, handleSubmit, errors } = useForm()
  const { t } = useTranslation('signupEmail')
  const inputsRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ]

  const styles = useStyles()

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
      <KeyboardAwareScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <Box justifyContent="center" paddingVertical="xxxl">
          <Text variant="title1">{t('signupEmailTitle')}</Text>
        </Box>
        <Box>
          <FormInput
            control={control}
            isError={!!errors.firstName}
            errors={errors}
            name="firstName"
            inputLabel={t('name')}
            validationPattern={minOneWordRegex}
            errorMessage={t('nameSurnameErrMsg')}
            onSubmitEditing={() => onSubmitEditing(0)}
            blurOnSubmit={false}
          />
        </Box>
        <Box>
          <FormInput
            control={control}
            isError={!!errors.lastName}
            errors={errors}
            name="lastName"
            inputLabel={t('surname')}
            validationPattern={minOneWordRegex}
            errorMessage={t('nameSurnameErrMsg')}
            onSubmitEditing={() => onSubmitEditing(1)}
            blurOnSubmit={false}
            ref={inputsRefs[0]}
          />
        </Box>
        <Box>
          <FormInput
            control={control}
            isError={!!errors.organizationName}
            errors={errors}
            name="organizationName"
            inputLabel={t('organizationName')}
            validationPattern={minOneSignRegex}
            errorMessage={t('nameSurnameErrMsg')}
            onSubmitEditing={() => onSubmitEditing(2)}
            blurOnSubmit={false}
            ref={inputsRefs[1]}
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
            onSubmitEditing={() => onSubmitEditing(3)}
            keyboardType="email-address"
            autoCompleteType="email"
            autoCapitalize="none"
            blurOnSubmit={false}
            ref={inputsRefs[2]}
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
            ref={inputsRefs[3]}
            signupPasswordHint={t('passwordHint')}
            isPasswordIconVisible
          />
        </Box>
        <Box height={bottomTabHeight + theme.spacing.lplus} />
      </KeyboardAwareScrollView>
      <Box
        position="absolute"
        right={0}
        left={0}
        bottom={0}
        backgroundColor="white"
        paddingBottom="l"
        alignItems="center"
        style={shadow.xs}
        onLayout={({ nativeEvent }) => {
          setBottomTabHeight(nativeEvent.layout.height)
        }}>
        <Box marginHorizontal="xxl" marginTop="m">
          <CustomButton
            variant="primary"
            label={t('signUpBtn')}
            onPress={handleSubmit(handleSignup)}
            loading={isLoading}
          />
        </Box>
        <Box marginTop="l">
          <Text variant="lightGreyBold" textAlign="center">
            {t('privacyPolicy')}
          </Text>
        </Box>
      </Box>
      <PendingAccountConfirmationModal isVisible={isModalVisible} hideModal={hideModal} />
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  formContainer: {
    marginHorizontal: theme.spacing.l,
  },
}))
