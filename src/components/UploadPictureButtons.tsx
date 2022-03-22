import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, Box, mkUseStyles, Theme, BaseOpacity } from 'utils/theme'

import Gallery from 'assets/icons/icon-gallery.svg'
import Smartphone from 'assets/icons/icon-smartphone.svg'

type Action = 'gallery' | 'camera' | 'file'
type UploadPictureButtonsProps = {
  onUploadImage: F1<Action>
  showCamera?: boolean
  allowFiles?: boolean
}

export const UploadPictureButtons = ({
  onUploadImage,
  showCamera,
  allowFiles,
}: UploadPictureButtonsProps) => {
  const { t } = useTranslation('uploadPictureModal')
  const styles = useStyles()

  return (
    <Box padding="lplus" paddingTop={showCamera ? 'lplus' : 'xm'}>
      {showCamera && (
        <>
          <BaseOpacity
            onPress={() => onUploadImage('camera')}
            activeOpacity={0.2}
            style={styles.cameraBtn}>
            <Smartphone />
            <Box flexGrow={1} marginLeft="m">
              <Text variant="boldBlack18">{t('openCamera')}</Text>
            </Box>
          </BaseOpacity>
          <Box height={1} backgroundColor="black" marginLeft="lplus" marginTop="m" />
        </>
      )}
      {allowFiles && (
        <>
          <BaseOpacity
            onPress={() => onUploadImage('file')}
            activeOpacity={0.2}
            style={styles.cameraBtn}>
            <Smartphone />
            <Box flexGrow={1} marginLeft="m">
              <Text variant="boldBlack18">upload file</Text>
            </Box>
          </BaseOpacity>
          <Box height={1} backgroundColor="black" marginLeft="lplus" marginTop="m" />
        </>
      )}
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
