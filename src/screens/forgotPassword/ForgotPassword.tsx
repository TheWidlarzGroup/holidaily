import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import { Box, Text, theme } from '../../utils/theme/index'
import { colors } from '../../utils/theme/colors'
import { FormInput } from '../../components/FormInput'
import { CustomButton } from '../../components/CustomButton'
import { emailRegex } from '../../utils/regexes/emailRegex'

export const ForgotPassword: FC = () => {
  const { control, handleSubmit, errors } = useForm()
  const { t } = useTranslation('forgotPassword')

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={0.3} justifyContent="center">
        <Text variant="title1">{t('forgotPasswordTitle')}</Text>
        <Text variant="body1" marginTop="s" marginHorizontal="l">
          {t('forgotPasswordSubTitle')}
        </Text>
      </Box>
      <Box marginHorizontal="l">
        <Box marginBottom="m">
          <FormInput
            control={control}
            errors={errors}
            name="email"
            inputText="E-mail Address"
            validationPattern={emailRegex}
            errorMessage="Incorrect email, please try again"
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
        />
      </Box>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
})
