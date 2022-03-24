import React from 'react'
import { useTranslation } from 'react-i18next'
import { AttachmentType } from 'types/holidaysDataTypes'
import { Box, Text } from 'utils/theme/index'
import { AttachmentIcon } from './additionals/AttachmentIcon'
import { Attachments } from './additionals/Attachments'
import { Message } from './additionals/Message'
import { MessageIcon } from './additionals/MessageIcon'

type AdditionalsProps = {
  onPressMessage: F0
  messageContent: string
  messageInputVisible: boolean
  showAttachmentModal: F0
  attachments: AttachmentType[]
  removePhoto: F1<string>
}

export const Additionals = ({
  onPressMessage,
  messageContent,
  messageInputVisible,
  showAttachmentModal,
  attachments,
  removePhoto,
}: AdditionalsProps) => {
  const { t } = useTranslation('requestVacation')

  const getFlexDirection = () => {
    if (messageContent) return 'column-reverse'
    if (!attachments.length) return 'row'
    return 'column'
  }

  return (
    <Box>
      <Text variant="boldBlack18" textAlign="left" marginTop="l">
        {t('additionalsTitle')}
      </Text>
      <Text variant="regular15Calendar" color="grey" textAlign="left">
        {t('additionalsLabel')}
      </Text>

      <Box flexDirection={getFlexDirection()} justifyContent="flex-start" alignItems="flex-start">
        {attachments.length ? (
          <Attachments
            photos={attachments}
            addMore={showAttachmentModal}
            displayAddMore={attachments.length < 9}
            removePhoto={removePhoto}
          />
        ) : (
          <AttachmentIcon showAttachmentModal={showAttachmentModal} />
        )}

        {!messageInputVisible &&
          (messageContent ? (
            <Message messageContent={messageContent} onPressMessage={onPressMessage} />
          ) : (
            <MessageIcon onPress={onPressMessage} />
          ))}
      </Box>
    </Box>
  )
}
