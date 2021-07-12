import React, { useState } from 'react'
// import { useModalContext } from 'contexts/ModalProvider'
import { useTranslation } from 'react-i18next'
import { RectButton } from 'react-native-gesture-handler'
import { Box, Text, mkUseStyles, Theme, theme } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'

export const ProfileColor = () => {
  const styles = useStyles()
  const [userColor] = useState('transparent')
  // const { showModal, hideModal } = useModalContext()
  const { t } = useTranslation('userProfile')
  const navigation = useNavigation()

  const onChangeUserColor = () =>
    // showModal(<ColorPicker hidePickerModal={hideModal} setUserColor={setUserColor} />)
    navigation.navigate('ColorPicker')

  return (
    <Box paddingHorizontal="m" marginBottom="xl" marginTop="s">
      <Text variant="label1" marginLeft="m">
        {t('userColor')}
      </Text>
      <RectButton
        onPress={onChangeUserColor}
        style={[
          styles.colorBtn,
          { backgroundColor: userColor !== 'transparent' ? userColor : theme.colors.primary },
        ]}
        rippleColor={theme.colors.rippleColor}
      />
    </Box>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  colorBtn: {
    marginTop: theme.spacing.xm,
    marginLeft: theme.spacing.m,
    height: 44,
    width: 44,
    borderRadius: theme.borderRadii.full,
  },
}))
