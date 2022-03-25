import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import { UploadAttachmentModal } from 'components/UploadAttachmentModal'
import { EditPictureModal } from 'components/EditPictureModal'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { Box, BaseOpacity } from 'utils/theme'
import { TextLink } from 'components/TextLink'
import { Avatar } from 'components/Avatar'
import { useModalContext } from '../../../contexts/ModalProvider'

type ProfilePictureProps = {
  setIsEditedTrue: F0
  setIsEditedFalse: F0
}

export const ProfilePicture = ({ setIsEditedTrue, setIsEditedFalse }: ProfilePictureProps) => {
  const { hideModal, showModal } = useModalContext()
  const { t } = useTranslation('userProfile')
  const { user } = useUserContext()
  const [userProfilePicture, setUserProfilePicture] = useState<string | undefined | null>('')
  const [photoURI, setPhotoURI] = useState<string | null | undefined>()

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
          setPhotoURI={setPhotoURI}
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
    setPhotoURI(null)
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

  useEffect(() => {
    if (photoURI) {
      setUserProfilePicture(photoURI)
    } else {
      setUserProfilePicture(user?.photo)
    }
  }, [photoURI, user?.photo])
  return (
    <Box
      paddingHorizontal="m"
      justifyContent="center"
      alignItems="center"
      marginTop="xxl"
      marginBottom="xl">
      <BaseOpacity
        onPress={userProfilePicture ? onChangeProfilePicture : onAddProfilePicture}
        activeOpacity={0.5}>
        <Avatar src={userProfilePicture} size="l" marginBottom="m" />
      </BaseOpacity>
      <TextLink
        text={userProfilePicture ? t('editPhoto') : t('addPhoto')}
        variant="boldOrange15"
        action={userProfilePicture ? onChangeProfilePicture : onAddProfilePicture}
      />
    </Box>
  )
}
