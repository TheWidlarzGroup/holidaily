import React, { FC, useCallback } from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { Box, Text, theme } from '../../utils/theme/index'
import { CustomButton } from '../../components/CustomButton'
import { getHalfOfTheWindowWidth } from '../../utils/getHalfOfTheWindowWidth'
import { ForgotPasswordErrorModal } from '../forgotPassword/components/ForgotPasswordErrorModal'
import { useState } from 'react'

export const Signup: FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const navigation = useNavigation()

  const { t } = useTranslation('signup')

  const navigateToTestScreen = useCallback(() => {
    navigation.navigate('SignupEmail')
  }, [navigation])

  const hideModal = () => {
    setIsVisible(false)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Box flex={0.4} justifyContent="center" maxWidth={300}>
        <Text variant="title1">{t('signupTitle')}</Text>
      </Box>
      <Pressable onPress={() => setIsVisible(true)}>
        <Text>Open modal</Text>
      </Pressable>
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
      <ForgotPasswordErrorModal isVisible={isVisible} hideModal={hideModal} />
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
