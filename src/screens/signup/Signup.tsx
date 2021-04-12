import React, { FC, useCallback } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { Box, Text, theme } from '../../utils/theme/index'
import { CustomButton } from '../../components/CustomButton'
import { PendingAccountConfirmationModal } from './components/PendingAccountConfirmationModal'
import useBooleanState from '../../hooks/useBooleanState'
import { getHalfOfTheWindowWidth } from '../../utils/getHalfOfTheWindowWidth'

export const Signup: FC = () => {
  const navigation = useNavigation()
  const [state, { setFalse, setTrue }] = useBooleanState(false)
  const { t } = useTranslation('signup')

  const navigateToTestScreen = useCallback(() => {
    navigation.navigate('SignupEmail')
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={0.4} justifyContent="center" maxWidth={300}>
        <Text variant="title1">{t('signupTitle')}</Text>
        <Pressable onPress={setTrue}>
          <Text>Open Modal</Text>
        </Pressable>
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
      <PendingAccountConfirmationModal isVisible={state} onClose={setFalse} />
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
