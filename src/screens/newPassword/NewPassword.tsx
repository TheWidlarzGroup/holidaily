import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import { Box, Text, theme } from '../../utils/theme/index'
import { colors } from '../../utils/theme/colors'
import { FormInput } from '../../components/FormInput'
import { CustomButton } from '../../components/CustomButton'
import { minPasswordLengthRegex } from '../../utils/regexes/minPasswordLengthRegex'
import { RecoveryPasswordBar } from '../../components/RecoveryPasswordBar'

const checkIfPasswordsMatch = (password1: string, password2: string) => password1 === password2

export const NewPassword: FC = () => {
  const { t } = useTranslation(['recoveryCode', 'password'])
  const { control, handleSubmit, errors, getValues } = useForm()

  return (
    <SafeAreaView style={styles.container}>
      <RecoveryPasswordBar currentScreen="NewPassword" />
      <Box flex={0.2} justifyContent="center">
        <Text variant="title1">{t('recoveryCodeTitle')}</Text>
        <Text variant="body1" marginTop="s" marginHorizontal="l">
          {t('enterNewPassword')}
        </Text>
      </Box>
      <Box marginHorizontal="l" marginTop="l">
        <Box marginBottom="m">
          <FormInput
            control={control}
            errors={errors}
            name="password"
            inputLabel={t('password:password')}
            validationPattern={minPasswordLengthRegex}
            errorMessage={t('password:incorrectPassword')}
          />
        </Box>
        <Box>
          <FormInput
            control={control}
            errors={errors}
            name="confirmPassword"
            inputLabel={t('password:confirmNewPassword')}
            validationPattern={minPasswordLengthRegex}
            errorMessage={t('password:incorrectPassword')}
          />
        </Box>
      </Box>
      <Box flex={0.4} justifyContent="center" marginHorizontal="xxl">
        <CustomButton
          label={t('updateButton')}
          variant="primary"
          onPress={() =>
            console.log(checkIfPasswordsMatch(getValues('password'), getValues('confirmPassword')))
          }
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
  leftBar: {
    marginRight: theme.spacing.s,
  },
})
