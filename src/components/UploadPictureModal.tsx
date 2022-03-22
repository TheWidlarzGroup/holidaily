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
import { CustomModal } from 'components/CustomModal'
import { UploadPictureButtons } from 'components/UploadPictureButtons'
import { theme, mkUseStyles, Theme } from 'utils/theme'

type UploadPictureModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: F0
  hideEditPictureModal?: F0
  onUserCancelled: F0
  setPhotoURI: F1<string | undefined>
  showCamera?: boolean
  allowFiles?: boolean
} & (
    | {
        allowFiles: true
        setFile: F1<{ uri: string; name: string } | undefined>
      }
    | { allowFiles?: false }
  )
type PhotoSelectionChoice = 'gallery' | 'camera' | 'file'

export const UploadPictureModal = ({ hideEditPictureModal, ...p }: UploadPictureModalProps) => {
  // TODO: IOS setup required
  const styles = useStyles()

  const onHandleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      p.onUserCancelled()
    }
    if (response.assets) {
      const photo = response.assets[0]
      p.setPhotoURI(photo.uri)
    }
  }

  const onUploadImage = async (action: PhotoSelectionChoice) => {
    p.hideModal()

    if (p.allowFiles && action === 'file') {
      const { doc, docx, pdf, plainText, ppt, pptx } = documentTypes
      const options: DocumentPickerOptions<'android' | 'ios'> = {
        type: [doc, docx, pdf, plainText, ppt, pptx],
      }
      try {
        const { uri, name } = await pickDocument(options)

        p.setFile({ uri, name })
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
      }, 250)
    }
    if (action === 'camera') {
      setTimeout(() => {
        launchCamera(options, (response) => onHandleResponse(response))
      }, 250)
    }
  }
  useEffect(() => {
    hideEditPictureModal?.()
  }, [hideEditPictureModal])

  return (
    <CustomModal
      isVisible={p.isVisible}
      onBackdropPress={p.hideModal}
      backdropColor={theme.colors.white}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      swipeDirection="down"
      style={p.showCamera ? { ...styles.modal, ...styles.longModal } : styles.modal}
      hideModalContentWhileAnimating>
      <UploadPictureButtons
        onUploadImage={onUploadImage}
        allowFiles={p.allowFiles}
        showCamera={p.showCamera}
      />
    </CustomModal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    height: 130,
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
  longModal: {
    height: 175,
  },
}))
