import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, Box, BaseOpacity, useTheme } from 'utils/theme'
import Gallery from 'assets/icons/icon-gallery.svg'
import Smartphone from 'assets/icons/icon-smartphone.svg'
import FileIcon from 'assets/icons/icon-file.svg'

type UploadAttachmentAction = 'gallery' | 'camera' | 'file'
type UploadAttachmentButtonsProps = {
  onUpload: F1<UploadAttachmentAction>
  showCamera?: true
  allowFiles?: true
}

export const UploadAttachmentButtons = ({
  onUpload,
  showCamera,
  allowFiles,
}: UploadAttachmentButtonsProps) => {
  const { t } = useTranslation('uploadAttachmentModal')
  const theme = useTheme()

  return (
    <Box padding="lplus" paddingTop={showCamera ? 'lplus' : 'xm'}>
      {showCamera && (
        <>
          <BaseOpacity
            onPress={() => onUpload('camera')}
            activeOpacity={0.2}
            flexDirection="row"
            justifyContent="center"
            alignItems="center">
            <Smartphone />
            <Box flexGrow={1} marginLeft="m">
              <Text variant="boldBlack18">{t('openCamera')}</Text>
            </Box>
          </BaseOpacity>
          <Box height={1} backgroundColor="black" marginLeft="lplus" marginTop="m" />
        </>
      )}

      <BaseOpacity
        onPress={() => onUpload('gallery')}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        marginTop="m"
        activeOpacity={0.2}>
        <Gallery color={theme.colors.titleActive} />
        <Box flexGrow={1} marginLeft="m">
          <Text variant="boldBlack18">{t('openGallery')}</Text>
        </Box>
      </BaseOpacity>
      {allowFiles && (
        <>
          <Box height={1} backgroundColor="black" marginLeft="lplus" marginTop="m" />
          <BaseOpacity
            onPress={() => onUpload('file')}
            activeOpacity={0.2}
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            marginTop="m"
            marginBottom="m">
            <FileIcon color={theme.colors.black} />
            <Box flexGrow={1} marginLeft="m">
              <Text variant="boldBlack18">{t('chooseFile')}</Text>
            </Box>
          </BaseOpacity>
        </>
      )}
    </Box>
  )
}
