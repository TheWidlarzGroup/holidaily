import React from 'react'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { UploadAttachmentModal } from 'components/UploadAttachmentModal'
import { EditPictureModal } from 'components/EditPictureModal'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { Box, BaseOpacity } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { useModalContext } from 'contexts/ModalProvider'
import { makeUserDetails } from 'utils/userDetails'
import { InputEditIcon } from 'components/InputEditIcon'
import { Control, Controller } from 'react-hook-form'
import { Analytics } from 'services/analytics'

type ProfilePictureProps = {
  userPhoto: string | null
  onChange: F1<string | null>
  onDelete: PictureControllerProps['onDelete']
}

type PictureControllerProps = {
  control: Control
  name: string
  onDelete: F0
}

export const ProfilePicture = ({ control, name, onDelete }: PictureControllerProps) => (
  <Controller
    control={control}
    name={name}
    render={({ onChange, value }) => (
      <ProfilePictureForm onDelete={onDelete} onChange={onChange} userPhoto={value} />
    )}
  />
)

const ProfilePictureForm = ({ onChange, userPhoto, onDelete }: ProfilePictureProps) => {
  const { hideModal, showModal } = useModalContext()
  const { t } = useTranslation('userProfile')
  const { user } = useUserContext()

  const showUploadAttachmentModal = () => {
    hideModal()
    setTimeout(() => {
      Analytics().track('USER_ADD_ATTACHMENT_MODAL_OPENED')
      showModal(
        <UploadAttachmentModal
          source="USER"
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
            onDelete()
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

  const onChangeProfilePicture = showEditPictureModal
  const onAddProfilePicture = showUploadAttachmentModal
  const onPress = userPhoto ? onChangeProfilePicture : onAddProfilePicture

  return (
    <Box paddingHorizontal="m" justifyContent="center" alignItems="center" marginTop="-s">
      <BaseOpacity onPress={onPress} activeOpacity={0.5}>
        <Avatar src={userPhoto} userDetails={makeUserDetails(user)} size="xl" marginBottom="m" />
        <InputEditIcon bottom={10} top={undefined} onPress={onPress} />
      </BaseOpacity>
    </Box>
  )
}
