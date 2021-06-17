import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { Text, Box, theme, mkUseStyles, Theme } from 'utils/theme'

import Smartphone from 'assets/icons/icon-smartphone.svg'
import Gallery from 'assets/icons/icon-gallery.svg'

type Action = 'gallery' | 'camera'
type UploadPictureButtonsProps = {
  onUploadImage: F1<Action>
}

export const UploadPictureButtons = ({ onUploadImage }: UploadPictureButtonsProps) => {
  const { t } = useTranslation('uploadPictureModal')
  const styles = useStyles()

  return (
    <Box padding="lplus">
      <RectButton
        onPress={() => onUploadImage('camera')}
        activeOpacity={0.2}
        rippleColor={theme.colors.rippleColor}
        style={styles.cameraBtn}>
        <Smartphone />
        <Box flexGrow={1} paddingBottom="m" marginLeft="m">
          <Text variant="boldBlack18">{t('openCamera')}</Text>
        </Box>
      </RectButton>
      <Box height={1} backgroundColor="black" marginLeft="lplus" />
      <RectButton
        onPress={() => onUploadImage('gallery')}
        style={styles.galleryBtn}
        activeOpacity={0.2}
        rippleColor={theme.colors.rippleColor}>
        <Gallery />
        <Box flexGrow={1} marginLeft="m">
          <Text variant="boldBlack18">{t('openGallery')}</Text>
        </Box>
      </RectButton>
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  cameraBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  galleryBtn: {
    flexDirection: 'row',
    marginTop: theme.spacing.m,
    justifyContent: 'center',
  },
}))
