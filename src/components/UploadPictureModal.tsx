import React from 'react'
import { ModalProps } from 'react-native-modal'
import { ImageLibraryOptions, launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { CustomModal } from 'components/CustomModal'
import { UploadPictureButtons } from 'components/UploadPictureButtons'
import { theme, mkUseStyles, Theme } from 'utils/theme'

type UploadPictureModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: F0
  onUserCancelled: F0
  setPhotoURI: F1<string | undefined>
}
type Action = 'gallery' | 'camera'

export const UploadPictureModal = ({
  isVisible,
  hideModal,
  onUserCancelled,
  setPhotoURI,
}: UploadPictureModalProps) => {
  const styles = useStyles()

  const onUploadImage = (action: Action) => {
    hideModal()
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    }
    if (action === 'gallery') {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          onUserCancelled()
        }
        if (response.assets) {
          const photo = response.assets[0]
          setPhotoURI(photo.uri)
        }
      })
    } else {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          onUserCancelled()
        }
        if (response.assets) {
          const photo = response.assets[0]
          setPhotoURI(photo.uri)
        }
      })
    }
  }

  return (
    <CustomModal
      isVisible={isVisible}
      onBackdropPress={hideModal}
      backdropColor={theme.colors.white}
      backdropOpacity={0.8}
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
