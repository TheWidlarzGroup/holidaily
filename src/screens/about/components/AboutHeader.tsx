import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box, Text } from 'utils/theme'
import IconClose from 'assets/icons/icon-close2.svg'
import IconBack from 'assets/icons/icon-back2.svg'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

type HeaderProps = {
  closeModal: F0
  isFromWelcomeScreen?: true
}
export const AboutHeader = ({ closeModal, isFromWelcomeScreen }: HeaderProps) => {
  const handleGoBack = () => {
    if (!isFromWelcomeScreen) {
      navigation.goBack()
      navigation.dispatch(DrawerActions.openDrawer())
    } else closeModal()
  }

  const navigation = useNavigation()
  const { t } = useTranslation('welcome')

  return (
    <Box
      justifyContent="space-between"
      flexDirection="row"
      paddingBottom="xxl"
      paddingHorizontal="m">
      <TouchableOpacity
        onPress={handleGoBack}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
        {isFromWelcomeScreen ? (
          <IconClose height={14} width={14} />
        ) : (
          <IconBack height={18} width={18} />
        )}
      </TouchableOpacity>
      <Box marginTop="l">
        <Text variant="boldBlackCenter16">{t('about')}</Text>
      </Box>
      <Box paddingRight="l" />
    </Box>
  )
}
