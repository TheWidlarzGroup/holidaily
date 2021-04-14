import React, { FC, useCallback } from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Text, theme } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'
import { getHalfOfTheWindowWidth } from 'utils/getHalfOfTheWindowWidth'

export const Signup: FC = () => {
  const navigation = useNavigation()

  const { t } = useTranslation('signup')

  const navigateToTestScreen = useCallback(() => {
    navigation.navigate('SignupEmail')
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={0.4} justifyContent="center" maxWidth={300}>
        <Text variant="title1">{t('signupTitle')}</Text>
      </Box>
      <Box
        width={getHalfOfTheWindowWidth()}
        height={getHalfOfTheWindowWidth()}
        backgroundColor="secondary"
        borderRadius="m"
        alignSelf="center"
      />
      <Box flex={0.6} justifyContent="center" marginHorizontal="xl">
        <CustomButton label={t('continueWGmail')} variant="secondary" icon="google" />
        <CustomButton
          label={t('continueWSlack')}
          variant="secondary"
          icon="slack"
          marginTop={theme.spacing.m}
        />
        <CustomButton
          label={t('signupWEmail')}
          variant="primary"
          marginTop={theme.spacing.xl}
          onPress={navigateToTestScreen}
        />
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  modal: {
    marginHorizontal: theme.spacing.l,
  },
})
