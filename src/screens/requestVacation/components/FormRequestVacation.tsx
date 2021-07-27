import React, { FC, useState } from 'react'
import { ScrollView } from 'react-native'

import { Box } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'
import { useBooleanState } from 'hooks/useBooleanState'
import { UploadPictureModal } from 'components/UploadPictureModal'
import { Additionals } from './Additionals'
import { MessageInput } from '../../../components/MessageInput'
import { Details } from './Details'
import { SickTime } from './SickTime'
import { ConfirmationModal } from 'components/ConfirmationModal'

type RequestDataTypes = {
  description: string
  message: string
  photos: { id: string; uri: string }[]
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
  photos: { id: string; uri: string }[]
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

  return (
    <Box flex={1}>
      <ScrollView>
        <Box style={{ margin: 20 }}>
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
          <Box height={50} />
        </Box>
      </ScrollView>
      <Box marginBottom={showMessageInput ? 0 : 'l'}>
        {showMessageInput ? (
          <MessageInput onSubmitEditing={handleMessageSubmit} defaultValue={message} autofocus />
        ) : (
          <CustomButton
            label={'next'}
            variant="primary"
            onPress={handleFormSubmit}
            marginTop={20}
          />
        )}
      </Box>
      <ConfirmationModal
        onAccept={clearPhotosToRemove}
        onDecline={() => setPhotosToRemove([])}
        hideModal={() => setPhotosToRemove([])}
        isVisible={!!photosToRemove.length}
        header={null}
        content={'Delete attachment?'}
      />
      <UploadPictureModal
        isVisible={showAttachmentModal}
        hideModal={setShowAttachmentModalFalse}
        onUserCancelled={setShowAttachmentModalFalse}
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
