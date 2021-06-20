import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import { useBooleanState } from 'hooks/useBooleanState'
import { UploadPictureModal } from 'components/UploadPictureModal'
import { EditPictureModal } from 'components/EditPictureModal'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { Box, mkUseStyles, Theme, theme } from 'utils/theme'
import ProfileImgPlaceholder from 'assets/icons/icon-profile-placeholder.svg'
import { TextLink } from 'components/TextLink'

type ProfilePictureProps = {
  setIsEditedTrue: F0
  setIsEditedFalse: F0
}

export const ProfilePicture = ({ setIsEditedTrue, setIsEditedFalse }: ProfilePictureProps) => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  const { user } = useUserContext()
  const { photo: userPhoto } = user
  const [userProfilePicture, setUserProfilePicture] = useState<string | undefined | null>('')
  const [photoURI, setPhotoURI] = useState<string | null | undefined>()
  const [
    isDeleteCompletionModalVisible,
    { setTrue: showDeleteCompletionModal, setFalse: hideDeleteCompletionModal },
  ] = useBooleanState(false)
  const [
    isUploadPictureModalVisible,
    { setTrue: showUploadPictureModal, setFalse: hideUploadPictureModal },
  ] = useBooleanState(false)
  const [
    isEditPictureModalVisible,
    { setTrue: showEditPictureModal, setFalse: hideEditPictureModal },
  ] = useBooleanState(false)
  const [
    isDeleteCheckModalVisible,
    { setTrue: showDeleteCheckModal, setFalse: hideDeleteChceckModal },
  ] = useBooleanState(false)

  const handleDeletePicture = () => {
    showDeleteCompletionModal()
    setIsEditedFalse()
    setPhotoURI(null)
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
        {userProfilePicture ? (
          <Image source={{ uri: userProfilePicture }} style={styles.profileImg} />
        ) : (
          <ProfileImgPlaceholder style={styles.profileImg} />
        )}
      </RectButton>
      <TextLink
        text={userProfilePicture ? t('editPhoto') : t('addPhoto')}
        variant="boldOrange15"
        action={userProfilePicture ? onChangeProfilePicture : onAddProfilePicture}
      />
      {isUploadPictureModalVisible && (
        <UploadPictureModal
          isVisible={isUploadPictureModalVisible}
          hideModal={() => {
            hideUploadPictureModal()
          }}
          onUserCancelled={setIsEditedFalse}
          setPhotoURI={setPhotoURI}
          hideEditPictureModal={hideEditPictureModal}
        />
      )}
      {isEditPictureModalVisible && (
        <EditPictureModal
          showUploadModal={() => {
            showUploadPictureModal()
            setIsEditedTrue()
          }}
          isVisible
          hideModal={() => {
            hideEditPictureModal()
            setIsEditedFalse()
          }}
          showDeleteCheckModal={showDeleteCheckModal}
        />
      )}
      {isDeleteCheckModalVisible && (
        <ConfirmationModal
          isVisible
          hideModal={hideDeleteChceckModal}
          onAccept={() => {
            handleDeletePicture()
            hideDeleteChceckModal()
            hideEditPictureModal()
          }}
          onDecline={() => {
            hideDeleteChceckModal()
            hideEditPictureModal()
            setIsEditedFalse()
          }}
          content="Do you want to delete your profile picture?"
        />
      )}
      {isDeleteCompletionModalVisible && (
        <ChangesSavedModal
          isVisible={isDeleteCompletionModalVisible}
          hideModal={hideDeleteCompletionModal}
          content={'Picture deleted!'}
        />
      )}
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  profileImg: {
    height: 112,
    width: 112,
    marginBottom: theme.spacing.m,
    borderRadius: 112 / 2,
  },
}))
