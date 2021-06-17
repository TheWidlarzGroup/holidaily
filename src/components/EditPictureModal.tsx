import React from 'react'
import { ModalProps } from 'react-native-modal'

import { CustomModal } from 'components/CustomModal'
import { theme, mkUseStyles, Theme } from 'utils/theme'
import { EditPictureModalButtons } from './EditPictureModalButtons'

type EditPictureModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: F0
  showUploadModal: () => void
  setPhotoURI: F1<string | undefined | null>
}

export const EditPictureModal = ({
  isVisible,
  hideModal,
  setPhotoURI,
  showUploadModal,
}: EditPictureModalProps) => {
  // TODO: IOS setup required
  const styles = useStyles()

  const onDeleteImage = () => {
    setPhotoURI(null)
    hideModal()
  }
  const onChangeImage = () => {
    showUploadModal()
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
      <EditPictureModalButtons onDeleteImage={onDeleteImage} onChangeImage={onChangeImage} />
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
