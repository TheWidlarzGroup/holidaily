import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

import { AppNavigationType } from '../../navigation/types'
import { Box, Text, theme } from '../../utils/theme/index'
import { colors } from '../../utils/theme/colors'
import { CustomButton } from '../../components/CustomButton'

export const RecoveryCode: FC = () => {
  const { t } = useTranslation('recoveryCode')

  const navigation = useNavigation<AppNavigationType<'RecoveryCode'>>()
  return (
    <SafeAreaView style={styles.container}>
      <Box flexDirection="row" paddingHorizontal="m" justifyContent="space-between">
        <Box backgroundColor="primary" style={styles.bar} marginRight="s" />
        <Box backgroundColor="lightGrey" style={styles.bar} marginLeft="s" />
      </Box>
      <Box flex={0.2} justifyContent="center">
        <Text variant="title1">{t('recoveryCodeTitle')}</Text>
        <Text variant="body1" marginTop="s" marginHorizontal="l">
          {t('recoveryCodeSubTitle')}
        </Text>
      </Box>
      <Box flex={0.4} justifyContent="center" marginHorizontal="xxl">
        <CustomButton
          label={t('paste')}
          variant="primary"
          marginBottom={theme.spacing.m}
          onPress={() => navigation.navigate('NewPassword')}
        />
        <CustomButton label={t('resendCode')} variant="secondary" />
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
