import React, { useEffect } from 'react'
import { ModalProps } from 'react-native-modal'
import {
  ImageLibraryOptions,
  launchImageLibrary,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker'
import {
  DocumentPickerOptions,
  pickSingle as pickDocument,
  types as documentTypes,
} from 'react-native-document-picker'
import { UploadAttachmentButtons } from 'components/UploadAttachmentButtons'
import { Box, mkUseStyles, Theme, useTheme } from 'utils/theme'
import { SwipeableModal } from './SwipeableModal'

type UploadFilesProps =
  | {
      allowFiles: true
      setFile: F1<{ uri: string; name: string } | undefined>
    }
  | { allowFiles?: never }

type UploadAttachmentModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: F0
  hideEditAttachmentModal?: F0
  onUserCancelled: F0
  setPhotoURI: F1<string | null>
  showCamera?: true
} & UploadFilesProps
type PhotoSelectionChoice = 'gallery' | 'camera' | 'file'

export const UploadAttachmentModal = ({
  hideEditAttachmentModal,
  ...p
}: UploadAttachmentModalProps) => {
  // TODO: IOS setup required
  const styles = useStyles()
  const theme = useTheme()

  const onHandleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      p.onUserCancelled()
    }
    if (response.assets) {
      const photo = response.assets[0]
      if (photo.uri) p.setPhotoURI(photo.uri)
    }
  }

  const onUpload = (action: PhotoSelectionChoice) => {
    p.hideModal()

    if (p.allowFiles && action === 'file') {
      const { doc, docx, pdf, plainText, ppt, pptx } = documentTypes
      const options: DocumentPickerOptions<'android' | 'ios'> = {
        type: [doc, docx, pdf, plainText, ppt, pptx],
      }
      try {
        setTimeout(async () => {
          const { uri, name } = await pickDocument(options)
          p.setFile({ uri, name })
        }, 400)
      } catch (error) {
        p.setFile(undefined)
      }
    }
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    }
    if (action === 'gallery') {
      setTimeout(() => {
        launchImageLibrary(options, (response) => onHandleResponse(response))
      }, 400)
    }
    if (action === 'camera') {
      setTimeout(() => {
        launchCamera(options, (response) => onHandleResponse(response))
      }, 400)
    }
  }
  useEffect(() => {
    hideEditAttachmentModal?.()
  }, [hideEditAttachmentModal])

  return (
    <SwipeableModal
      backdropColor={theme.colors.white}
      backdropOpacity={0.5}
      isOpen={p.isVisible}
      onHide={p.hideModal}>
      <Box style={[styles.modal]}>
        <UploadAttachmentButtons
          onUpload={onUpload}
          allowFiles={p.allowFiles}
          showCamera={p.showCamera}
        />
      </Box>
    </SwipeableModal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    width: '100%',
    minHeight: 170,
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: -20,
    borderTopLeftRadius: theme.borderRadii.lmin,
    borderTopRightRadius: theme.borderRadii.lmin,
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
}))
