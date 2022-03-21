import React, { FC, useState } from 'react'
import { ScrollView } from 'react-native'

import { Box } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'
import { useBooleanState } from 'hooks/useBooleanState'
import { UploadPictureModal } from 'components/UploadPictureModal'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { AttachmentType } from 'types/holidaysDataTypes'
import { MessageInputModal } from 'components/MessageInputModal'
import { useTranslation } from 'react-i18next'
import { Additionals } from './Additionals'
import { Details } from './Details'
import { SickTime } from './SickTime'

type RequestDataTypes = {
  description: string
  message: string
  photos: AttachmentType[]
}

type FormRequestVacationProps = {
  date: {
    start?: Date
    end?: Date
  }
  sickTime: boolean
  toggleSickTime: F0
  nextStep: () => void
  changeRequestData: (callback: (currentData: RequestDataTypes) => RequestDataTypes) => void
  message: string
  photos: AttachmentType[]
  removePhoto: F1<string>
}

export const FormRequestVacation: FC<FormRequestVacationProps> = ({
  date,
  sickTime,
  toggleSickTime,
  nextStep,
  changeRequestData,
  message,
  photos,
  removePhoto,
}) => {
  const [showMessageInput, { toggle: toggleShowMessageInput, setFalse: hideMessageInput }] =
    useBooleanState(false)
  const [
    showAttachmentModal,
    { setFalse: setShowAttachmentModalFalse, setTrue: setShowAttachmentModalTrue },
  ] = useBooleanState(false)
  const [photosToRemove, setPhotosToRemove] = useState<string[]>([])

  const { t } = useTranslation('requestVacation')

  const handleFormSubmit = () => {
    if (!date.start) return
    nextStep()
  }

  const handleDescriptionChange = (description: string) => {
    changeRequestData((oldData) => ({ ...oldData, description }))
  }

  const handleMessageSubmit = (message: string) => {
    changeRequestData((oldData) => ({ ...oldData, message }))
    hideMessageInput()
  }

  const askRemovePhoto = (id: string) => {
    setPhotosToRemove((prev) => [...prev, id])
  }

  const clearPhotosToRemove = () => {
    photosToRemove.forEach(removePhoto)
    setPhotosToRemove([])
  }

  const cancelRemovingPhoto = () => setPhotosToRemove([])

  return (
    <Box flex={1}>
      <ScrollView>
        <Box margin="ml" paddingBottom="xxxl">
          <Details onDescriptionChange={handleDescriptionChange} date={date} />
          <SickTime sickTime={sickTime} toggle={toggleSickTime} />
          <Additionals
            onPressMessage={toggleShowMessageInput}
            messageContent={showMessageInput ? '' : message}
            messageInputVisible={showMessageInput}
            showAttachmentModal={setShowAttachmentModalTrue}
            attachments={photos}
            removePhoto={askRemovePhoto}
          />
        </Box>
      </ScrollView>
      <Box marginBottom={showMessageInput ? 0 : 'l'}>
        {showMessageInput ? (
          <MessageInputModal
            visible={showMessageInput}
            onSubmitEditing={handleMessageSubmit}
            onRequestClose={hideMessageInput}
            defaultValue={message}
            autofocus
          />
        ) : (
          <CustomButton
            label={t('CTA')}
            variant="primary"
            onPress={handleFormSubmit}
            marginTop={20}
            maxWidth={250}
            alignSelf="center"
          />
        )}
      </Box>
      <ConfirmationModal
        onAccept={clearPhotosToRemove}
        onDecline={cancelRemovingPhoto}
        hideModal={cancelRemovingPhoto}
        isVisible={!!photosToRemove.length}
        header={null}
        content={t('attachmentDeleteMessage')}
      />
      <UploadPictureModal
        isVisible={showAttachmentModal}
        hideModal={setShowAttachmentModalFalse}
        onUserCancelled={setShowAttachmentModalFalse}
        showCamera={false}
        setPhotoURI={(uri) => {
          if (!uri) return
          changeRequestData((oldData) => ({
            ...oldData,
            photos: [...oldData.photos, { uri, id: new Date().toString() }],
          }))
        }}
      />
    </Box>
  )
}
