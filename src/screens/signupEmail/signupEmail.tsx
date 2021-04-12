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

export const SignupEmail: FC = () => {
  const { control, handleSubmit, errors } = useForm()
  const { t } = useTranslation('signupEmail')
  return (
    <KeyboardAvoidingView behavior={isIos() ? 'padding' : 'height'} style={styles.keyboardAvoiding}>
      <SafeAreaView style={styles.container}>
      <Box marginHorizontal="l">
          <Box marginBottom="m">
            <FormInput
              control={control}
              errors={errors}
              name="email"
              inputLabel="E-mail Address"
              validationPattern={emailRegex}
              errorMessage="Incorrect email, please try again"
              keyboardType="email-address"
              autoCompleteType="email"
              onSubmitEditing={onSubmitEditing}
              blurOnSubmit={false}
              required
            />
          </Box>
        </Box>
      </SafeAreaView>
      </KeyboardAvoidingView>
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
