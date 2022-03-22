import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, Box, mkUseStyles, BaseOpacity } from 'utils/theme'
import Gallery from 'assets/icons/icon-gallery.svg'
import Smartphone from 'assets/icons/icon-smartphone.svg'

type Action = 'gallery' | 'camera' | 'file'
type UploadAttachmentButtonsProps = {
  onUpload: F1<Action>
  showCamera?: boolean
  allowFiles?: boolean
}

export const UploadAttachmentButtons = ({
  onUpload,
  showCamera,
  allowFiles,
}: UploadAttachmentButtonsProps) => {
  const { t } = useTranslation('uploadAttachmentModal')
  const styles = useStyles()

  return (
    <Box padding="lplus" paddingTop={showCamera ? 'lplus' : 'xm'}>
      {showCamera && (
        <>
          <BaseOpacity onPress={() => onUpload('camera')} activeOpacity={0.2} style={styles.btn}>
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
            onPress={() => onUpload('file')}
            activeOpacity={0.2}
            style={styles.btn}
            marginTop="m">
            <Smartphone />
            <Box flexGrow={1} marginLeft="m">
              <Text variant="boldBlack18">upload file</Text>
            </Box>
          </BaseOpacity>
          <Box height={1} backgroundColor="black" marginLeft="lplus" marginTop="m" />
        </>
      )}
      <BaseOpacity
        onPress={() => onUpload('gallery')}
        style={styles.btn}
        marginTop="m"
        activeOpacity={0.2}>
        <Gallery />
        <Box flexGrow={1} marginLeft="m">
          <Text variant="boldBlack18">{t('openGallery')}</Text>
        </Box>
      </BaseOpacity>
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
