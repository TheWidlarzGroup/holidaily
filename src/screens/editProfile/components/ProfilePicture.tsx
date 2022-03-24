import React from 'react'
import { useTranslation } from 'react-i18next'
import { UploadPictureModal } from 'components/UploadPictureModal'
import { EditPictureModal } from 'components/EditPictureModal'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { Box, BaseOpacity } from 'utils/theme'
import { TextLink } from 'components/TextLink'
import { Avatar } from 'components/Avatar'
import { useUserContext } from 'hooks/useUserContext'
import { useModalContext } from '../../../contexts/ModalProvider'

type ProfilePictureProps = {
  setIsEditedTrue: F0
  setIsEditedFalse: F0
}

export const ProfilePicture = ({ setIsEditedTrue, setIsEditedFalse }: ProfilePictureProps) => {
  const { hideModal, showModal } = useModalContext()
  const { t } = useTranslation('userProfile')
  const { updateUser, user } = useUserContext()

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
          setPhotoURI={(newPhoto) => updateUser({ photo: newPhoto })}
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
    updateUser({ photo: null })
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
        onPress={user?.photo ? onChangeProfilePicture : onAddProfilePicture}
        activeOpacity={0.5}>
        <Avatar src={user?.photo} size="l" marginBottom="m" />
      </BaseOpacity>
      <TextLink
        text={user?.photo ? t('editPhoto') : t('addPhoto')}
        variant="boldOrange15"
        action={user?.photo ? onChangeProfilePicture : onAddProfilePicture}
      />
    </Box>
  )
}
