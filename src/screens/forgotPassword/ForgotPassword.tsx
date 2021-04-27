import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import { Box, Text } from 'utils/theme/index'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { emailRegex } from 'utils/regexes/emailRegex'
import useBooleanState from 'hooks/useBooleanState'
import { Container } from 'components/Container'
import { TextLink } from 'components/TextLink'
import { useInitializePasswordReset } from 'hooks/useInitializePasswordReset'
import { InitializePasswordResetArgumentsTypes } from 'types/useInitializePasswordResetTypes'
import { useUserContext } from 'hooks/useUserContext'
import { ForgotPasswordErrorModal } from './components/ForgotPasswordErrorModal'

export const ForgotPassword: FC = () => {
  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const { control, errors, handleSubmit } = useForm()
  const {
    handleInitializePasswordReset,
    isLoading,
    initializePasswordResetErrorMessage,
  } = useInitializePasswordReset()
  const { updateUser } = useUserContext()
  const { t } = useTranslation('forgotPassword')

  useEffect(() => {
    if (initializePasswordResetErrorMessage) {
      showModal()
    }
  }, [initializePasswordResetErrorMessage])

  const onInitializePasswordResetSubmit = handleSubmit(
    (data: InitializePasswordResetArgumentsTypes) => {
      updateUser({ email: data.email })
      handleInitializePasswordReset(data)
    }
  )
  return (
    <Container>
      <Box flex={0.3} justifyContent="center">
        <Text variant="title1">{t('forgotPasswordTitle')}</Text>
        <Text variant="body1" marginTop="s" marginHorizontal="l">
          {t('forgotPasswordSubTitle')}
        </Text>
      </Box>
      <Box marginHorizontal="l">
        <Box>
          <FormInput
            control={control}
            errors={errors}
            isError={!!errors.email}
            name="email"
            inputLabel={t('email')}
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
      </Box>
      <Box flex={0.4} justifyContent="center" marginHorizontal="xxl">
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
    </Container>
  )
}
