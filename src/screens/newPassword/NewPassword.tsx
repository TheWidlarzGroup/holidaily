import React, { FC, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import { Box, Text, theme } from '../../utils/theme/index'
import { colors } from '../../utils/theme/colors'
import { FormInput } from '../../components/FormInput'
import { CustomButton } from '../../components/CustomButton'
import { minPasswordLengthRegex } from '../../utils/regexes/minPasswordLengthRegex'

export const NewPassword: FC = () => {
  const { t } = useTranslation(['recoveryCode', 'password'])
  const { control, handleSubmit, errors } = useForm()
  const barColor = useSharedValue('#E1E1E1')

  const progressStyle = useAnimatedStyle(() => ({
    backgroundColor: (barColor.value = '#FFB051'),
  }))
  useEffect(() => {})
  return (
    <SafeAreaView style={styles.container}>
      <Box flexDirection="row" paddingHorizontal="m" justifyContent="space-between">
        <Box backgroundColor="primary" style={styles.bar} marginRight="s" />

        <Animated.View style={[styles.rightBar, progressStyle]}>
          <Box backgroundColor="primary" style={styles.bar} />
        </Animated.View>
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
  rightBar: {
    flex: 1,
    marginLeft: theme.spacing.s,
  },
})
