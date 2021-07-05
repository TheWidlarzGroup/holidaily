import React from 'react'
import { useModalContext } from 'contexts/ModalProvider'
import { useTranslation } from 'react-i18next'
import { RectButton } from 'react-native-gesture-handler'
import { Box, Text, mkUseStyles, Theme, theme } from 'utils/theme'
import { ColorPicker } from './ColorPicker'

export const ProfileColor = () => {
  const styles = useStyles()
  const { showModal, hideModal } = useModalContext()
  const { t } = useTranslation('userProfile')

  const onChangeUserColor = () => showModal(<ColorPicker hideModal={hideModal} />)

  return (
    <Box paddingHorizontal="m" marginBottom="xl" marginTop="s">
      <Text variant="label1" marginLeft="m">
        {t('userColor')}
      </Text>
      <RectButton
        onPress={onChangeUserColor}
        style={styles.colorBtn}
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
    backgroundColor: theme.colors.errorRed,
    borderRadius: theme.borderRadii.full,
  },
}))
