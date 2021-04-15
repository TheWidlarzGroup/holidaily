import React, { FC, useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Box, Text, theme } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationType } from 'navigation/types'

type SecondRegisterDialogBoxTypes = {
  hideModal: () => void
}

export const SecondRegisterDialogBox: FC<SecondRegisterDialogBoxTypes> = ({ hideModal }) => {
  const { t } = useTranslation('modal')

  const navigation = useNavigation<AppNavigationType<'ConfirmedAccount'>>()

  const navigateToLogin = useCallback(() => {
    hideModal()
    navigation.navigate('Login')
  }, [navigation])

  return (
    <Box backgroundColor="primary" alignItems="center" padding="lplus" borderRadius="mplus">
      <Text variant="boldBlack18">{t('dialogBox2Title')}</Text>
      <Box
        backgroundColor="tertiary"
        marginVertical="xxl"
        borderRadius="xm"
        width={59}
        height={59}
      />
      <Text variant="body1">{t('dialogBox2SubTitle')}</Text>
      <Box marginTop="l" marginBottom="m">
        <TouchableOpacity activeOpacity={1} onPress={navigateToLogin}>
          <CustomButton
            label={t('dialog2FirstButton')}
            variant="blackBgButton"
            paddingVertical={theme.spacing.xs}
          />
        </TouchableOpacity>
      </Box>
      <Box paddingBottom="m">
        <TouchableOpacity activeOpacity={1} onPress={navigateToLogin}>
          <CustomButton
            label={t('dialog2SecondButton')}
            variant="secondary"
            paddingVertical={theme.spacing.xs}
          />
        </TouchableOpacity>
      </Box>
    </Box>
  )
}

