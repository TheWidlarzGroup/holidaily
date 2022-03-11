import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, Box, mkUseStyles, Theme, BaseOpacity } from 'utils/theme'

import Gallery from 'assets/icons/icon-gallery.svg'

type Action = 'gallery'
type UploadPictureButtonsProps = {
  onUploadImage: F1<Action>
}

export const UploadPictureButtons = ({ onUploadImage }: UploadPictureButtonsProps) => {
  const { t } = useTranslation('uploadPictureModal')
  const styles = useStyles()

  return (
    <Box padding="lplus" paddingTop={'m'}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryBtn: {
    flexDirection: 'row',
    marginTop: theme.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
