import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, Box, mkUseStyles, Theme, BaseOpacity } from 'utils/theme'

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
      <BaseOpacity
        onPress={() => onUploadImage('camera')}
        activeOpacity={0.2}
        style={styles.cameraBtn}>
        <Smartphone />
        <Box flexGrow={1} paddingBottom="m" marginLeft="m">
          <Text variant="boldBlack18">{t('openCamera')}</Text>
        </Box>
      </BaseOpacity>
      <Box height={1} backgroundColor="black" marginLeft="lplus" />
      <BaseOpacity
        onPress={() => onUploadImage('gallery')}
        style={styles.galleryBtn}
        activeOpacity={0.2}>
        <Gallery />
        <Box flexGrow={1} marginLeft="m">
          <Text variant="boldBlack18">{t('openGallery')}</Text>
        </Box>
      </BaseOpacity>
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
