import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, Box, BaseOpacity, useTheme } from 'utils/theme'
import Gallery from 'assets/icons/icon-gallery.svg'
import Smartphone from 'assets/icons/icon-smartphone.svg'
import FileIcon from 'assets/icons/icon-file.svg'

type UploadAttachmentAction = 'gallery' | 'camera' | 'file'
type UploadAttachmentButtonsProps = {
  showCamera?: true
  allowFiles?: true
  setAction: F1<UploadAttachmentAction | null>
  hideModal: F0
}

export const UploadAttachmentButtons = ({
  showCamera,
  allowFiles,
  setAction,
  hideModal,
}: UploadAttachmentButtonsProps) => {
  const { t } = useTranslation('uploadAttachmentModal')
  const theme = useTheme()

  return (
    <Box padding="lplus" paddingTop={showCamera ? 'lplus' : 'xm'}>
      {showCamera && (
        <>
          <BaseOpacity
            onPress={() => {
              setAction('camera')
              hideModal()
            }}
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
        onPress={() => {
          console.log('gall')
          setAction('gallery')
          hideModal()
        }}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        marginTop="m"
        activeOpacity={0.2}>
        <Gallery />
        <Box flexGrow={1} marginLeft="m">
          <Text variant="boldBlack18">{t('openGallery')}</Text>
        </Box>
      </BaseOpacity>
      {allowFiles && (
        <>
          <Box height={1} backgroundColor="black" marginLeft="lplus" marginTop="m" />
          <BaseOpacity
            onPress={() => {
              setAction('file')
              hideModal()
            }}
            activeOpacity={0.2}
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            marginTop="m">
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
