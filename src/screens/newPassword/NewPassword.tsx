import React, { FC, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { Box, Text, theme } from '../../utils/theme/index'
import { colors } from '../../utils/theme/colors'
import { FormInput } from '../../components/FormInput'
import { CustomButton } from '../../components/CustomButton'
import { minPasswordLengthRegex } from '../../utils/regexes/minPasswordLengthRegex'

const checkIfPasswordsMatch = (password1: string, password2: string) => password1 === password2

export const NewPassword: FC = () => {
  const { t } = useTranslation(['recoveryCode', 'password'])
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { control, handleSubmit, errors, getValues } = useForm()
  const barColor = useSharedValue('#E1E1E1')

  const progressStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(barColor.value, {
      duration: 1500,
    }),
  }))

  useEffect(() => {
    barColor.value = '#FFB051'
  })

  return (
    <SafeAreaView style={styles.container}>
      <Box flexDirection="row" paddingHorizontal="m" justifyContent="space-between">
        <Box backgroundColor="primary" style={styles.bar} marginRight="s" />

        <Animated.View style={[styles.rightBar, progressStyle]}>
          <Box style={styles.bar} />
        </Animated.View>
      </Box>
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
            inputText={t('password:password')}
            validationPattern={minPasswordLengthRegex}
            errorMessage={t('password:incorrectPassword')}
          />
        </Box>
        <Box>
          <FormInput
            control={control}
            errors={errors}
            name="confirmPassword"
            inputText={t('password:confirmNewPassword')}
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
  bar: {
    flex: 1,
    height: 4,
  },
  rightBar: {
    flex: 1,
    marginLeft: theme.spacing.s,
  },
})
