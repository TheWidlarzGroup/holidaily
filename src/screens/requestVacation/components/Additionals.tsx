import { CustomInput } from 'components/CustomInput'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AttachmentType } from 'types/holidaysDataTypes'
import { Box, Text } from 'utils/theme/index'
import { useRequestVacationContext } from '../contexts/RequestVacationContext'
import { AttachmentIcon } from './additionals/AttachmentIcon'
import { Attachments } from './additionals/Attachments'
import { Message } from './additionals/Message'
import { MessageIcon } from './additionals/MessageIcon'

type AdditionalsProps = {
  onMsgBtnPress: F0
  isMsgInputVisible: boolean
  showAttachmentModal: F0
  attachments: (AttachmentType | (AttachmentType & { name: string }))[]
  removeAttachment: F1<string>
  hideMsgInput: F0
  onMsgSubmit: F1<string>
}

export const Additionals = (p: AdditionalsProps) => {
  const { t } = useTranslation('requestVacation')
  const [msgContent, setMsgContent] = useState('')
  const getFlexDirection = () => {
    // if (p.msgContent) return 'column-reverse'
    if (!p.attachments.length) return 'row'
    return 'column'
  }

  return (
    <Box>
      <Text variant="sectionLabel" textAlign="left" marginTop="l">
        {t('additionalsTitle')}
      </Text>
      <Text variant="textXS" color="darkGreyBrighter" textAlign="left">
        {t('additionalsLabel')}
      </Text>

      {p.isMsgInputVisible && (
        <>
          <CustomInput
            multiline
            blurOnSubmit
            onBlur={p.hideMsgInput}
            onSubmitEditing={({ nativeEvent: e }) => p.onMsgSubmit(e.text)}
            inputLabel={t('messageLabel')}
            isError={false}
            variant="medium"
            onChangeText={setMsgContent}
            autoFocus
            maxLength={400}
          />
          <Box alignSelf="flex-end">
            <Text variant="textXS" color="darkGrey">
              {msgContent.length}/400
            </Text>
          </Box>
        </>
      )}

      <Box flexDirection={getFlexDirection()} justifyContent="flex-start" alignItems="flex-start">
        {p.attachments.length ? (
          <Attachments
            attachments={p.attachments}
            addMore={p.showAttachmentModal}
            displayAddMore={p.attachments.length < 9}
            removeAttachment={p.removeAttachment}
          />
        ) : (
          <AttachmentIcon showAttachmentModal={p.showAttachmentModal} />
        )}

        {!p.isMsgInputVisible &&
          (msgContent ? (
            <Message messageContent={msgContent} onPressMessage={p.onMsgBtnPress} />
          ) : (
            <MessageIcon onPress={p.onMsgBtnPress} />
          ))}
      </Box>
    </Box>
  )
}
