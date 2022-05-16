import React from 'react'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import { UploadAttachmentModal } from 'components/UploadAttachmentModal'
import { EditPictureModal } from 'components/EditPictureModal'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { Box, BaseOpacity } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { useModalContext } from 'contexts/ModalProvider'
import { makeUserDetails } from 'utils/userDetails'
import { InputEditIcon } from 'components/InputEditIcon'
import { Control, Controller } from 'react-hook-form'

type ProfilePictureProps = {
  userPhoto: string | null
  onChange: F1<string | null>
}

type PictureControllerProps = {
  control: Control
  name: string
}

export const ProfilePicture = ({ control, name }: PictureControllerProps) => (
  <Controller
    control={control}
    name={name}
    render={({ onChange, value }) => <ProfilePictureForm onChange={onChange} userPhoto={value} />}
  />
)

const ProfilePictureForm = ({ onChange, userPhoto }: ProfilePictureProps) => {
  const { hideModal, showModal } = useModalContext()
  const { t } = useTranslation('userProfile')
  const { user } = useUserContext()

  const showUploadAttachmentModal = () => {
    hideModal()
    setTimeout(() => {
      showModal(
        <UploadAttachmentModal
          isVisible
          showCamera
          hideModal={hideModal}
          onUserCancelled={hideModal}
          setPhotoURI={onChange}
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
          onDecline={hideModal}
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
        hideModal={hideModal}
        showDeleteCheckModal={showDeleteConfirmationModal}
      />
    )
  }
  const handleDeletePicture = () => {
    onChange(null)
  }
  const onChangeProfilePicture = showEditPictureModal
  const onAddProfilePicture = showUploadAttachmentModal
  const onPress = userPhoto ? onChangeProfilePicture : onAddProfilePicture

  return (
    <Box paddingHorizontal="m" justifyContent="center" alignItems="center" marginTop="-s">
      <BaseOpacity onPress={onPress} activeOpacity={0.5}>
        <Avatar src={userPhoto} userDetails={makeUserDetails(user)} size="l" marginBottom="m" />
        <InputEditIcon bottom={10} top={undefined} onPress={onPress} />
      </BaseOpacity>
    </Box>
  )
}
