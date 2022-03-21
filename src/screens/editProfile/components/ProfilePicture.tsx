import React from 'react'
import { useTranslation } from 'react-i18next'
import { UploadPictureModal } from 'components/UploadPictureModal'
import { EditPictureModal } from 'components/EditPictureModal'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { Box, BaseOpacity } from 'utils/theme'
import { TextLink } from 'components/TextLink'
import { Avatar } from 'components/Avatar'
import { useAvatarContext } from 'contexts/AvatarProvider'
import { useModalContext } from '../../../contexts/ModalProvider'

type ProfilePictureProps = {
  setIsEditedTrue: F0
  setIsEditedFalse: F0
}

export const ProfilePicture = ({ setIsEditedTrue, setIsEditedFalse }: ProfilePictureProps) => {
  const { hideModal, showModal } = useModalContext()
  const { t } = useTranslation('userProfile')
  const { avatarUri, updateAvatarUri } = useAvatarContext()

  const showUploadPictureModal = () => {
    hideModal()
    setTimeout(() => {
      showModal(
        <UploadPictureModal
          isVisible
          showCamera
          hideModal={hideModal}
          onUserCancelled={() => {
            setIsEditedFalse()
            hideModal()
          }}
          setPhotoURI={updateAvatarUri}
        />
      )
    }, 250)
  }
  const showDeleteConfirmationModal = () => {
    hideModal()
    setTimeout(() => {
      showModal(
        <ConfirmationModal
          isVisible
          hideModal={hideModal}
          onAccept={() => {
            hideModal()
            handleDeletePicture()
          }}
          onDecline={() => {
            hideModal()
            setIsEditedFalse()
          }}
          content={t('deletePictureMessage')}
        />
      )
    }, 250)
  }
  const showEditPictureModal = () => {
    showModal(
      <EditPictureModal
        showUploadModal={() => {
          showUploadPictureModal()
          setIsEditedTrue()
        }}
        isVisible
        hideModal={() => {
          hideModal()
          setIsEditedFalse()
        }}
        showDeleteCheckModal={showDeleteConfirmationModal}
      />
    )
  }
  const handleDeletePicture = () => {
    setIsEditedFalse()
    updateAvatarUri(null)
    showModal(
      <ChangesSavedModal isVisible hideModal={hideModal} content={t('pictureDeletedMessage')} />
    )
  }
  const onChangeProfilePicture = () => {
    setIsEditedTrue()
    showEditPictureModal()
  }
  const onAddProfilePicture = () => {
    setIsEditedTrue()
    showUploadPictureModal()
  }

  return (
    <Box
      paddingHorizontal="m"
      justifyContent="center"
      alignItems="center"
      marginTop="xxl"
      marginBottom="xl">
      <BaseOpacity
        onPress={avatarUri ? onChangeProfilePicture : onAddProfilePicture}
        activeOpacity={0.5}>
        <Avatar src={avatarUri} size="l" marginBottom="m" />
      </BaseOpacity>
      <TextLink
        text={avatarUri ? t('editPhoto') : t('addPhoto')}
        variant="boldOrange15"
        action={avatarUri ? onChangeProfilePicture : onAddProfilePicture}
      />
    </Box>
  )
}
