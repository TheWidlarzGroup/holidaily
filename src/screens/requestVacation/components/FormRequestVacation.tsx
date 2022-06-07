import React, { FC, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Box, Text } from 'utils/theme/index'
import { useBooleanState } from 'hooks/useBooleanState'
import { UploadAttachmentModal } from 'components/UploadAttachmentModal'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { AttachmentType } from 'types/holidaysDataTypes'
import { useTranslation } from 'react-i18next'
import { Submit } from 'components/Submit'
import { isIos } from 'utils/layout'
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
  const [isNextVisible, { setTrue: showNext, setFalse: hideNext }] = useBooleanState(true)

  const { t } = useTranslation('requestVacation')

  const handleFormSubmit = () => {
    if (!date.start) return
    nextStep()
  }

  const handleDescriptionChange = (description: string) => {
    changeRequestData((oldData) => ({ ...oldData, description }))
  }

  const askRemovePhoto = (id: string) => {
    setAttachmentsToRemove((prev) => [...prev, id])
  }

  const handleMessageSubmit = (message: string) => {
    changeRequestData((oldData) => ({ ...oldData, message }))
    hideMessageInput()
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

  const onSicktimeToggle = () => {
    changeRequestData((old) => {
      const haveUserChangedDescription = !!old.description && old.description !== t('sickTimeLabel')
      if (haveUserChangedDescription) return old
      // Comment: sickTime wasn't updated yet
      return { ...old, description: sickTime ? '' : t('sickTimeLabel') }
    })
    toggleSickTime()
  }

  return (
    <Box flex={1}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Box margin="ml" paddingBottom="xxxl">
          <Text variant="sectionLabel" textAlign="left" marginBottom="m">
            {t('detailsTitle')}
          </Text>
          <SickTime sickTime={sickTime} toggle={onSicktimeToggle} />
          <Details
            showNext={showNext}
            hideNext={hideNext}
            onDescriptionChange={handleDescriptionChange}
            date={date}
          />
          <Additionals
            onMsgBtnPress={toggleShowMessageInput}
            onMsgSubmit={handleMessageSubmit}
            hideMsgInput={hideMessageInput}
            isMsgInputVisible={showMessageInput}
            showAttachmentModal={setShowAttachmentModalTrue}
            attachments={[...photos, ...files]}
            removeAttachment={askRemovePhoto}
          />
        </Box>
      </KeyboardAwareScrollView>
      {isNextVisible && !showMessageInput && (
        <Box marginBottom={isIos ? 'ml' : 'none'}>
          <Submit onCTAPress={handleFormSubmit} disabledCTA={!date.start} noBg text={t('CTA')} />
        </Box>
      )}
      <ConfirmationModal
        onAccept={clearPhotosToRemove}
        onDecline={cancelRemovingPhoto}
        hideModal={cancelRemovingPhoto}
        isVisible={!!attachmentsToRemove.length}
        header={t('attachmentDeleteMessage')}
        acceptBtnText={t('removeAttachmentYes')}
        declineBtnText={t('removeAttachmentNo')}
      />
      <UploadAttachmentModal
        source="REQUEST"
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
