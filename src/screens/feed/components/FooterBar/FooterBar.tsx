import React, { useRef } from 'react'

import IconComment from 'assets/icons/icon-comment.svg'
import IconReaction from 'assets/icons/icon-reaction.svg'

import { Reaction } from 'screens/feed/types'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { MessageInput } from 'components/MessageInput'
import { Modal, TextInput } from 'react-native'
import EmojiPicker from 'rn-emoji-keyboard'
import { useBooleanState } from 'hooks/useBooleanState'
import { Bubble, BubbleProps } from '../Bubble/Bubble'
import { ReactionBubble } from '../Bubble/ReactionBubble'

type FooterBarProps = {
  reactions: Reaction[]
}

export const FooterBar = ({ reactions }: FooterBarProps) => {
  const [messageInputOpened, { setTrue: showMessageInput, setFalse: hideMessageInput }] =
    useBooleanState(false)
  return (
    <>
      <FooterBarContent onCommentBtnPress={showMessageInput} reactions={reactions} />
      {messageInputOpened && <CreateCommentModal onBlur={hideMessageInput} />}
    </>
  )
}

type CreateCommentModalProps = {
  onBlur: F0
}

const CreateCommentModal = (props: CreateCommentModalProps) => {
  const { onBlur } = props
  const inputRef = useRef<TextInput>(null)
  return (
    <Modal
      transparent
      animationType="slide"
      onShow={() => inputRef.current?.focus()}
      onRequestClose={onBlur}>
      <Box flex={1} justifyContent="flex-end">
        <BaseOpacity flexGrow={1} activeOpacity={1} onPress={onBlur} />
        <Box
          paddingTop="xm"
          paddingBottom="xs"
          bg="disabled"
          borderTopLeftRadius="m"
          borderTopRightRadius="m">
          <MessageInput ref={inputRef} onSubmitEditing={onBlur} />
        </Box>
      </Box>
    </Modal>
  )
}

type FooterBarContentProps = {
  reactions: Reaction[]
  onCommentBtnPress: F0
}

const FooterBarContent = (props: FooterBarContentProps) => {
  const { reactions, onCommentBtnPress } = props
  const [isPickerOpen, { setTrue: openPicker, setFalse: closePicker }] = useBooleanState(false)
  const { t } = useTranslation('feed')
  return (
    <Box flexDirection="row" padding="s" justifyContent="space-between" alignItems="center">
      <Box
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        flexGrow={1}
        flexShrink={1}>
        <ReactionPickerBtn onPress={openPicker} />
        <EmojiPicker
          onEmojiSelected={(e) => console.log('Selected emoji:', e)}
          open={isPickerOpen}
          onClose={closePicker}
        />
        {reactions &&
          reactions.map(({ type, users }) => (
            <ReactionBubble key={type} emoji={type} quantity={users.length} selected={false} />
          ))}
      </Box>
      <Bubble padding="s" onPress={onCommentBtnPress}>
        <IconComment />
        <Text variant="captionText" fontWeight="700" paddingHorizontal="s" paddingVertical="xs">
          {t('postCommentBtn')}
        </Text>
      </Bubble>
    </Box>
  )
}

export const ReactionPickerBtn = (props: BubbleProps) => (
  <Bubble {...props}>
    <IconReaction />
  </Bubble>
)
