import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationType } from 'navigation/types'

type SecondRegisterDialogBoxTypes = {
  hideModal: () => void
}

export const SecondRegisterDialogBox = ({ hideModal }: SecondRegisterDialogBoxTypes) => {
  const { t } = useTranslation('modal')

  const navigation = useNavigation<AuthNavigationType<'ConfirmedAccount'>>()

  const navigateToLogin = useCallback(() => {
    hideModal()
    navigation.navigate('Login')
  }, [navigation, hideModal])

  return (
    <Box backgroundColor="primary" alignItems="center" padding="lplus" borderRadius="mplus">
      <Text variant="boldBlackCenter18">{t('dialogBox2Title')}</Text>
      <Box
        backgroundColor="tertiary"
        marginVertical="xxl"
        borderRadius="xm"
        width={59}
        height={59}
      />
      <Text variant="body1">{t('dialogBox2SubTitle')}</Text>
      <Box paddingBottom="m">
        <TouchableOpacity activeOpacity={1} onPress={navigateToLogin}>
          <CustomButton label={t('dialog2SecondButton')} variant="secondary" />
        </TouchableOpacity>
      </Box>
      <Box marginTop="l" marginBottom="m">
        <TouchableOpacity activeOpacity={1} onPress={navigateToLogin}>
          <CustomButton label={t('dialog2FirstButton')} variant="alternative" />
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
