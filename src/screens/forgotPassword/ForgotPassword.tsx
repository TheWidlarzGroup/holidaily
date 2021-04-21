import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import { AuthNavigationType } from 'navigation/types'
import { Box, Text } from 'utils/theme/index'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { emailRegex } from 'utils/regexes/emailRegex'
import useBooleanState from 'hooks/useBooleanState'
import { Container } from 'components/Container'
import { ForgotPasswordErrorModal } from './components/ForgotPasswordErrorModal'

const simulateLoading = () => new Promise((r) => setTimeout(r, 1000))

export const ForgotPassword: FC = () => {
  const [isLoading, { setFalse: endLoading, setTrue: startLoading }] = useBooleanState(false)
  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const { control, errors, getValues } = useForm()
  const { t } = useTranslation('forgotPassword')
  const navigation = useNavigation<AuthNavigationType<'ForgotPassword'>>()

  const handlePasswordReset = () => {
    // Hard coded for now, just for testing and presentation
    startLoading()
    simulateLoading().then(() => {
      const email = getValues('email')

      if (email === 'janKowalski@twg.com') {
        navigation.navigate('RecoveryCode')
      } else {
        showModal()
      }
      endLoading()
    })
  }

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
        <Box alignSelf="flex-end">
          <TouchableOpacity>
            <Text variant="remind1" marginRight="m">
              {t('forgotPressableText')}
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
      <Box flex={0.4} justifyContent="center" marginHorizontal="xxl">
        <CustomButton
          label={t('forgotResetButton')}
          variant="primary"
          onPress={handlePasswordReset}
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
