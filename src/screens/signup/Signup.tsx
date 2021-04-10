import React, { FC } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTranslation } from 'react-i18next'
import { Box, Text, theme } from '../../utils/theme/index'
import { CustomButton } from '../../components/CustomButton'
import { CustomModal } from '../../components/CustomModal'
import { colors } from '../../utils/theme/colors'
import { FirstRegisterDialogBox } from '../../components/FirstRegisterDialogBox'
import { SecondRegisterDialogBox } from '../../components/SecondRegisterDialogBox'
import useBooleanState from '../../hooks/useBooleanState'
import { getSquareDimension } from '../../utils/getSquareDimension'

export const Signup: FC = () => {
  const [state, { setFalse, setTrue }] = useBooleanState(false)
  const { t } = useTranslation('signup')

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={0.4} justifyContent="center" maxWidth={300}>
        <Text variant="title1">{t('signupTitle')}</Text>
        <Pressable onPress={setTrue}>
          <Text>Open Modal</Text>
        </Pressable>
      </Box>
      <Box
        width={getSquareDimension()}
        height={getSquareDimension()}
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
        <CustomButton label={t('signupWEmail')} variant="primary" marginTop={theme.spacing.xl} />
      </Box>
      <CustomModal
        isVisible={state}
        onBackButtonPress={setFalse}
        onBackdropPress={setFalse}
        backdropColor={colors.white}
        animationInTiming={600}
        animationOutTiming={400}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={400}
        backdropOpacity={0.8}
        style={styles.modal}
        hideModalContentWhileAnimating>
        <FirstRegisterDialogBox />
      </CustomModal>
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
