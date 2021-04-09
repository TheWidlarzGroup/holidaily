import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import { Box, Text } from '../../utils/theme/index'
import { colors } from '../../utils/theme/colors'
import { FormInput } from '../../components/FormInput'
import { CustomButton } from '../../components/CustomButton'
import { minPasswordLengthRegex } from '../../utils/regexes/minPasswordLengthRegex'

export const NewPassword: FC = () => {
  const { t } = useTranslation(['recoveryCode', 'password'])
  const { control, handleSubmit, errors } = useForm()

  return (
    <SafeAreaView style={styles.container}>
      <Box flexDirection="row" paddingHorizontal="m" justifyContent="space-between">
        <Box backgroundColor="primary" style={styles.bar} marginRight="s" />
        <Box backgroundColor="primary" style={styles.bar} marginLeft="s" />
      </Box>
      <Box flex={0.2} justifyContent="center">
        <Text variant="title1">{t('recoveryCodeTitle')}</Text>
        <Text variant="body1" marginTop="s" marginHorizontal="l">
          {t('newPassword')}
        </Text>
      </Box>
      <Box marginHorizontal="l">
        <Box marginBottom="m">
          <FormInput
            control={control}
            errors={errors}
            name="password"
            inputText="Password"
            validationPattern={minPasswordLengthRegex}
            errorMessage="Incorrect Password, please try again"
          />
        </Box>
        <Box>
          <FormInput
            control={control}
            errors={errors}
            name="password"
            inputText="Confirm new password"
            validationPattern={minPasswordLengthRegex}
            errorMessage="Incorrect Password, please try again"
          />
        </Box>
      </Box>
      <Box flex={0.4} justifyContent="center" marginHorizontal="xxl">
        <CustomButton label={t('updateButton')} variant="primary" />
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bar: {
    flex: 1,
    height: 4,
  },
})
