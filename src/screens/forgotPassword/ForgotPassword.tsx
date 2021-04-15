import React, { FC } from 'react'
import { Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import { AppNavigationType } from 'navigation/types'
import { Box, Text, theme } from 'utils/theme/index'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { emailRegex } from 'utils/regexes/emailRegex'
import useBooleanState from 'hooks/useBooleanState'
import { ForgotPasswordErrorModal } from '../forgotPassword/components/ForgotPasswordErrorModal'

import { Container } from 'components/Container'

export const ForgotPassword: FC = () => {
  const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
  const { control, handleSubmit, errors, getValues } = useForm()
  const { t } = useTranslation('forgotPassword')
  const navigation = useNavigation<AppNavigationType<'ForgotPassword'>>()

  const handlePasswordReset = () => {
    const email = getValues('email')

    if (email === 'janKowalski@twg.com') {
      navigation.navigate('RecoveryCode')
    } else {
      showModal()
    }
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
            name="email"
            inputLabel={t('email')}
            validationPattern={emailRegex}
            errorMessage={t('incorrectEmail')}
          />
        </Box>
        <Box alignSelf="flex-end">
          <Pressable>
            <Text variant="remind1" marginRight="m">
              {t('forgotPressableText')}
            </Text>
          </Pressable>
        </Box>
      </Box>
      <Box flex={0.4} justifyContent="center" marginHorizontal="xxl">
        <CustomButton
          label={t('forgotResetButton')}
          variant="primary"
          paddingVertical={theme.spacing.xs}
          onPress={handlePasswordReset}
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
