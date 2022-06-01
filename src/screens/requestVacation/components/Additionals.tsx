import { CustomInput } from 'components/CustomInput'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AttachmentType } from 'types/holidaysDataTypes'
import { Box, Text } from 'utils/theme/index'
import { AttachmentIcon } from './additionals/AttachmentIcon'
import { Attachments } from './additionals/Attachments'
import { Message } from './additionals/Message'

type AdditionalsProps = {
  onMsgBtnPress: F0
  isMsgInputVisible: boolean
  showAttachmentModal: F0
  attachments: (AttachmentType | (AttachmentType & { name: string }))[]
  removeAttachment: F1<string>
  hideMsgInput: F0
  onMsgSubmit: F1<string>
}

const MSG_MAX_LEN = 400

export const Additionals = (p: AdditionalsProps) => {
  const { t } = useTranslation('requestVacation')
  const [msgContent, setMsgContent] = useState('')
  const getFlexDirection = () => {
    if (msgContent) return 'column-reverse'
    if (!p.attachments.length) return 'row'
    return 'column'
  }

  return (
    <Box marginTop="m">
      <Text variant="sectionLabel" textAlign="left">
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
            maxLength={MSG_MAX_LEN}
          />
          <Box alignSelf="flex-end">
            <Text variant="textXS" color="darkGrey">
              {t('messageCharactes', { count: msgContent.length, max: MSG_MAX_LEN })}
            </Text>
          </Box>
        </>
      )}
      {!p.isMsgInputVisible && !!msgContent && (
        <Box marginTop="m">
          <Text variant="inputLabel">{t('messageLabel')}</Text>
          <Message content={msgContent} onPress={p.onMsgBtnPress} maxLen={MSG_MAX_LEN} />
        </Box>
      )}
      <Box flexDirection={getFlexDirection()} justifyContent="flex-start" alignItems="flex-start">
        {!p.isMsgInputVisible && !msgContent && (
          <AttachmentIcon variant="msg" onPress={p.onMsgBtnPress} />
        )}
        {p.attachments.length ? (
          <Attachments
            attachments={p.attachments}
            addMore={p.showAttachmentModal}
            displayAddMore={p.attachments.length < 8}
            removeAttachment={p.removeAttachment}
            imagesPerScreenWidth={4}
          />
        ) : (
          <AttachmentIcon variant="file" onPress={p.showAttachmentModal} />
        )}
      </Box>
    </Box>
  )
}
