import React, { useEffect } from 'react'
import { ModalProps } from 'react-native-modal'
import {
  ImageLibraryOptions,
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker'
import { CustomModal } from 'components/CustomModal'
import { UploadPictureButtons } from 'components/UploadPictureButtons'
import { theme, mkUseStyles, Theme } from 'utils/theme'

type UploadPictureModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: F0
  hideEditPictureModal?: F0
  onUserCancelled: F0
  setPhotoURI: F1<string | undefined>
}
type PhotoSelectionChoice = 'gallery' | 'camera'

export const UploadPictureModal = ({
  isVisible,
  hideModal,
  onUserCancelled,
  setPhotoURI,
  hideEditPictureModal,
}: UploadPictureModalProps) => {
  // TODO: IOS setup required
  const styles = useStyles()

  const onHandleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      onUserCancelled()
    }
    if (response.assets) {
      const photo = response.assets[0]
      setPhotoURI(photo.uri)
    }
  }

  const onUploadImage = (action: PhotoSelectionChoice) => {
    hideModal()
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    }
    if (action === 'gallery') {
      launchImageLibrary(options, (response) => onHandleResponse(response))
    } else {
      launchCamera(options, (response) => onHandleResponse(response))
    }
  }
  useEffect(() => {
    if (hideEditPictureModal) hideEditPictureModal()
  }, [hideEditPictureModal])

  return (
    <CustomModal
      isVisible={isVisible}
      onBackdropPress={hideModal}
      backdropColor={theme.colors.white}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      swipeDirection="down"
      style={styles.modal}
      hideModalContentWhileAnimating>
      <UploadPictureButtons onUploadImage={onUploadImage} />
    </CustomModal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    height: 175,
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
