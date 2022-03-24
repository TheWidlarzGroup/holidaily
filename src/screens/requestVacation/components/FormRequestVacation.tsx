import React, { FC, useState } from 'react'
import { ScrollView } from 'react-native'
import { Box } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'
import { useBooleanState } from 'hooks/useBooleanState'
import { UploadAttachmentModal } from 'components/UploadAttachmentModal'
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
  files: (AttachmentType & { name: string })[]
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
  files: (AttachmentType & { name: string })[]
  removeAttachment: F1<string>
}

export const FormRequestVacation: FC<FormRequestVacationProps> = ({
  date,
  sickTime,
  toggleSickTime,
  nextStep,
  changeRequestData,
  message,
  photos,
  files,
  removeAttachment,
}) => {
  const [showMessageInput, { toggle: toggleShowMessageInput, setFalse: hideMessageInput }] =
    useBooleanState(false)
  const [
    showAttachmentModal,
    { setFalse: setShowAttachmentModalFalse, setTrue: setShowAttachmentModalTrue },
  ] = useBooleanState(false)
  const [attachmentsToRemove, setAttachmentsToRemove] = useState<string[]>([])

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
    setAttachmentsToRemove((prev) => [...prev, id])
  }

  const clearPhotosToRemove = () => {
    attachmentsToRemove.forEach(removeAttachment)
    setAttachmentsToRemove([])
  }

  const onFileUpload = (file?: { uri: string; name: string }) => {
    if (!file) return
    changeRequestData((oldData) => ({
      ...oldData,
      files: [...oldData.files, { uri: file.uri, name: file.name, id: new Date().toString() }],
    }))
  }

  const cancelRemovingPhoto = () => setAttachmentsToRemove([])

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
            attachments={[...photos, ...files]}
            removeAttachment={askRemovePhoto}
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
        isVisible={!!attachmentsToRemove.length}
        header={null}
        content={t('attachmentDeleteMessage')}
      />
      <UploadAttachmentModal
        isVisible={showAttachmentModal}
        hideModal={setShowAttachmentModalFalse}
        onUserCancelled={setShowAttachmentModalFalse}
        showCamera
        allowFiles
        setFile={onFileUpload}
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
