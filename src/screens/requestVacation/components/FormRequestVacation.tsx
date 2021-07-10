import React, { FC } from 'react'
import { ScrollView } from 'react-native'

import { Box } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'
import { useBooleanState } from 'hooks/useBooleanState'
import { UploadPictureModal } from 'components/UploadPictureModal'
import { Additionals } from './Additionals'
import { MessageInput } from '../../../components/MessageInput'
import { Details } from './Details'
import { SickTime } from './SickTime'

type RequestDataTypes = {
  description: string
  sickTime: boolean
  message: string
  photos: { id: string; uri: string }[]
}

type FormRequestVacationProps = {
  date: {
    start?: Date
    end?: Date
  }
  nextStep: () => void
  changeRequestData: (callback: (currentData: RequestDataTypes) => RequestDataTypes) => void
  message: string
  photos: { id: string; uri: string }[]
  removePhoto: F1<string>
}

export const FormRequestVacation: FC<FormRequestVacationProps> = ({
  date,
  nextStep,
  changeRequestData,
  message,
  photos,
  removePhoto,
}) => {
  const [sickTime, { toggle }] = useBooleanState(false)
  const [showMessageInput, { toggle: toggleShowMessageInput, setFalse: hideMessageInput }] =
    useBooleanState(false)
  const [
    showAttachmentModal,
    { setFalse: setShowAttachmentModalFalse, setTrue: setShowAttachmentModalTrue },
  ] = useBooleanState(false)

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

  return (
    <Box flex={1}>
      <ScrollView style={{ padding: 20 }}>
        <Details onDescriptionChange={handleDescriptionChange} date={date} />
        <SickTime sickTime={sickTime} toggle={toggle} />
        <Additionals
          onPressMessage={toggleShowMessageInput}
          messageContent={showMessageInput ? '' : message}
          messageInputVisible={showMessageInput}
          showAttachmentModal={setShowAttachmentModalTrue}
          attachments={photos}
          removePhoto={removePhoto}
        />
        <Box height={50} />
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
