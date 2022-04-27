import React, { useEffect, useState } from 'react'
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
import { CustomModal } from 'components/CustomModal'
import { UploadAttachmentButtons } from 'components/UploadAttachmentButtons'
import { mkUseStyles, Theme, useTheme } from 'utils/theme'

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
  setPhotoURI: F1<string | undefined>
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
  const [action, setAction] = useState<PhotoSelectionChoice | null>(null)

  const onHandleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      p.onUserCancelled()
    }
    if (response.assets) {
      const photo = response.assets[0]
      p.setPhotoURI(photo.uri)
    }
  }

  useEffect(() => {
    console.log(action)
  }, [action])

  const onUpload = (action: PhotoSelectionChoice) => {
    console.log('on upload')
    if (p.allowFiles && action === 'file') {
      const { doc, docx, pdf, plainText, ppt, pptx } = documentTypes
      const options: DocumentPickerOptions<'android' | 'ios'> = {
        type: [doc, docx, pdf, plainText, ppt, pptx],
      }
      try {
        setTimeout(async () => {
          const { uri, name } = await pickDocument(options)
          p.setFile({ uri, name })
        }, 40)
      } catch (error) {
        p.setFile(undefined)
      }
    }
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    }
    setTimeout(() => {
      if (action === 'gallery') {
        launchImageLibrary(options, (response) => onHandleResponse(response))
      }
    }, 300)
    if (action === 'camera') {
      launchCamera(options, (response) => onHandleResponse(response))
    }
    setAction(null)
  }
  useEffect(() => {
    hideEditAttachmentModal?.()
  }, [hideEditAttachmentModal])

  const onHide = () => {
    setTimeout(() => {
      console.log('aaa')
      return action && onUpload(action)
    }, 300)
  }

  return (
    <CustomModal
      onModalHide={onHide}
      onRequestClose={p.hideModal}
      isVisible={p.isVisible}
      onBackdropPress={p.hideModal}
      backdropColor={theme.colors.white}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      swipeDirection="down"
      style={styles.modal}
      hideModalContentWhileAnimating>
      <UploadAttachmentButtons
        hideModal={p.hideModal}
        setAction={setAction}
        allowFiles={p.allowFiles}
        showCamera={p.showCamera}
      />
    </CustomModal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    minHeight: 160,
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: -20,
    left: -20,
    right: -20,
    borderTopLeftRadius: theme.borderRadii.lmin,
    borderTopRightRadius: theme.borderRadii.lmin,
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
}))
