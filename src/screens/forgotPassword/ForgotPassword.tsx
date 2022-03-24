import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme/index'
import { emailRegex } from 'utils/regex'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { useBooleanState } from 'hooks/useBooleanState'
import { TextLink } from 'components/TextLink'
import { useInitializePasswordReset } from 'hooks/legacy-api-hooks/useInitializePasswordReset'
import { InitializePasswordResetArgumentsTypes } from 'types/useInitializePasswordResetTypes'
import { useUserContext } from 'hooks/useUserContext'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ForgotPasswordErrorModal } from './components/ForgotPasswordErrorModal'

export const ForgotPassword: FC = () => {
  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const { control, errors, handleSubmit } = useForm()
  const { handleInitializePasswordReset, isLoading, initializePasswordResetErrorMessage } =
    useInitializePasswordReset()
  const { updateUser } = useUserContext()
  const { t } = useTranslation('forgotPassword')
  const styles = useStyles()

  useEffect(() => {
    if (initializePasswordResetErrorMessage) {
      showModal()
    }
  }, [initializePasswordResetErrorMessage, showModal])

  const onInitializePasswordResetSubmit = handleSubmit(
    (data: InitializePasswordResetArgumentsTypes) => {
      updateUser({ email: data.email })
      handleInitializePasswordReset(data)
    }
  )
  return (
    <SafeAreaWrapper>
      <KeyboardAwareScrollView style={styles.formContainer}>
        <Box justifyContent="center" paddingVertical="xxxl">
          <Text variant="title1">{t('forgotPasswordTitle')}</Text>
          <Text variant="body1" marginTop="s" marginHorizontal="l">
            {t('forgotPasswordSubTitle')}
          </Text>
        </Box>
        <Box>
          <FormInput
            control={control}
            errors={errors}
            isError={!!errors.email}
            name="email"
            inputLabel={t('email')}
            autoCapitalize="none"
            validationPattern={emailRegex}
            errorMessage={t('incorrectEmail')}
          />
        </Box>
        <Box alignSelf="flex-end" marginRight="m">
          <TextLink
            text={t('forgotPressableText')}
            action={() => console.log('navigate')}
            variant="remind1"
          />
        </Box>
      </KeyboardAwareScrollView>
      <Box marginBottom="xl" justifyContent="center" marginHorizontal="xxl">
        <CustomButton
          label={t('forgotResetButton')}
          variant="primary"
          onPress={onInitializePasswordResetSubmit}
          loading={isLoading}
        />
      </Box>
      <ForgotPasswordErrorModal
        isVisible={isModalVisible}
        hideModal={hideModal}
        subTitle="errorEmailSubTitle"
      />
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  formContainer: {
    paddingHorizontal: theme.spacing.l,
  },
}))
