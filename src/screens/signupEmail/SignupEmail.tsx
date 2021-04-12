import React, { FC, useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Pressable, Alert, KeyboardAvoidingView } from 'react-native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { colors } from '../../utils/theme/colors'
import { Box, Text, theme } from '../../utils/theme/index'
import { FormInput } from '../../components/FormInput'
import { emailRegex } from '../../utils/regexes/emailRegex'
import { minPasswordLengthRegex } from '../../utils/regexes/minPasswordLengthRegex'
import { isIos } from '../../utils/isIos'
import { CustomButton } from '../../components/CustomButton'

export const SignupEmail: FC = () => {
  const { control, handleSubmit, errors } = useForm()
  const { t } = useTranslation('signupEmail')
  return (
    <KeyboardAvoidingView behavior={isIos() ? 'padding' : 'height'} style={styles.keyboardAvoiding}>
      <SafeAreaView style={styles.container}>
        <Box flex={0.4} justifyContent="center">
          <Text variant="title1">{t('signupEmailTitle')}</Text>
        </Box>
        <Box marginHorizontal="l">
          <Box marginBottom="m">
            <FormInput
              control={control}
              errors={errors}
              name="nameSurname"
              inputLabel={t('nameSurname')}
              validationPattern={emailRegex}
              errorMessage={t('nameSurnameErrMsg')}
              blurOnSubmit={false}
              required
            />
          </Box>
          <Box marginBottom="m">
            <FormInput
              control={control}
              errors={errors}
              name="companyName"
              inputLabel={t('companyName')}
              validationPattern={emailRegex}
              errorMessage={t('nameSurnameErrMsg')}
              blurOnSubmit={false}
              required
            />
          </Box>
          <Box marginBottom="m">
            <FormInput
              control={control}
              errors={errors}
              name="email"
              inputLabel={t('email')}
              validationPattern={emailRegex}
              errorMessage={t('invalidEmailErr')}
              blurOnSubmit={false}
              required
            />
          </Box>
          <Box marginBottom="m">
            <FormInput
              control={control}
              errors={errors}
              name="password"
              inputLabel={t('password')}
              validationPattern={minPasswordLengthRegex}
              errorMessage={t('nameSurnameErrMsg')}
              keyboardType="email-address"
              autoCompleteType="email"
              blurOnSubmit={false}
              signupPasswordHint={t('passwordHint')}
              required
            />
          </Box>
          <Box marginTop="xxl">
            <Text variant="lightGreyBold" textAlign="center">
              {t('privacyPolicy')}
            </Text>
          </Box>
          <Box justifyContent="center" marginHorizontal="xxl" marginTop="m">
            <CustomButton variant="primary" label={t('signUpBtn')} />
          </Box>
        </Box>
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

  input: {
    height: 50,
    backgroundColor: colors.lightGrey,
    borderRadius: theme.borderRadii.xxl,
    paddingHorizontal: theme.spacing.m,
  },
})
