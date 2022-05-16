import React from 'react'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import { UploadAttachmentModal } from 'components/UploadAttachmentModal'
import { EditPictureModal } from 'components/EditPictureModal'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { Box, BaseOpacity } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { useModalContext } from 'contexts/ModalProvider'
import { EditUserSuccess, useEditUser } from 'dataAccess/mutations/useEditUser'
import { makeUserDetails } from 'utils/userDetails'
import { InputEditIcon } from 'components/InputEditIcon'

type ProfilePictureProps = {
  setIsEditedTrue: F0
  setIsEditedFalse: F0
  onUpdate: F1<EditUserSuccess>
}

export const ProfilePicture = ({
  setIsEditedTrue,
  setIsEditedFalse,
  onUpdate,
}: ProfilePictureProps) => {
  const { hideModal, showModal } = useModalContext()
  const { t } = useTranslation('userProfile')
  const { user } = useUserContext()
  const { mutate } = useEditUser()

  const onChangePhoto = (newPhoto: string | null) =>
    mutate({ photo: newPhoto }, { onSuccess: onUpdate })

  const showUploadAttachmentModal = () => {
    hideModal()
    setTimeout(() => {
      showModal(
        <UploadAttachmentModal
          isVisible
          showCamera
          hideModal={hideModal}
          onUserCancelled={() => {
            setIsEditedFalse()
            hideModal()
          }}
          setPhotoURI={onChangePhoto}
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
          showUploadAttachmentModal()
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
    onChangePhoto(null)
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
    showUploadAttachmentModal()
  }
  const onPress = user?.photo ? onChangeProfilePicture : onAddProfilePicture
  return (
    <Box paddingHorizontal="m" justifyContent="center" alignItems="center" marginTop="-s">
      <BaseOpacity onPress={onPress} activeOpacity={0.5}>
        <Avatar src={user?.photo} userDetails={makeUserDetails(user)} size="xl" marginBottom="m" />
        <InputEditIcon bottom={10} top={undefined} onPress={onPress} />
      </BaseOpacity>
    </Box>
  )
}
