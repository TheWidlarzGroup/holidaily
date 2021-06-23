import React, { useEffect, useState } from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import { UploadPictureModal } from 'components/UploadPictureModal'
import { EditPictureModal } from 'components/EditPictureModal'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { Box, theme } from 'utils/theme'
import { TextLink } from 'components/TextLink'
import { Avatar } from 'components/Avatar'
import { useModalContext } from '../../../contexts/ModalProvider'

type ProfilePictureProps = {
  setIsEditedTrue: F0
  setIsEditedFalse: F0
}

export const ProfilePicture = ({ setIsEditedTrue, setIsEditedFalse }: ProfilePictureProps) => {
  const { handleModal } = useModalContext()
  const { t } = useTranslation('userProfile')
  const { user } = useUserContext()
  const { photo: userPhoto } = user
  const [userProfilePicture, setUserProfilePicture] = useState<string | undefined | null>('')
  const [photoURI, setPhotoURI] = useState<string | null | undefined>()

  const showUploadPictureModal = () => {
    handleModal(
      <UploadPictureModal
        isVisible
        hideModal={handleModal}
        onUserCancelled={() => {
          setIsEditedFalse()
          handleModal()
        }}
        setPhotoURI={setPhotoURI}
      />
    )
  }
  const showDeleteConfirmationModal = () => {
    handleModal(
      <ConfirmationModal
        isVisible
        hideModal={() => handleModal()}
        onAccept={() => {
          handleModal()
          handleDeletePicture()
        }}
        onDecline={() => {
          handleModal()
          setIsEditedFalse()
        }}
        content={t('deletePictureMessage')}
      />
    )
  }
  const showEditPictureModal = () => {
    handleModal(
      <EditPictureModal
        showUploadModal={() => {
          showUploadPictureModal()
          setIsEditedTrue()
        }}
        isVisible
        hideModal={() => {
          handleModal()
          setIsEditedFalse()
        }}
        showDeleteCheckModal={showDeleteConfirmationModal}
      />
    )
  }
  const handleDeletePicture = () => {
    setIsEditedFalse()
    setPhotoURI(null)
    handleModal(
      <ChangesSavedModal
        isVisible
        hideModal={() => handleModal()}
        content={t('pictureDeletedMessage')}
      />
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

  useEffect(() => {
    if (photoURI) {
      setUserProfilePicture(photoURI)
    } else {
      setUserProfilePicture(userPhoto)
    }
  }, [userPhoto, photoURI])
  return (
    <Box
      paddingHorizontal="m"
      justifyContent="center"
      alignItems="center"
      marginTop="xxxl"
      marginBottom="xl">
      <RectButton
        onPress={userProfilePicture ? onChangeProfilePicture : onAddProfilePicture}
        activeOpacity={0.2}
        rippleColor={theme.colors.rippleColor}>
        <Avatar src={userProfilePicture} size="l" />
      </RectButton>
      <TextLink
        text={userProfilePicture ? t('editPhoto') : t('addPhoto')}
        variant="boldOrange15"
        action={userProfilePicture ? onChangeProfilePicture : onAddProfilePicture}
      />
    </Box>
  )
}
